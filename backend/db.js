//import mongoose
const mongoose = require("mongoose");
const logger = require("./logger"); //import logger

//create the connection to the database
mongoose.connect(process.env.Mongo_URL);

//get the default connection
const db = mongoose.connection;

//handle db events

db.on("connected", () => {
    logger.info("Database connected successfully");
})

db.on("disconnected", () => {
    logger.info("Database disconnected");
})

db.on("error", (err) => {
    logger.error("Database connection error: ", err);
})      

//export the db connection
module.exports = db; 