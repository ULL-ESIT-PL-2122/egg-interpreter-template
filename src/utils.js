const Radical = ["loc", "comments", "start", "end", "raw", 
                 "sourceType", "optional", "computed", 
                 "typeAnnotation"];
const Brutal = Radical.concat(["name"]);

let SkippedKeys = new Set(Radical);
const BrutalKeys = new Set(Brutal);

const skipKeys = keys => { SkippedKeys = new Set(keys) };
const skip = (key, value) => SkippedKeys.has(key)? undefined : value;
const skipBrutal = (key, value) => BrutalKeys.has(key)? undefined : value;
const simpleDeb = x => JSON.stringify(x, skip, 2);
const deb = x => JSON.stringify(x, skipBrutal, 1);

module.exports = { skipKeys, deb, simpleDeb };