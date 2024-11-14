const express = require("express");
const routerApp = express.Router();
const appLogin = require("../apps/login/controller/ctlLogin");
const appContasPagar = require("../apps/contaspagar/controller/ctlContasPagar");


routerApp.use((req, res, next) => {
  next();
});

// Rota Login
routerApp.post("/Login", appLogin.Login);
routerApp.post("/Logout", appLogin.Logout);

// Rota Contas a Pagar
routerApp.get("/getAllContasPagar", appLogin.AutenticaJWT, appContasPagar.getAllContasPagar);
routerApp.post("/getContasPagarByID", appLogin.AutenticaJWT, appContasPagar.getContasPagarByID);
routerApp.post("/insertContasPagar", appLogin.AutenticaJWT, appContasPagar.insertContasPagar);
routerApp.post("/updateContasPagar", appLogin.AutenticaJWT, appContasPagar.updateContasPagar);
routerApp.post("/deleteContasPagar", appLogin.AutenticaJWT, appContasPagar.deleteContasPagar);

module.exports = routerApp;
