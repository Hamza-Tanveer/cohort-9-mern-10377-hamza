const express = require("express");
const dotenv = require("dotenv");
dotenv.config(); 
const logger = require("./logger");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const connectToDB = require("./db");
const userRoutes = require('./routes/userRoutes');
const noteRoutes = require('./routes/noteRoutes');

const app = express(); 
app.use(bodyParser.json()); 
app.use(cookieParser());

app.use('/users', userRoutes);
app.use('/notes', noteRoutes);

app.use((err, req, res, next) => {
    logger.error({err, method: req.method, path: req.originalUrl}, 'Unhandled request error');
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).json({error: 'Internal server error'});
});

const PORT = Number(process.env.PORT) || 5000;

const StartServer = async() => {
    try{
        await connectToDB();
        app.listen(PORT, () => {
        logger.info(`Server is running on port ${PORT}`);
        });
    }
    catch(err){
        logger.error(err, "Failed to start the server");
        process.exit(1);
    }
}

StartServer();