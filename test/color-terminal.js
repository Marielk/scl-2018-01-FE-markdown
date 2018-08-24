const marked = require('marked');
const TerminalRenderer = require('marked-terminal');
marked.setOptions({
  renderer: new TerminalRenderer(),
});
// Show the parsed data
console.log(marked('# Hello \n This is **markdown** in the `terminal`'));
