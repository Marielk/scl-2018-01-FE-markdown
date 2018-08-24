const fs = require('fs');
const path = require('path');
const Marked = require('marked');
// const TerminalRenderer = require('marked-terminal');

// datos globales
let fileNameVar;
let fileTypeVar;
let fileContentVar;

exports.read = (dir) => {
  const resolved = path.resolve(dir);
  fs.readFile(resolved, 'utf8', function(err, data) {
    if (err) throw err;
    fileContentVar = data;
    const links = mdExtractor(data);
    console.log(links);
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

const mdExtractor = (markdown) => {
  const links = [];

  const renderer = new Marked.Renderer();

  // Taken from https://github.com/markedjs/marked/issues/1279
  const linkWithImageSizeSupport = /^!?\[((?:\[[^\[\]]*\]|\\[\[\]]?|`[^`]*`|[^\[\]\\])*?)\]\(\s*(<(?:\\[<>]?|[^\s<>\\])*>|(?:\\[()]?|\([^\s\x00-\x1f()\\]*\)|[^\s\x00-\x1f()\\])*?(?:\s+=(?:[\w%]+)?x(?:[\w%]+)?)?)(?:\s+("(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)))?\s*\)/;

  Marked.InlineLexer.rules.normal.link = linkWithImageSizeSupport;
  Marked.InlineLexer.rules.gfm.link = linkWithImageSizeSupport;
  Marked.InlineLexer.rules.breaks.link = linkWithImageSizeSupport;

  renderer.link = function(href, title, text) {
    links.push({
      href: href,
      text: text,
      title: title,
    });
  };
  renderer.image = function(href, title, text) {
      // Remove image size at the end, e.g. ' =20%x50'
      href = href.replace(/ =\d*%?x\d*%?$/, '');
      links.push({
        href: href,
        text: text,
        title: title,
      });
  };
  Marked(markdown, {renderer: renderer});

  return links;
};
  // // colores en la terminal
  // Marked.setOptions({
  //   renderer: new TerminalRenderer(),
  // }); 

