let specialForms = Object.create(null); // Egg objects don't inherit from Object if create(null)
let topEnv = Object.create(null);

// From JSON to AST map
let j2a = Object.create(null);
function json2AST(node) { // Generic JSON traversing building the AST
  /* ... fill the code ... */
}

module.exports = {specialForms, topEnv, j2a, json2AST,};
