#!/usr/bin/env node
'use strict';

module.exports = require('./lib/md-links');
const [,, ...userCLIArgs] = process.argv;
let file = userCLIArgs[0];
let option = userCLIArgs[1];
const doc = require('./lib/md-links').mdlinks(file, option);
