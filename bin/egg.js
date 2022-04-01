#!/usr/bin/env node
let fs = require('fs');

let {runFromFile}  = require('../src/egg-interpreter.js');

let eggRepl = require('../src/egg-repl.js');

const fileName = process.argv.slice(2).shift();
if (fileName && (fileName.length > 0) && fs.existsSync(fileName)) runFromFile(fileName);
else eggRepl(); // else  read evaluate print loop
