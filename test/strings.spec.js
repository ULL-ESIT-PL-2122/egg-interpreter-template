const should = require('chai').should();
let e2t = require('@ull-esit-pl/example2test');

describe("Testing strings", function() {
  let runTest = (programName, done) => {
    debugger;
    e2t({
      exampleInput: programName+'.egg', 
      executable: 'bin/egg.js', 
      assertion: (result, expected) => result.trim().should.eql(expected.trim()),
      done: done, 
    });
  };

  it("testing string.egg", function(done) {
    runTest('string', done);
  });

  /*
  it("testing string-apply.egg", function(done) {
    runTest('string-apply', done);
  });
  
  it("testing string-index.egg", function(done) {
    runTest('string-index', done);
  });

  it("testing map-set-index.egg", function(done) {
    runTest('map-set-index', done);
  });
  */
});
