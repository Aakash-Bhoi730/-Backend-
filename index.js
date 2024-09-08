const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyparser = require("body-parser");

app.use(bodyparser.json());
mongoose.connect("mongodb://localhost:27017/backend", {});

const db = mongoose.connection;

db.on("error", (err) => {
  console.log("error in connection");
});
db.once("", () => {
  console.log("database connected");
});

app.use(`/api/user`, require("./routes/userRoutes"));
app.use(`/api/book`, require("./routes/bookRoutes"));
app.use(`/api/transaction`, require("./routes/transactionRoutes"));

const port = 4500;
app.listen(port, () => {
  console.log(`server started on ${port}`);
});
