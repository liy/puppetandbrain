import DataType from "./data/DataType";

window.NodeTemplate = {
  all: Object.create(null),
  genericTemplates: Object.create(null),
  scopedTemplates: Object.create(null),

  get(nodeClassName) {
    return this.all[nodeClassName];
  },

  set(template) {
    this.genericTemplates[template.className] = template;
    this.all[template.className] = template;
  },

  scope(actorClassName, template) {
    if(!this.scopedTemplates[actorClassName]) this.scopedTemplates[actorClassName] = [];
    template.actorScope = actorClassName
    this.scopedTemplates[actorClassName].push(template);

    this.all[template.className] = template;
  },

  getTemplates(sourceActor) {
    const brain = sourceActor.brain;

    // these are dynmaic templates
    let templates = []
    Object.keys(this.genericTemplates).map(className => {
      if(className != 'VariableGetter' && className != 'VariableSetter' && className != 'PropertyGetter' && className != 'PropertySetter' && 
         className != 'Perform' && className != 'Break') {
        templates.push(this.genericTemplates[className])
      }
    })

    // Make sure template does not have circular reference. I've changed all references into id.
    // Because fuse.js:
    //  this._log('\n\nOutput:\n\n', JSON.stringify(results));
    // will cause circular issue.
    // It is stupid to have a log statement to break the whole search library

    // Populate the performs
    for(const actor of Hub.activity.lookUp.getActors()) {
      for(let actionName of Object.keys(actor.brain.actions)) {
        let action = actor.brain.actions[actionName];
        templates.push({
          ...this.genericTemplates.Perform,
          name: `${action.owner.name} Perform ${actionName}`,
          // the node going to be created is owned by the current opening brain
          ownerID: brain.owner.id,
          actionID: actor.brain.actions[actionName].id,
          // create input and its descriptor from the action's outputs
          inputs: action.outputs.map((name, output) => {
            return {
              name,
              descriptor: output.descriptor
            }
          }),
        })
      }
    }

    // Populate all the variable getter and setter for this actor
    for(let variable of brain.variables) {
      templates.push({
        ...this.genericTemplates.VariableGetter,
        name: `${variable.name}`,
        ownerID: brain.owner.id,
        variableID: variable.id,
      })
      templates.push({
        ...this.genericTemplates.VariableSetter,
        name: `Set ${variable.name}`,
        ownerID: brain.owner.id,
        variableID: variable.id,
      })
    }

    // make position version of MakeVector
    templates.push({
      ...this.genericTemplates.MakeVector,
      name: 'Make Position',
      // the node going to be created is owned by the current opening brain
      ownerID: brain.owner.id,
      outputName: 'position',
      outputs: [{
        name: 'position',
        descriptor: {
          type: DataType.VEC2,
        }
      }],
      keywords: [...this.genericTemplates.MakeVector.keywords, 'position']
    })

    // break position block
    templates.push({
      ...this.genericTemplates.Break,
      name: `Break Position`,
      // the node going to be created is owned by the current opening brain
      ownerID: brain.owner.id,
      inputName: 'position',
      inputs: [{
        name: 'position',
        descriptor: {
          type: DataType.VEC2,
          gadgetClassName: 'PositionField'
        }
      }],
      outputs: [{
        name:'x',
        descriptor: {
          type: DataType.DOUBLE
        }
      },{
        name:'y',
        descriptor: {
          type: DataType.DOUBLE
        }
      }],
      memory: {
        position: {x:0,y:0}
      }
    })

    templates.push({
      ...this.genericTemplates.Break,
      name: `Break Vector`,
      // the node going to be created is owned by the current opening brain
      ownerID: brain.owner.id,
      inputName: 'vector',
      inputs: [{
        name: 'vector',
        descriptor: {
          type: DataType.VEC2,
          gadgetClassName: 'Vec2Field'
        }
      }],
      outputs: [{
        name:'x',
        descriptor: {
          type: DataType.DOUBLE
        }
      },{
        name:'y',
        descriptor: {
          type: DataType.DOUBLE
        }
      }],
      memory: {
        vector: {x:0,y:0}
      }
    })

    // actor properties
    let actor = brain.owner;
    actor.properties.map((propertyName, property) => {
      templates.push({
        ...this.genericTemplates.PropertyGetter,
        name: `${property.descriptor.friendlyName}`,
        ownerID: brain.owner.id,
        propertyName,
        outputs: [{
          name: propertyName,
          descriptor: property.descriptor
        }]
      })
      templates.push({
        ...this.genericTemplates.PropertySetter,
        name: `Set ${property.descriptor.friendlyName}`,
        ownerID: brain.owner.id,
        propertyName,
        inputs: [{
          name: propertyName,
          descriptor: property.descriptor
        }],
        outputs: [{
          name: propertyName,
          descriptor: property.descriptor
        }]
      })
    })

    templates = templates.concat(this.scopedTemplates[sourceActor.className] || [])

    templates.sort((a, b) => {
      return a.category.localeCompare(b.category) || a.name.localeCompare(b.name);
    })

    return templates;
  }
}