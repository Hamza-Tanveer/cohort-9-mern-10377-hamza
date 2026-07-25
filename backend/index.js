const express = require("express");
const dotenv = require("dotenv");
dotenv.config(); // Load environment variables from .env file
const logger = require("./logger");
const bodyParser = require("body-parser");
const db = require("./db");



const app = express(); // Create an instance of the Express application
app.use(bodyParser.json()); // Add body parser middleware for json parsing

// Define a simple route for testing
app.get("/", (req, res) => {
    res.send("Hello, World!");
});

// Start the server
app.listen(process.env.PORT, () => {
    logger.info(`Server is running on port ${process.env.PORT}`);
});