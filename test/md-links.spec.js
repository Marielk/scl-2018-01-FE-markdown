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

describe('deberia tener links en su interior', () =>{
  let found = index.mdExtractor('TEST.md');
  // comprueba si tiene links dentro
  let link1 = found[0];
  // assert.equal(link1.href, 'https://trello.com/b/PV2CGwKc/markdown');
  assert.ok(link1.hasOwnProperty('href'));
  assert.ok(link1.hasOwnProperty('text'));
  assert.ok(link1.hasOwnProperty('file'));
  assert.ok(link1.hasOwnProperty('line'));
});
