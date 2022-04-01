//let insp = require("util").inspect;
//let ins = (x) => insp(x, {depth:null});

Object.prototype.sub = 
Map.prototype.sub = 
Array.prototype.get = 
Array.prototype.sub = 
function(...args) {
  //debugger;
  try {
    let element = this[args[0]];
    // console.log("element = "+ins(element));
    for(let i=1; i<args.length; i++) {
      // console.log("i = "+i, "element = "+ins(element));
      element = element[args[i]];
      // console.log("i = "+i, "element = "+ins(element));
    }
    return element;
  } catch (e) {
    throw new Error("Error in Array method sub indexing\n",e);
  }
};

const checkIterable = (object, length) => {
  if(length === 0) {
    throw new SyntaxError('At least one index must be passed to sub');
  }

  if(!object || object instanceof Number || object instanceof String) {
    throw new TypeError(`The object '${object}'' is not indexable!`);
  }
};

const getValidIndex = (length, index) => {
  if (index !== parseInt(index, 10)) 
    throw new TypeError(`Index ${index} is not a number. Array size: ${length}`);

  if (index < 0) {  // i.e. a[-1] 
    index = length + index;
  }

  if(index > length) {
    throw new RangeError(`Index ${index} is out of bounds. Array size: ${length}`);
  }

  return index;
};

// SETELEM
const SetElemAlias = "=";
Object.prototype["setElem"] = 
Object.prototype[SetElemAlias] = 
function(value, ...indices) {
  checkIterable(this, indices.length);

  // Get index
  let index = indices[0];
  if(this instanceof Array) {
    index = getValidIndex(this.length, indices[0]);
  }

  // Set value or continue the recursion
  if(indices.length === 1) {

    if(this instanceof Map) {
      this.set(index, value);
    } else {
      this[index] = value;
    }

    return value;
  }

  const obj = this.sub(index);
  return obj[SetElemAlias](value, ...indices.slice(1));
};

Number.prototype["call"] = 
Number.prototype["+"] = 
function(...args) {
  try {
    let sum = this;
    for(let i=0; i<args.length; i++) {
      sum += args[i];
    }
    return sum;
  } catch (e) {
     throw new Error("Error in Number method '+' when summing numbers!\n",e)
  }
}; 

function removeMonkeyPatch() {
  delete(Object.prototype.sub); 
  delete(Map.prototype.sub);
  delete(Array.prototype.get);
  delete(Array.prototype.sub);
  delete(Object.prototype.setElem); 
  delete(Object.prototype["="]);
  delete(Number.prototype["call"]);
  delete(Number.prototype["+"]);
}

module.exports = { removeMonkeyPatch };