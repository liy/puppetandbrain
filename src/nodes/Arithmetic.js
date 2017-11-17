import Input from "../data/Input";
import Output from "../data/Ouput";

export class Operation
{
  constructor(id) {
    this.id = LookUp.addValue(this, id)

    this.variables = Object.create(null);

    this.inputs = new Input(this);
    this.outputs = new Output(this);
  }

  fill(pod) {
    Object.assign(this.variables, pod.variables);
  }

  get targetID() {
    return this.id;
  }

  pod() {
    return {
      class: this.__proto__.constructor.name,
      id: this.id,
      variables: this.variables,
      inputs: this.inputs.pod(),
      ouputs: this.outputs.pod(),
    }
  }
}

export class Add extends Operation
{
  constructor(id) {
    super(id);

    this.inputs.add('A');
    this.inputs.add('B');

    this.outputs.add('value', this.value);
  }

  get value() {
    return this.inputs.value('A') + this.inputs.value('B');
  }
}

export class Multiply extends Operation
{
  constructor(id) {
    super(id);

    this.inputs.add('A');
    this.inputs.add('B');

    this.outputs.add('value', this.value);
  }

  get value() {
    return this.inputs.value('A') * this.inputs.value('B');
  }
}

export class Divide extends Operation
{
  constructor(id) {
    super(id);

    this.inputs.add('A');
    this.inputs.add('B');
    
    this.outputs.add('value', this.value);
  }

  get value() {
    return this.inputs.value('A') / this.inputs.value('B');
  }
}

export class Equal extends Operation
{
  constructor(id) {
    super(id);

    this.inputs.add('A');
    this.inputs.add('B');

    this.outputs.add('value', this.value);
  }

  get value() {
    return this.inputs.value('A') === this.inputs.value('B');
  }
}

export class LessThan extends Operation
{
  constructor(id) {
    super(id);

    this.inputs.add('A');
    this.inputs.add('B');

    this.outputs.add('value', this.value);
  }

  get value() {
    return this.inputs.value('A') < this.inputs.value('B');
  }
}

export class LessEqual extends Operation
{
  constructor(id) {
    super(id);

    this.inputs.add('A');
    this.inputs.add('B');
    
    this.outputs.add('value', this.value);
  }

  get value() {
    return this.inputs.value('A') <= this.inputs.value('B');
  }
}

export class RandomNumber extends Operation
{
  constructor(id) {
    super(id);

    this.outputs.add('value', this.value);
  }

  get value() {
    return Math.random();
  }
}