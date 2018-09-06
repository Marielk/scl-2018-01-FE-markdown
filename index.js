#!/usr/bin/env node
'use strict';

// module.exports = require('./lib/md-links');
// const [,, ...userCLIArgs] = process.argv;
// let file = userCLIArgs[0];
// let option = userCLIArgs[1];
// const doc = require('./lib/md-links').mdlinks(file, option);

// promise version
module.exports = require('./lib/promiseVersion');
// const doc = require('./lib/promiseVersion').readFilePromise(file);

// doc.readFilePromise('test/test2.md').then((result) => {
//   console.log('Resultado promesa > ' + result);
//   const link = doc.markdownLinkExtractor(result);
//   console.log(link);
// })
// .catch((error) => {
//   console.error('Error promesa > ' + error);
// });
