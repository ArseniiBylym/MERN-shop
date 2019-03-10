const path = require(`path`);
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
require('dotenv').config();

const {MONGO_DB_URI} = process.env;
const app = express();

// Middlevares
app.use(morgan('tiny'));
app.use(express.json());

app.use('/', (req, res) => {
    res.send('Hello from server');
});

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

mongoose
    .connect(MONGO_DB_URI, {useNewUrlParser: true})
    .then(() => {
        app.listen(process.env.PORT || 5000);
        console.log('Server listen on port 5000');
    })
    .catch(error => {
        console.log(error);
    });
