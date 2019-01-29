'use strict';

const mongoose = require('mongoose');
const app = require('./app');

// MongoDB connection initalization
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/yp", { useNewUrlParser: true }).then(
    () => { console.info(`${new Date()} - Connected to MongoDB: ${process.env.MONGODB_URI}`); },
    err => { console.error('MongoDB Connection Error. Please make sure that', process.env.MONGODB_URI, 'is running.'); }
);

// express app initialization is done inside app
app;