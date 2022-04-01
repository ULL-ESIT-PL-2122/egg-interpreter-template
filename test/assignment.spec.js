let insp = require("util").inspect;
const should = require('chai').should();
let e2t = require('@ull-esit-pl/example2test');

describe("Testing set: Assigments", function() {
  let runTest = (programName, done) => {
    debugger;
    e2t({
      exampleInput: programName+'.egg', 
      executable: 'bin/egg.js', 
      assertion: (result, expected) => result.replace(/\s+/g,'').should.eql(expected.replace(/\s+/g,'')),
      done: done, 
    });
  };

  it("testing one.egg", function(done) {
    runTest('one', done);
  });

  /*
  it("testing array-set-index.egg", function(done) {
    runTest('array-set-index', done);
  });

  it("testing set-array-negative.egg", function(done) {
    runTest('set-array-negative', done);
  });
*/
  it("testing set-error.egg", function(done) {
    let runTest = (programName, done) => {
      debugger;
      e2t({
        exampleInput: programName+'.egg', 
        executable: 'bin/egg.js', 
        assertion: (result, expected) => result.replace(/\s+/g,'').slice(0,40).
        should.eql(expected.replace(/\s+/g,'').slice(0,40)),
        done: done, 
      });
    };
  
    runTest('set-error', done);
  });

  /*
  it("testing map-set-index.egg", function(done) {
    runTest('map-set-index', done);
  });
  */
});
