'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const SocketServer = require('ws').Server;
const path = require('path');
const api = require('./api/api');
const cors = require('cors');


// production will use AWS environment variables
const PORT = process.env.PORT || 3000;

// basic express initialization
const INDEX = path.join(__dirname, '../www/index.html');
const server = express();
server.use(cors());
server.use(bodyParser.json());
let distDir = __dirname + '/../www/';
server.use(express.static(distDir));

// using different file for api endpoints for better organization
server.use('/api', api);

// using WebSockets to update clients on DB changes
const wss = new SocketServer({ server });
wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('close', () => console.log('Client disconnected'));
});

module.exports = server.listen(PORT, () => console.log(`Listening on ${ PORT }`));

