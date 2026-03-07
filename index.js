const express = require("express");
const cors = require("cors");
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

const port = 5000;

app.listen(port, () => {
  console.log(`Server Started`);
});
