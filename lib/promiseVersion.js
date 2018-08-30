const fs = require('fs');
const path = require('path');
const marked = require('marked');
const TerminalRenderer = require('marked-terminal');
const chalk = require('chalk');
const fetch = require('node-fetch');

exports.linkExtractor= (markdown) => {
  return new Promise((resolve, reject) => {
    const renderer = new TerminalRenderer();
    const links = [];
    // Taken from https://github.com/markedjs/marked/issues/1279
    const linkWithImageSizeSupport = /^!?\[((?:\[[^\[\]]*\]|\\[\[\]]?|`[^`]*`|[^\[\]\\])*?)\]\(\s*(<(?:\\[<>]?|[^\s<>\\])*>|(?:\\[()]?|\([^\s\x00-\x1f()\\]*\)|[^\s\x00-\x1f()\\])*?(?:\s+=(?:[\w%]+)?x(?:[\w%]+)?)?)(?:\s+("(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)))?\s*\)/;
    marked.InlineLexer.rules.normal.link = linkWithImageSizeSupport;
    marked.InlineLexer.rules.gfm.link = linkWithImageSizeSupport;
    marked.InlineLexer.rules.breaks.link = linkWithImageSizeSupport;

    renderer.link = (href, title, text) => {
      if (error) {
        return reject(error);
      }
      return resolve(links.push({
        href: href,
        text: text,
        title: title,
      }));
    };
  });
};

exports.linkExtractor('test/TEST.md')
    .then((result) => {
        console.log('Resultado promesa > ' + result);
    })
    .catch((error) => {
        console.error('Error promesa > ' + error);
    });

