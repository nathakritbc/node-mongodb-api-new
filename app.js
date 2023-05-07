const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users.routes");
const uploadRouter = require("./routes/upload.routes");
const productsRouter = require("./routes/product.routes");
const authRouter = require("./routes/auth.routes");
const passport = require("passport");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "/uploads/")));

// connect_db
const db = require("./models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

//load passport strategies
require("./configs/passport/passport")(db);

app.use("/", indexRouter);
// app.use("/users", usersRouter);
app.use(
  "/api/v1/products",
  passport.authenticate("jwt", { session: false }),
  productsRouter
);
app.use("/api/v1/auth", authRouter);

app.use(
  "/api/v1/users",
  passport.authenticate("jwt", { session: false }),
  usersRouter
);

app.use(
  "/api/v1/uploads",
  passport.authenticate("jwt", { session: false }),
  uploadRouter
);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
