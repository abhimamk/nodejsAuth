const dbConfig = require('../secrets');

const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.getSecret;
db.tutorials = require("./customTitle/index")(mongoose, mongoosePaginate);

module.exports = db;
