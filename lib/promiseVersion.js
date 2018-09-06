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

exports.readFilePromise = (filePath)=> {
  return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf-8', (error, data) => {
          if (error) {
              return reject(error);
          }
          return resolve(data);
      });
  });
};

exports.markdownLinkExtractor= (markdown) =>{
  const links = [];
  const renderer = new marked.Renderer();
  // Taken from https://github.com/markedjs/marked/issues/1279
  const linkWithImageSizeSupport = /^!?\[((?:\[[^\[\]]*\]|\\[\[\]]?|`[^`]*`|[^\[\]\\])*?)\]\(\s*(<(?:\\[<>]?|[^\s<>\\])*>|(?:\\[()]?|\([^\s\x00-\x1f()\\]*\)|[^\s\x00-\x1f()\\])*?(?:\s+=(?:[\w%]+)?x(?:[\w%]+)?)?)(?:\s+("(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)))?\s*\)/;
  marked.InlineLexer.rules.normal.link = linkWithImageSizeSupport;
  marked.InlineLexer.rules.gfm.link = linkWithImageSizeSupport;
  marked.InlineLexer.rules.breaks.link = linkWithImageSizeSupport;

  renderer.link = function(href) {
    links.push({
      href: href,
    });
  };
  renderer.image = function(href, title) {
    // Remove image size at the end, e.g. ' =20%x50'
    href = href.replace(/ =\d*%?x\d*%?$/, '');
    links.push({
      href: href,
      file: file,
      title: title,
    });
  };
  marked(markdown, {renderer: renderer});
  return links;
};
exports.fileType = (dir) => {
  fileTypeVar = path.extname(dir);
  return fileTypeVar;
};

exports.fileName = (dir)=> {
  fileNameVar = path.basename(dir);
  return fileNameVar;
};

const getOnlyLinks= (links) =>{
  let onlyLinks = [];
  links.forEach((element) =>{
    onlyLinks.push(element.href);
  });
  return onlyLinks;
};

const foundLines= (data, links)=>{
  let empy = []; // array para guardar cada linea por separado
  let linesFound = []; // array de lineas que contienen links
  const lines = data.split('\n'); // separar lineas
  lines.forEach((elem) => empy.push(elem)); // enviar cada linea a un array
  empy.forEach((linea) => { // proceso para buscar links en cada linea
    links.forEach((link)=>{
      if ((linea.indexOf(link) !=-1)) {
        const line = empy.indexOf(linea);
        linesFound.push({
          line: line +1,
          href: link,
        });
        return line;
      }
    });
  });
  return linesFound;
};

const renderWithColors = (objetos) => {
  objetos.forEach((link) => {
    console.log('\n', 'href:' + chalk.blue.underline.bold(link.link), '\n', 'file:' + chalk.magentaBright(link.file), '\n', 'line:' + chalk.yellow(link.line));
  });
};

const renderWithvalidate = (objetos, status, statText) => {
  objetos.forEach((link) => {
    if (status === 200) {
      console.log('\n', 'href:' + chalk.blue.underline.bold(link.link), '\n', 'Estado del link:' + chalk.green(statText), '\n', 'Stats:'+ chalk.green(JSON.stringify(status)), '\n', 'file:' + chalk.magentaBright(link.file), '\n', 'line:' + chalk.yellow(JSON.stringify(link.line)));
    }
  });
};


const [,, ...userCLIArgs] = process.argv;
let file = userCLIArgs[0];
let option = userCLIArgs[1];

exports.readFilePromise(file, option).then((result) => {
  const completedObject = [];
  let name = exports.fileName(file); // nombre del archivo
  const link = exports.markdownLinkExtractor(result);
  let linksArr = getOnlyLinks(link); // array de solo los links
  let lines= foundLines(result, linksArr); // sacar lineas donde estan los links
  linksArr.forEach((link) =>{
    // juntando la linea con su respectivo link
    let matchLine = lines.find((element) => {
      if (element.href === link) {
        return element;
      }
    });
    completedObject.push({ // aca vamos formando el objeto completo
      link: link,
      file: name,
      line: matchLine.line,
    });
  });
  // opcion validate
  if (option === '-validate') {
    // validando con node-fetch
    linksArr.forEach((link) =>{
      fetch(link).then((response)=>{
        let status = response.status;
        let statText = response.statusText;
        renderWithvalidate(completedObject, status, statText);
      }).catch((error) => {
        console.log('\n', 'href:' + chalk.blue.underline.bold(link), '\n', 'Problemas con el enlace:' + chalk.red(error), '\n', 'Stats:'+ chalk.red('404'));
      });
    });
  } else {
    renderWithColors(completedObject);
  }
});

