let readline = require('readline');
let egg  = require('./egg-interpreter.js');
const {eggExit, help} = require("./extensions"); // extend eggvm
let topEnv = egg.topEnv;
let specialForms = egg.specialForms;
let parser = egg.parser;
const {DEFAULT, red} = require("./colors.js");
const PROMPT = DEFAULT+"> ";

// Check if program is empty
const ALLWHITE = new RegExp("^"+egg.parser.SPACE.source+"$");

const getTokens = () => parser.getTokens;
const parBalance = parser.parBalance;

const put = egg.topEnv.print; 

function eggRepl() {
  let program = "";
  let stack = 0;
  try {
    // rl interface
    let rl = readline.createInterface({input: process.stdin, output: process.stdout, completer});
    rl.prompt(PROMPT); console.log("Version "+topEnv["version"]);
    rl.prompt();

    rl.on('line', function(line) {
      stack += parBalance(line);
      /* ... fill the code ... */
    });
    rl.on('close', eggExit);
    
    rl.on('SIGINT', () => {
      console.log(red("Expression discarded!"));
      program = "";
      stack = 0;
      rl.clearLine(process.stdout)
      rl.setPrompt(PROMPT);
      rl.prompt();
    });
   

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
    let tokens = getTokens(line);
    var word = tokens.filter((t) => t && t.type === 'WORD').pop().value;
    
    let allKeys = Object.keys(specialForms).concat(Object.keys(topEnv));
    var hits = allKeys.filter((key) => key.startsWith(word));
    return [hits, word];
  }
}

module.exports = eggRepl;


