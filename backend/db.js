const mongoose = require("mongoose");
const logger = require("./logger");

//handle db events
mongoose.connection.on("connected", () => {
    logger.info("Database connected successfully");
})

mongoose.connection.on("disconnected", () => {
    logger.info("Database disconnected");
})

mongoose.connection.on("error", (err) => {
    logger.error(err, "Database connection error: ");
})

const connectToDB = async () => {
    try{
        const MongoURL = process.env.Mongo_URL;

        if(!MongoURL){
            logger.error("MongoURL is not defined in .env");
            throw new exception()
        }

        await mongoose.connect(MongoURL);
        const db =  mongoose.connection;
        return db;
    }
    catch(err){
        logger.error(err, "Database connection error");
        process.exit(1);
    } 
}   

//export the db connection
module.exports = connectToDB; 