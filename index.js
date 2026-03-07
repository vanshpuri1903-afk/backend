const express = require("express");
const cors = require("cors");
const { config } = require("dotenv");
config({ path: __dirname + "/.env" });
const { Router } = require("./router");

const app = express();

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "*",
  }),
);

app.use("/notification", Router);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server Started`);
});
