const inspect = require('util').inspect;
const ins = (x) => inspect(x, { depth: null });

const { specialForms } = require("./registry.js");

class Value {
  constructor(token) {
    this.type = token.type;
    this.value = token.value;
  }
  evaluate() {
    return /* ... */;
  }
  getIndex() {
    return this.value;
  }
}

class Word {
  constructor(token) {
    this.type = token.type || 'word';
    this.name = token.name;
  }
  
  evaluate(env) {
    /* ... */
  }

  getIndex() {
    return this.name;
  }

  leftEvaluate(env) {
    /* ... */
  }
    
}

class Apply {
  constructor(tree) {
    this.type = tree.type;
    this.operator = tree.operator;
    this.args = tree.args;
  }

  evaluate(env) {
    /* ... */
  }

  getIndex() {
    return false;
  }

  leftEvaluate(env) {
    // Invalid left-hand side in assignment
  }
}

module.exports = { Value, Word, Apply };
