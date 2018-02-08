import Node from "./Node";
import DataType from "../data/DataType";

NodeTemplate.Arithmetic = {
  className: 'Arithmetic',
  name: '+ Add',
  inputs: [{
    name: 'A',
    descriptor: {
      type: DataType.DOUBLE,
    }
  }, {
    name: 'B',
    descriptor: {
      type: DataType.DOUBLE,
    }
  }],
  outputs: [{
    name: 'value',
    descriptor: {
      type: DataType.DOUBLE
    }
  }],
  memory: {
    A: 1,
    B: 1,
  },
  operationNames: {
    '+ Add': 'add',
    '- Substract': 'substract',
    '× Multiply': 'multiply',
    '÷ Divide': 'divide',
    '^ Power': 'power',
  },
  elementClass: ['arithmetic'],
  category: 'Math',
  keywords: ['arithmetic', 
    'add', 'addition', 'plus', '+' , 
    'substract', 'minus',  '-', 
    'multiply', 'times', '*', 
    'divide', 'division', '/', 
    'power', '^']
}

export default class Arithmetic extends Node
{
  constructor(id) {
    super(id);
  }

  init(pod) {
    super.init(pod);

    this.operationName = pod.operationName || '+ Add';

    this.outputs.assignProperty('value', {
      get: () => {
        return this[this.operation](this);
      }
    });
  }

  set operationName(name) {
    this.operation = NodeTemplate.Arithmetic.operationNames[name];
    this._operationName = name;
  }
 
  get operationName() {
    return this._operationName;
  }

  add() {
    return Number(this.inputs.value('A')) + Number(this.inputs.value('B'));
  }

  substract() {
    return Number(this.inputs.value('A')) - Number(this.inputs.value('B'));
  }

  multiply() {
    return Number(this.inputs.value('A')) * Number(this.inputs.value('B'));
  }

  divide() {
    return Number(this.inputs.value('A')) / Number(this.inputs.value('B'));
  }

  power() {
    return Math.pow(Number(this.inputs.value('A')), Number(this.inputs.value('B')));
  }

  pod() {
    return {
      ...super.pod(),
      operationName: this.operationName
    }
  }
}