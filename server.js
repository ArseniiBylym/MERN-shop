const path = require(`path`);
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
require('dotenv').config();
const {red} = require('colors/safe');

const {MONGO_DB_URI} = process.env;
const app = express();

// Middlevares
app.use(helmet());
app.use(bodyParser.json({limit: '50mb'}));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


// Main routes
app.use('/api/user', require('./routes/user'));
app.use('/api/product', require('./routes/product'));
app.use('/api/product-category', require('./routes/productCategory'));
app.use('/api/order', require('./routes/order'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/type', require('./routes/type'));

// Error handling
app.use((err, req, res, next) => {
    console.log(red(err));
    const {statusCode = 500, message, errors} = err;
    return res.status(statusCode).json({message, errors});
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
        console.log('connection error')
        console.log(error);
    });
