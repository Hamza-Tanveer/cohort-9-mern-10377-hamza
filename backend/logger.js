const pino = require("pino"); //import pino logger

const logger = pino({});  //create a logger instance

module.exports = logger;  //export the logger instance for use in other files