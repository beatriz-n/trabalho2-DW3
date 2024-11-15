var express = require('express');
var router = express.Router();
var contaspagarApp = require("../apps/contaspagar/controller/ctlContasPagar")



//Função necessária para evitar que usuários não autenticados acessem o sistema.
function authenticationMiddleware(req, res, next) {
    // Verificar se existe uma sessão válida.
    isLogged = req.session.isLogged;    
  
    if (!isLogged) {      
      res.redirect("/Login");
    }
    next();
}; 
  
router.get('/manutContasPagar', authenticationMiddleware, contaspagarApp.manutContasPagar);
router.get('/insertContasPagar', authenticationMiddleware, contaspagarApp.insertContasPagar);
router.get('/viewContasPagar/:id', authenticationMiddleware, contaspagarApp.viewContasPagar);
router.get('/updateContasPagar/:id', authenticationMiddleware, contaspagarApp.updateContasPagar);

router.post('/insertContasPagar', authenticationMiddleware, contaspagarApp.insertContasPagar);
router.post('/updateContasPagar', authenticationMiddleware, contaspagarApp.updateContasPagar);
router.post('/deleteContasPagar', authenticationMiddleware, contaspagarApp.deleteContasPagar);


module.exports = router;