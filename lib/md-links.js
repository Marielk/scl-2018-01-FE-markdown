
const fs = require('fs');
const path = require('path');
const marked = require('marked');
const TerminalRenderer = require('marked-terminal');
const chalk = require('chalk');
const fetch = require('node-fetch');

// colores en la terminal
marked.setOptions({
  renderer: new TerminalRenderer({
    href: chalk.blue,
  }),
});

// datos globales
let fileNameVar;
let fileTypeVar;
let onlyLinks;
let fileContentVar;

exports.fileType = (dir) => {
  fileTypeVar = path.extname(dir);
  return fileTypeVar;
};

exports.mdlinks = (dir, option) => { // funcion principal
  const resolved = path.resolve(dir); // resuelve ruta absoluta
  let extension = exports.fileType(resolved); // valida extension del archivo
  if (extension === '.md') {
    fs.readFile(resolved, 'utf8', function(err, data) {
      if (err) throw err;
      fileContentVar = data; // lee el archivo
      let file = exports.fileName(resolved);
      exports.mdExtractor(data, file, option);// llama a la funcion que hace todo el trabajo pesado
    });
  } else {
     console.error('Error: Porfavor ingrese un archivo valido (.md)');
  }

exports.fileName = (dir)=> {
  fileNameVar = path.basename(dir);
  return fileNameVar;
};

exports.mdExtractor = (markdown, file, option) => {
  // recibe parametros desde consola
  const renderer = new TerminalRenderer(); // objeto que hace render en consola
  const links = [];
  // Taken from https://github.com/markedjs/marked/issues/1279
  const linkWithImageSizeSupport = /^!?\[((?:\[[^\[\]]*\]|\\[\[\]]?|`[^`]*`|[^\[\]\\])*?)\]\(\s*(<(?:\\[<>]?|[^\s<>\\])*>|(?:\\[()]?|\([^\s\x00-\x1f()\\]*\)|[^\s\x00-\x1f()\\])*?(?:\s+=(?:[\w%]+)?x(?:[\w%]+)?)?)(?:\s+("(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)))?\s*\)/;
  marked.InlineLexer.rules.normal.link = linkWithImageSizeSupport;
  marked.InlineLexer.rules.gfm.link = linkWithImageSizeSupport;
  marked.InlineLexer.rules.breaks.link = linkWithImageSizeSupport;
  renderer.link = function(href, title, text) { // funcion que extrae links
    links.push({
      title: title,
      text: text,
      href: href,
      file: file,
    });
      onlyLinks = href; // guardar solo los links
      console.log(typeof onlyLinks);
      console.log(onlyLinks);
      let empy = []; // array para guardar cada linea por separado
      let linesFound = []; // array de lineas que contienen links
      const lines = fileContentVar.split('\n'); // separar lineas
      lines.forEach((elem) => empy.push(elem)); // enviar cada linea a un array
      const found = empy.forEach((element) => { // proceso para buscar links en cada linea
        if ((element.indexOf(onlyLinks) !=-1)) {
          const line = empy.indexOf(element);
          linesFound.push({
            line: line +1,
            href: onlyLinks,
          });
          return line;
        } else {
        // console.log('sin match');
        }
      }); // volver a unir la linea encontrada con su respectivo href
      let matchLine = linesFound.find((element) => {
        if (element.href === href) {
          return element;
        }
      });
      // opcion validate indicada por el usuario
      if (option === '-validate') {
      // validando con node-fetch
        fetch(href).then((response)=>{
          let status = response.status;
          let statText = response.statusText;
          // imprimir resultado en la consola, con colores c:
          // console.log('\n', 'href:' + chalk.blue.underline.bold(href), '\n', 'Estado del link:' + chalk.green(statText), '\n', 'Stats:'+ chalk.yellow(JSON.stringify(status)), '\n', 'file:' + chalk.magentaBright(file), '\n', 'line:' + chalk.yellow(JSON.stringify(matchLine.line)));
        });
      } else {
        // imprimir resultado en la consola, con colores c:
        // console.log('\n', 'href:' + chalk.blue.underline.bold(href), '\n', 'file:' + chalk.magentaBright(file), '\n', 'line:' + chalk.yellow(JSON.stringify(matchLine.line)));
      }
  };
  // funcion que ejecuta el render
  marked(markdown, {renderer: renderer});
  return links;
 };
};
