const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");
const colors = require("colors");
dotenv.config({ path: "./config/config.env" });
require("./app/config/db.config");

const goods = require("./app/routes/goods.routes");

const app = express();


app.use((req, res, next) => {
  // res.setHeader("Access-Control-Allow-Origin", process.env.FRONTEND_APP_HOST);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});

app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// mounts routes
app.use("/goods", goods);

// start server Configuration
const PORT = 3000;
const server = app.listen(
  PORT,
  console.log(
    `we are in ${process.env.NODE_ENV} mood and port is ${PORT}`
      .yellow.bold
  )
);

//unhandled process problem
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error : ${err.message}`.red);
  server.close(() => process.exit(1));
});
