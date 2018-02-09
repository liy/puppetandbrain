import Adaptor from "./Adaptor";
import DataType from "../data/DataType";

NodeTemplate.Arithmetic = {
  className: 'Arithmetic',
  name: '+',
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
  operations: [
    {
      description: '+ Add',
      name: '+',
      operationName: 'add'
    },
    {
      description: '- Substract',
      name: '-',
      operationName: 'substract'
    },
    {
      description: '× Multiply',
      name: '×',
      operationName: 'multiply'
    },
    {
      description: '÷ Divide',
      name: '÷',
      operationName: 'divide'
    },
    {
      description: '^ Power',
      name: '^',
      operationName: 'power'
    },
  ],
  elementClass: ['arithmetic'],
  category: 'Math',
  keywords: ['arithmetic', 
    'add', 'addition', 'plus', '+' , 
    'substract', 'minus',  '-', 
    'multiply', 'times', '*', 
    'divide', 'division', '/', 
    'power', '^']
}

export default class Arithmetic extends Adaptor
{
  constructor(id) {
    super(id);
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
}