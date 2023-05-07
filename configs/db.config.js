require("dotenv").config();

// production mode
// module.exports = {
//   url: process.env.MONGDB_URL_PRODUCTSION,
// };

// dev mode
module.exports = {
  url: process.env.MONGDB_URL_DEV,
};
