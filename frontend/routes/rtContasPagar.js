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
  
/* GET métodos */
router.get('/ManutContasPagar', authenticationMiddleware, contaspagarApp.manutContasPagar);
router.get('/InsertContasPagar', authenticationMiddleware, contaspagarApp.insertContasPagar);
router.get('/ViewContasPagar/:id', authenticationMiddleware, contaspagarApp.ViewContasPagar);
router.get('/UpdateContasPagar/:id', authenticationMiddleware, contaspagarApp.UpdateAluno);

/* POST métodos */
router.post('/InsertContasPagar', authenticationMiddleware, contaspagarApp.insertContasPagar);
router.post('/UpdateContasPagar', authenticationMiddleware, contaspagarApp.UpdateAluno);
router.post('/DeleteContasPagar', authenticationMiddleware, contaspagarApp.DeleteAluno);
// router.post('/viewContasPagar', authenticationMiddleware, contaspagarApp.viewContasPagar);


module.exports = router;