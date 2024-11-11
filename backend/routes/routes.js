const express = require("express");
const routerApp = express.Router();
const appLogin = require("../apps/login/controller/ctlLogin");


routerApp.use((req, res, next) => {
    next();
  });

  // Rota Login
routerApp.post("/Login", appLogin.Login);
routerApp.post("/Logout", appLogin.Logout);

module.exports = routerApp;
