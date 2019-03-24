const path = require(`path`);
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
// const morgan = require('morgan');
require('dotenv').config();
const {red} = require('colors/safe');

const {MONGO_DB_URI} = process.env;
const app = express();

// Middlevares
// app.use(morgan('tiny'));
app.use(helmet());
app.use(bodyParser.json({limit: '50mb'}));
// app.use(express.json({limit: '16mb'}));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

// Main routes
app.use('/api/user', require('./routes/user'));
app.use('/api/product', require('./routes/product'));
app.use('/api/product-category', require('./routes/productCategory'));
app.use('/api/service', require('./routes/service'));
app.use('/api/order', require('./routes/order'));
app.use('/api/cart', require('./routes/cart'));

// Error handling

app.use((err, req, res, next) => {
    console.log(red(err));
    const {statusCode = 500, message, errors} = err;
    return res.status(statusCode).json({message, errors});
});

mongoose
    .connect(MONGO_DB_URI, {useNewUrlParser: true})
    .then(() => {
        app.listen(process.env.PORT || 5000);
        console.log('Server listen on port 5000');
    })
    .catch(error => {
        console.log('connection error')
        console.log(error);
    });
