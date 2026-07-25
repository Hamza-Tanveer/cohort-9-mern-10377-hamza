const express = require("express");
const dotenv = require("dotenv");
dotenv.config(); 
const logger = require("./logger");
const bodyParser = require("body-parser");
const connectToDB = require("./db");

const app = express(); 
app.use(bodyParser.json()); 

//a simple route for testing
app.get("/", (req, res) => {
    res.send("Hello, World!");
});

const PORT = Number(process.env.PORT) || 5000;

// Start the server
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