const mdlContasPagar = require("../model/mdlContasPagar");

const getAllContasPagar = (req, res) =>
    (async () => {
        let registro = await mdlContasPagar.getAllContasPagar();
        res.json({ status: "ok", "registro": registro });
    })();

const getContasPagarByID = (req, res) =>
    (async () => {
        const contaID = parseInt(req.body.id);
        console.log("contaID", contaID);
        let registro = await mdlContasPagar.getContasPagarByID(contaID);
        res.json({ status: "ok", "registro": registro });
    })();

const insertContasPagar = (request, res) =>
    (async () => {
        const contaREG = request.body;
        let { msg, linhasAfetadas } = await mdlContasPagar.insertContasPagar(contaREG);
        res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
    })();

const updateContasPagar = (request, res) =>
    (async () => {
        const contaREG = request.body;
        let { msg, linhasAfetadas } = await mdlContasPagar.updateContasPagar(contaREG);
        res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
    })();

const deleteContasPagar = (request, res) =>
    (async () => {
        const contaREG = request.body;
        let { msg, linhasAfetadas } = await mdlContasPagar.deleteContasPagar(contaREG);
        res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
    })();

module.exports = {
    getAllContasPagar,
    getContasPagarByID,
    insertContasPagar,
    updateContasPagar,
    deleteContasPagar
};
