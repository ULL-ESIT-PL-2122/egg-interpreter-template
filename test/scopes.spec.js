let fs = require('fs');
const should = require('chai').should();
let e2t = require('@ull-esit-pl/example2test');
let eggvm = require('../src/egg-interpreter.js');

describe("Testing scopes", function() {
  let runTest = (programName, done) => {
    debugger;
    e2t({
      exampleInput: programName+'.egg', 
      executable: 'bin/egg.js', 
      assertion: (result, expected) => result.trim().should.eql(expected.trim()),
      done: done, 
    });
  };


  it("should  not allow the use of non declared variables", function() {
    let program = fs.readFileSync('test/examples/scope-err.egg', 'utf8');
    (() => { eggvm.run(program); }).should.throw(/setting.+undefined.+variable/i);
  });

  it("testing scope.egg", function(done) {
    runTest('scope', done);
  });

});
