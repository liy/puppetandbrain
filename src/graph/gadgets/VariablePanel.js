require('./VariablePanel.scss')

export default class VariablePanel
{
  constructor() {
    this.element = document.createElement('div');
    this.element.id = 'variable-panel-container';

    this.panel = document.createElement('div');
    this.panel.id = 'variable-panel';
    this.element.appendChild(this.panel);


    this.createVariable = this.createVariable.bind(this);
  }

  open(brain) {
    this.brain = brain;
    this.variables = brain.variables;

    this.appendTitle();

    for(let variable of this.variables.getValues()) {
      console.log(variable)
      this.appendEntry(variable);
    }
  }

  appendTitle() {
    // title
    let entry = document.createElement('div');
    entry.className = 'variable-panel-entry';
    this.panel.appendChild(entry);

    let title = document.createElement('div');
    title.className = 'variable-panel-title';
    title.textContent = 'Variables';
    entry.appendChild(title)
    let addVariableBtn = document.createElement('div');
    addVariableBtn.className = 'add-variable-button';
    entry.appendChild(addVariableBtn)

    addVariableBtn.addEventListener('mousedown', this.createVariable);
  }

  clear() {
    while(this.panel.lastChild) {
      this.panel.removeChild(this.panel.lastChild);
    }
  }

  createVariable() {
    let variable = this.variables.create();
    this.appendEntry(variable);
  }

  appendEntry(variable) {
    let entry = document.createElement('div');
    entry.className = 'variable-panel-entry';
    this.panel.appendChild(entry);

    let nameInput = document.createElement('input');
    nameInput.className = 'variable-name-input';
    nameInput.value = variable.name;
    entry.appendChild(nameInput)

    let dataInput = document.createElement('input');
    dataInput.className = 'variable-data-input';
    dataInput.value = variable.initialData;
    entry.appendChild(dataInput);

    // The listeners should cleared once it is removed from the dom tree.
    nameInput.addEventListener('change', e => {
      if(String.trim(e.target.value) != '') {
        if(!this.variables.rename(variable.name, e.target.value)) {
          // FIXME: add indication that the variable name is wrong!
        }
      }
    });

    dataInput.addEventListener('change', e => {
      if(String.trim(e.target.value) != '') {
        this.variables.get(variable.name).set(e.target.value);
      }
    })
  }

  refresh() {
    this.clear();

    for(let name of this.variables.keys) {
      let entry 
    }
  }
}