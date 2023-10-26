require('dotenv').config
require('express-async-errors')
const express = require('express');
const app = express();
const connectDB = require('./db/connect');
const router = require('/routes/finances');
const notFoundMiddleware = require('./middleware');

// middleware


// routes



const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`Server is listening at port ${port}...`));
    } catch (error) {
        console.log(error);
    }
}