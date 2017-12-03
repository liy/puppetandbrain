require('./VariablePanel.scss')

export default class VariablePanel
{
  constructor() {
    this.element = document.createElement('div');
    this.element.id = 'variable-panel-container';

    this.panel = document.createElement('div');
    this.panel.className = 'panel';
    this.element.appendChild(this.panel);

    // title
    let container = document.createElement('div');
    container.className = 'title-container';
    this.panel.appendChild(container);

    let title = document.createElement('div');
    title.className = 'title';
    title.textContent = 'Variables';
    container.appendChild(title)
    let addVariableBtn = document.createElement('div');
    addVariableBtn.className = 'add-button';
    container.appendChild(addVariableBtn)

    // contains all the variable entries
    this.content = document.createElement('div');
    this.content.className = 'content';
    this.panel.appendChild(this.content);

    // I don't think I need to clear this...
    addVariableBtn.addEventListener('mousedown', () => {
      History.push(Commander.create('CreateVariable', this.brain.id).processAndSave());
    });
  }

  open(brain) {
    this.brain = brain;
    this.variables = brain.variables;

    for(let variable of this.variables.getValues()) {
      this.appendVariableEntry(variable);
    }
  }


  clear() {
    while(this.content.lastChild) {
      this.content.removeChild(this.content.lastChild);
    }
  }

  appendVariableEntry(variable) {
    let entry = document.createElement('div');
    entry.className = 'entry';
    this.content.appendChild(entry);

    let nameInput = document.createElement('input');
    nameInput.className = 'name-input';
    nameInput.value = variable.name;
    entry.appendChild(nameInput)

    let dataInput = document.createElement('input');
    dataInput.className = 'data-input';
    dataInput.value = variable.initialData;
    entry.appendChild(dataInput);
    
    let deleteVariableBtn = document.createElement('div');
    deleteVariableBtn.className = 'delete-button';
    entry.appendChild(deleteVariableBtn)

    // The listeners should cleared once it is removed from the dom tree.
    nameInput.addEventListener('change', e => {
      let command = Commander.create('RenameVariable', this.brain.id, variable.name, e.target.value).processAndSave();
      if(command) {
        History.push(command);
      }
      else {
        // reset back
        nameInput.value = variable.name;
        // TODO: add indication that the variable name is wrong!
      }
    });

    dataInput.addEventListener('change', e => {
      if(String.trim(e.target.value) != '') {
        this.variables.get(variable.name).set(e.target.value);
      }
    })

    // FIXME: have different undo redo for input might not work,
    dataInput.addEventListener('keydown', e => {
      // stop custom undo happening. just undo the text changes
      e.stopPropagation();
    })

    deleteVariableBtn.addEventListener('click', e => {
      if(variable.inUse) {
        let confirm = window.confirm('Variable is in use, do you really want to delete the varaible and its getters and setters?');
        if(confirm) {
          History.push(Commander.create('DeleteVariable', this.brain.id, variable.id).processAndSave())
        }
      }
      else {
        History.push(Commander.create('DeleteVariable', this.brain.id, variable.id).processAndSave())
      }
    })
  }

  refresh() {
    this.clear();

    for(let variable of this.variables.getValues()) {
      this.appendVariableEntry(variable);
    }
  }
}