let inspect = require("util").inspect;
let ins = (x) => inspect(x, {depth: null});
let readline = require('readline');
let egg  = require('./egg-interpreter.js');
const {eggExit, help} = require("./extensions"); // extend eggvm
let topEnv = egg.topEnv;
const json2AST = egg.json2AST;
let specialForms = egg.specialForms;
let parser = egg.parser;
let parse = parser.parse;
const {BLUE, RED, DEFAULT, blue, red} = require("./colors.js");
const PROMPT = DEFAULT+"> ";

// Check if program is empty
const ALLWHITE = new RegExp("^"+egg.parser.SPACE.source+"$");

const getTokens = parser.getTokens;
const parBalance = parser.parBalance;

const put = egg.topEnv.print; 

function eggRepl() {
  let program = "";
  let stack = 0;
  try {
   /* ... fill the code ... */
  }
  catch (err) {
    console.log(red(err));
    help();
  }

  process.stdin.on("end", eggExit);


  /*
     Used for Tab autocompletion 
     The completer function takes the current line entered by the user as an argument,
     and returns an Array with 2 entries:
        - An Array with matching entries for the completion.
        - The substring that was used for the matching.
  */
  function completer(line) {
    /* ... fill the code ... */
    return [hits, word];
  }
}

module.exports = eggRepl;


