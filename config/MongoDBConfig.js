var mongoose = require("mongoose");
require('dotenv').config()
const DBURL = process.env.MONGO_URI;
mongoose.connect(DBURL).then((conn)=> {console.log("MongoDb is connected from Config File");console.log(`Connected to DB: ${mongoose.connection.name}`);
;})
.catch((err)=> {console.log("connection error",err)})

module.exports = mongoose;