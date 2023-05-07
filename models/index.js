const dbConfig = require("../configs/db.config");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.products = require("./product.model")(mongoose);
db.users = require("./user.model")(mongoose);

module.exports = db;
