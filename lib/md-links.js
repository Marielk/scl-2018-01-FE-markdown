const fs = require('fs');
const path = require('path');
const marked = require('marked');
const TerminalRenderer = require('marked-terminal');
const chalk = require('chalk');
// colores en la terminal
marked.setOptions({
  renderer: new TerminalRenderer({
    href: chalk.blue,
    file: chalk.pink,
    text: chalk.yellow,
  }),
});

// datos globales
let fileNameVar;
let fileTypeVar;
let fileContentVar;

exports.read = (dir) => { // funcion principal
  const resolved = path.resolve(dir); // resuelve ruta absoluta
  let extension = exports.fileType(resolved); // valida extension del archivo
  if (extension === '.md') {
    fs.readFile(resolved, 'utf8', function(err, data) {
      if (err) throw err;
      fileContentVar = data; // lee el archivo
      let file = exports.fileName(resolved);
      const links = mdExtractor(data, file);
      if (links === undefined || links === []) {
        console.log('Error: El archivo no contiene links');
      } else {
        console.log(links);
      }
    });
  } else {
    console.log('Error: Porfavor ingrese un archivo valido (.md)');
  }
};


exports.fileName = function(dir) {
  fileNameVar = path.basename(dir);
  return fileNameVar;
};

exports.fileType = function(dir) {
  fileTypeVar = path.extname(dir);
  return fileTypeVar;
};

exports.mdExtractor = (markdown, file) => {
  const links = [];

  const renderer = new TerminalRenderer();

  // Taken from https://github.com/markedjs/marked/issues/1279
  const linkWithImageSizeSupport = /^!?\[((?:\[[^\[\]]*\]|\\[\[\]]?|`[^`]*`|[^\[\]\\])*?)\]\(\s*(<(?:\\[<>]?|[^\s<>\\])*>|(?:\\[()]?|\([^\s\x00-\x1f()\\]*\)|[^\s\x00-\x1f()\\])*?(?:\s+=(?:[\w%]+)?x(?:[\w%]+)?)?)(?:\s+("(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)))?\s*\)/;

  marked.InlineLexer.rules.normal.link = linkWithImageSizeSupport;
  marked.InlineLexer.rules.gfm.link = linkWithImageSizeSupport;
  marked.InlineLexer.rules.breaks.link = linkWithImageSizeSupport;

  renderer.link = function(href, text) {
    links.push({
      href: href,
      text: text,
      file: file,
    });
    console.log('href:' + marked(href), 'file:' + marked(file));
  };
  marked(markdown, {renderer: renderer});

  return links;
};

