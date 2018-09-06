const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

// Then either:
const expect = chai.expect;
// or:
const assert = chai.assert;
// or:
chai.should();

const promise = require('../lib/promiseVersion.js');

describe('deberia tener links en su interior', () =>{
  let found = promise.readFilePromise('test/TEST.md');
  found.should.eventually.equal('(https://trello.com/b/PV2CGwKc/markdown)\n\n');
  found.then((result) => {
    const link = promise.markdownLinkExtractor(result);
    assert.equal(link[0].href, 'https://trello.com/b/PV2CGwKc/markdown');
    assert.ok(link[0].hasOwnProperty('href'));
    assert.ok(link[0].hasOwnProperty('text'));   
  })
  .catch((error) => {
    console.error('Error promesa > ' + error);
  });
  
  // assert.ok(link.hasOwnProperty('file'));
  // assert.ok(link.hasOwnProperty('line'));
  // comprueba si tiene links dentro
});
