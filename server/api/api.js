const express = require('express');
const router = express.Router();
const Message = require('../models/message');

// GET all messages
router.get('/messages', (req, res) => {
    Message.find(function (err, messages) {
        if (err) return handleError(err, res);
        res.send(messages);
    });
});

// POST a single message
router.post('/message', (req, res) => {
    let message = new Message({
        title: req.body.title,
        body: req.body.body
    });

    message.save(function (err, updatedMessage) {
        if (err) return handleError(err);
        res.send(updatedMessage);
    });
});

// Generic error handler
function handleError(error, response) {
    response.status(500).send(error);
}

module.exports = router;