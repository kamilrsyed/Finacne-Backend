require('express-async-errors')
const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = require('./middleware/cors')
app.use(cors(corsOptions));

// connect to database
const connectDB = require('./db/connect');
require('dotenv').config()

// routers
const authRouter = require('./routes/auth');
const financesRouter = require('./routes/finances');
const usersRouter = require('./routes/users');

// error handler
const authMiddleware = require('./middleware/authentication');
const errorHandlerMiddleware = require('./middleware/error-handler');
const notFoundMiddleware = require('./middleware/not-found');

app.use(express.json());
app.use(cors());

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/transactions', financesRouter);
app.use('/api/v1/users', usersRouter);

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`Server is listening at port ${port}...`));
    } catch (error) {
        console.log(error);
    }
}

start();