const http = require('http');
const path = require('path');
const qs = require('querystring');

const {mimeTypes} = require('./utilities/mime');
const {staticFile} = require('./utilities/static_file');