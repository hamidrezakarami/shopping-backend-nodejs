const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");
const colors = require("colors");
const cors = require("cors");
dotenv.config({ path: "./config/config.env" });
require("./app/config/db.config");

const goods = require("./app/routes/goods.routes");
const cards = require("./app/routes/card.routes");

const app = express();

const corsOpts = {
  origin: '*',

  methods: [
    'GET',
    'POST',
    'OPTIONS',
    'PUT',
    'PATCH',
    'DELETE'
  ],

  allowedHeaders: [
    'Content-Type',
    'application/json',
    'text/plain',
    '*/*'
  ],
};


app.use(cors(corsOpts));
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// mounts routes
app.use("/goods", goods);
app.use("/cards", cards);

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
