'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const api = require('./api/api');
const cors = require('cors');


// production will use AWS environment variables
const PORT = process.env.PORT || 3000;

// basic express initialization
const server = express();
server.use(cors());
server.use(bodyParser.json());
// let distDir = __dirname + '/../www/';
// server.use(express.static(distDir));

// using different file for api endpoints for better organization
server.use('/api', api);

module.exports = server.listen(PORT, () => console.log(`Listening on ${ PORT }`));

