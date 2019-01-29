const express = require('express');
var router = express.Router();

// GET all messages
router.get('/messages', (req, res) => { 
    try {
        res.send([]);
        // res.send('Hello');
    } catch (err) {
        return res.status(500).send({message: err.message});
    }
});

module.exports = router;