const express = require('express');
const router = express.Router();
const messageSchema = require('../models/message');
const AWS = require('aws-sdk');
const mongoose = require('mongoose');
const WebSocket = require('ws');

AWS.config.update({ accessKeyId: process.env.ACCESS_KEY, secretAccessKey: process.env.SECRET_KEY });

// using WebSockets to update clients on DB changes
if (!process.env.TEST) {
    const wss = new WebSocket.Server({ port: 3001 });

    wss.on('connection', (ws) => {
    //   console.log('Client connected');
    //   ws.on('close', () => console.log('Client disconnected'));
    });

    messageSchema.post('save', function(next) {
        wss.clients.forEach((client) => {
            client.send('message');
        });

        next();
    });
}

const Message = mongoose.model('messages', messageSchema);

// GET all messages
router.get('/messages', (req, res) => {
    Message.find({})
        .sort({ date: -1 })
        .exec(function (err, messages) {
            if (err) return handleError(err, res);
            res.send(messages);
        });
});

// POST a single message
router.post('/message', (req, res) => {
    let message = new Message({
        title: req.body.title,
        body: req.body.body,
        date: new Date()
    });

    message.save(function (err, updatedMessage) {
        if (err) return handleError(err, res);
        res.send(updatedMessage);
    });
});

// receives a base64 image, and uploads to AWS S3 bucket
router.post('/profilePicture', (req, res) => {
    var deviceId = req.body.deviceId;

    // Allowing only images
    const base64Data = Buffer.from(req.body.profilePicture.replace(/^data:image\/\w+;base64,/, ""), 'base64')
    
    // Getting the file type, ie: jpeg, png or gif
    const type = req.body.profilePicture.split(';')[0].split('/')[1];

    var s3 = new AWS.S3();
    s3.upload({
        Bucket: process.env.S3_BUCKET || 'ypchallengefiles.ratieri.com.br',
        Key: deviceId + '.jpg',
        Body: base64Data,
        ACL: 'public-read',
        ContentEncoding: 'base64', 
        ContentType: 'image/' + type,
        CacheControl: 'no-cache'
    }, (err, data) => {
        if (err) return handleError(err, res);

        // console.log('Successfully uploaded image.', data);
        res.send({url: data.Location});
    });
});

// Generic error handler
function handleError(error, response) {
    console.error(error);
    response.status(500).send(error);
}

module.exports = router;