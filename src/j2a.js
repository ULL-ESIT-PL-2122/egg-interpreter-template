const {j2a, json2AST} = require("./registry.js");
const {Value, Word, Apply} = require("./ast.js");

j2a['value'] = (j) => new Value(j);
j2a['word']  = (j) => new Word(j);
j2a['apply'] = (j) => { /* ... fill the code ... */};

module.exports = { j2a, json2AST };