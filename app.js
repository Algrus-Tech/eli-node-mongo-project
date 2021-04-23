const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");
const errorHandler = require("./middleware/error");

const insert = require("./routes/insert");
const insertMulti = require("./routes/insertMulti");
const create = require("./routes/create");
const update = require("./routes/update");
const updateInsert = require("./routes/updateInsert");
const getData = require("./routes/getData");

const app = express();

app.use(express.json());

app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(mongoSanitize());

app.use(helmet());

app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100,
});
app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

app.use("/Create", create);
app.use("/Insert", insert);
app.use("/InsertMulti", insertMulti);
app.use("/Update", update);
app.use("/UpdateInsert", updateInsert);
app.use("/get", getData);

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.use(errorHandler);

module.exports = app;
