const fs = require('fs');
const path = require('path');
const marked = require('marked');
const TerminalRenderer = require('marked-terminal');
const chalk = require('chalk');
const stackTrace = require('stack-trace');
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
let otraCosa;
let blabla = [];
let line;
let fileContentVar;

exports.mdlinks = (dir) => { // funcion principal
  const resolved = path.resolve(dir); // resuelve ruta absoluta
  let extension = exports.fileType(resolved); // valida extension del archivo
  if (extension === '.md') {
    fs.readFile(resolved, 'utf8', function(err, data) {
      if (err) throw err;
      fileContentVar = data; // lee el archivo
      let file = exports.fileName(resolved);
      let links = exports.mdExtractor(data, file);
      if (links === undefined || links === []) {
        console.log('Error: El archivo no contiene links');
      } else {
        console.log('hola');
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

exports.linkLine = (links) => {
  // // console.log(links);
  // let link = [];
  // const lines = fileContentVar.split(/\r?\n/);
  // let text = JSON.stringify(lines);
  // new Promise((resolver, rechazar) => {
  //   console.log('Inicial');
  //   resolver(JSON.stringify(lines));
  //   })
  //   .then((lines) => {
  //       // throw new Error('Algo falló');
  //       console.log(lines);
  //   })
  //   .catch(() => {
  //       console.log('Haz eso');
  //   })
  //   .then(() => {
  //       console.log('Haz esto sin que importe lo que sucedió antes');
  //   });
  // let promise = function() {
  //   links.forEach((element) => {
  //   link.push(JSON.stringify(element.href));
  //   }).then((link) => {
  //     let found = [];
  //     link.forEach((element) => {
  //     found.push(element);
  //     });
  //     console.log(found);
  //   });
  // };
  // promise();
  // console.log(lines);
  // console.log(link);
  // const stackTrace = require('stacktrace-js');
  // let trace = stackTrace.getLineNumber(link);
  // console.log(trace);
  // let linkStr = JSON.stringify(link);
  // let found = text.indexOf(linkStr);
  // console.log(typeof JSON.stringify(lines));
  // console.log(typeof JSON.stringify(link));
  
};

exports.mdExtractor = (markdown, file) => {
  const renderer = new TerminalRenderer();
  const links = [];
  // Taken from https://github.com/markedjs/marked/issues/1279
  const linkWithImageSizeSupport = /^!?\[((?:\[[^\[\]]*\]|\\[\[\]]?|`[^`]*`|[^\[\]\\])*?)\]\(\s*(<(?:\\[<>]?|[^\s<>\\])*>|(?:\\[()]?|\([^\s\x00-\x1f()\\]*\)|[^\s\x00-\x1f()\\])*?(?:\s+=(?:[\w%]+)?x(?:[\w%]+)?)?)(?:\s+("(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)))?\s*\)/;
  
  marked.InlineLexer.rules.normal.link = linkWithImageSizeSupport;
  marked.InlineLexer.rules.gfm.link = linkWithImageSizeSupport;
  marked.InlineLexer.rules.breaks.link = linkWithImageSizeSupport;
  renderer.link = function(href, title) {
    links.push({
      title: title,
      href: href,
      file: file,
    });
    otraCosa = href;
    // console.log(href);
    let empy = [];
    let linesFound = [];
    const lines = fileContentVar.split('\n');
    lines.forEach((elem) => empy.push(elem));
    // console.log(empy);
    const found= empy.forEach((element) => {
      if ((element.indexOf(otraCosa) !=-1)) {
        // console.log(element);
        const line = empy.indexOf(element);
        linesFound.push({
          line: line +1,
          href: otraCosa,
        });
        // console.log(line +1);
        // console.log(linesFound);
        return line;
      } else {
       // console.log('sin match');
      }
    });
    // console.log(linesFound);
    let matchLine = linesFound.find((element) => {
      if (element.href === href) {
        return element;
      }
    });
    // console.log(JSON.stringify(matchLine.line));
    console.log('href:' + marked(href), 'file:' + marked(file), 'line:' + marked(JSON.stringify(matchLine.line)));
  };
  marked(markdown, {renderer: renderer});
  return links;
  // exports.linkLine(links);
};

