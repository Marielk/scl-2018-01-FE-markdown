const assert = require('chai').assert;
const index = require('../lib/md-links.js');

describe('testear funcion que busca el archivo indicado', () => {
  it('debería ser una funcion', () => {
    assert.equal(typeof index.read, 'function');
    assert.equal(typeof index.links, 'function');
  });
});
describe('deberia encontrar un archivo por parametro', () =>{
  let fileName = index.fileName('TEST.md');
  assert.equal(fileName, 'TEST.md');// comprueba su nombre
  let fileType = index.fileType('TEST.md');
  assert.equal(fileType, '.md'); // comprueba su extension
});

// describe('deberia tener links en su interior', () =>{
//   let found = index.links('TEST.md');
//   // comprueba si tiene links dentro
//   found.forEach(link, () => {
//     assert.isObject(link);
//     assert.ok(link.hasOwnProperty('href'));
//     assert.ok(link.hasOwnProperty('text'));
//     assert.ok(link.hasOwnProperty('file'));
//     assert.ok(link.hasOwnProperty('line'));
//     let link1 = found[0].url;
//     assert.equal(link1, 'https://trello.com/b/PV2CGwKc/markdown');
//   });
// });
