const dbConfig = require("../configs/db.config");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.products = require("./product.model")(mongoose);
db.users = require("./user.model")(mongoose);
db.books_types = require("./bookType.model")(mongoose);
db.books = require("./book.model")(mongoose);

module.exports = db;
