const express = require("express");
const dotenv = require("dotenv");
dotenv.config(); 
const logger = require("./logger");
const bodyParser = require("body-parser");
const connectToDB = require("./db");
const userRoutes = require('./routes/userRoutes');

const app = express(); 
app.use(bodyParser.json()); 

app.use('/users', userRoutes);

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