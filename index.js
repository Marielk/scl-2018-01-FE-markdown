#!/usr/bin/env node
'use strict';

module.exports = require('./lib/md-links');
const [,, ...userCLIArgs] = process.argv;
let file = userCLIArgs[0];
let option = userCLIArgs[1];
const doc = require('./lib/md-links').mdlinks(file, option);


// const program = require('commander');
// const exec = require('child_process').exec;
// const request = require('request');
// const optimist = require('optimist');
// let args = optimist.argv;
// let input = args['i'];
// let output = args['o'];
  // let listFunction = (directory,options) => {
  //   const cmd = 'ls';
  //   let params = [];
  //   if (options.validate) params.push('validate');
  //   let fullCommand = params.length
  //   ? cmd + ' -' + params.join('')
  //   : cmd;
  //   if (file) fullCommand += ' ' + file;
  // let execCallback = (error, stdout, stderr) => {
  //   if (error) console.log('exec error: ' + error);
  //   if (stdout) console.log('Result: ' + stdout);
  //   if (stderr) console.log('shell error: ' + stderr);
  // };
  //   exec(fullCommand, execCallback);
  // };
  
  // // Configuracion de comando CLI
  // program
  // .version('2.1.0')
  // .command('mdlinks <file>')
  // .description('Extract all links from a markdown file')
  // .option('--validate', 'Check if the links works or they are broken')
  // .action('listFunction');
  // program.parse(process.argv);