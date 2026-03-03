const { sendFunction } = require("./controller");
const express = require("express");

const Router = express.Router();

Router.post("/send", sendFunction);

module.exports = { Router };
