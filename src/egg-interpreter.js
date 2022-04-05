let insp = require("util").inspect;
let ins = (x) => insp(x, {depth:null});
let fs = require("fs");


const {specialForms, topEnv, } = require("./registry.js");
const { json2AST } = require('./j2a');

const  parser = require('@ull-esit-pl-2122/egg-parser-solution'); // Substitute by your egg-parser-aluXXX
const {parse, parseFromFile} = parser;

function evaluate(expr, env) {
	//if (expr.type === 'value') debugger;
  expr.evaluate(env);
}

specialForms['if'] = function(args, env) {
  /* fill the code */
};

specialForms['while'] = function(args, env) {
 /* fill the code */
};

specialForms['do'] = function(args, env) {
  /* fill the code */
};

specialForms[':='] = specialForms['def'] = specialForms['define'] = function(args, env) {
  /* fill the code */
};

specialForms['->'] =specialForms['fun'] = function(args, env) {
   /* fill the code */

  return function(...args) {
    /* fill the code */
  };
};

specialForms['='] = specialForms['set'] = function(args, env) {
  debugger;
 
  if (args.length !== 2 || args[0].type === 'value') {
    throw new SyntaxError('Bad use of set');
  }

  let valueTree = args[args.length-1];
  let value = valueTree.evaluate(env);

  let leftSide = args[0];
  let [scope, name] = leftSide.leftEvaluate(env);
  if (Array.isArray(scope) && name < 0) name = s.length+name;
  scope[name] = value;

  return value;
}


topEnv["hasOwnProperty"] = Object.prototype.hasOwnProperty;
topEnv["debug"] = false;
topEnv["sub"] = Object.prototype.sub; 
// debugger;
topEnv['null'] = null;
topEnv['true'] = true;
topEnv['false'] = false;
topEnv['undefined'] = undefined;
topEnv['null'] = null;
topEnv['RegExp'] = require('xregexp');
topEnv['fetch'] = require('node-fetch');
topEnv['fs'] = require('fs');
topEnv['Math'] = Math;

[
  '+', 
  '-', 
  '*', 
  '/', 
  '==', 
  '<', 
  '>',
  '&&',
  '||'
].forEach(op => {
  topEnv[op] = new Function('a, b', `return a ${op} b;`);
});

topEnv['print'] = function(...value) {
  let processed = value.map(v => {
    if (typeof v === "string") return v;
    else if (typeof v == "function") {
      let firstLines = v.toString().match(/.*/);
      return firstLines[0];
    }
    else if (topEnv["debug"]) return ins(v); // 
    else return JSON.stringify(v, null, 0); 
    
  })
  console.log(...processed);
  return value.length === 1? value[0] : value;
};

topEnv["arr"] = topEnv["array"] = function(...args) {
  //debugger;
  return args;
};

topEnv["length"] = function(array) {
  return array.length;
};


topEnv["<-"] = topEnv["element"] = function(array, ...index) {
  if (index.length < 1) throw new SyntaxError('Error!: provide at least one index for array "${array}" ');

  try {
    let target = array;
    for(let i of index) {
      // debugger;
      let v = (i < 0)? target.length+i : i; // i < 0 is false if "i" is a string
      target = target[v];
    }
    if ((target == undefined) || (target == null)) {
      throw Error(`Error indexing "${ins(array)}" with index "${ins(index)}". Accesing a non defined element!\n`);
    }
    return target;
  }
  catch(e) {
    throw new ReferenceError('Error indexing '+ins(array)+" with indices "+ins(index)+"\n"+e);
  }
};

function run(program) {
  let env = Object.create(topEnv);
  let ast = parse(program);
  let tree = json2AST(ast);

  let result = tree.evaluate(env);

  return result;
}

function runFromFile(fileName) {
  try {
    const ast = parseFromFile(fileName);
    let tree = json2AST(ast);
    let env = Object.create(topEnv);

    let result = tree.evaluate(env);

    return result;
  }
  catch (err) {
    console.log(err);
  }
}

function runFromEVM(fileName) {
  try {
    let json = fs.readFileSync(fileName, 'utf8');
    let treeFlat = JSON.parse(json);
    let tree = json2AST(treeFlat);

    let env = Object.create(topEnv);
    let result = tree.evaluate(env);

    return result;
  }
  catch (err) {
    console.log(err);
  }
}

module.exports = {json2AST, run, runFromFile,runFromEVM, topEnv, specialForms, parser, evaluate};
