const fs = require('fs');
const path = require('path');
const marked = require('marked');
const TerminalRenderer = require('marked-terminal');

// datos globales
let fileNameVar;
let fileTypeVar;
let fileContentVar;

exports.read = (dir) => {
  fs.readFile(dir, 'utf8', function(err, data) {
    if (err) throw err;
    fileContentVar = data;
    return data;
  });
};


exports.fileName = function(dir) {
  fileNameVar = path.basename(dir);
  return fileNameVar;
};

exports.fileType = function(dir) {
  fileTypeVar = path.extname(dir);
  return fileTypeVar;
};

exports.links = function(dir, options) {
  const resolved = path.resolve(dir);
  read(resolved);
  fileName(resolved);
  fileType(resolved);
  const links = [];
  // colores en la terminal
  marked.setOptions({
    renderer: new TerminalRenderer(),
  });
  const renderer = new Marked.Renderer();

  
};

