const axios = require("axios");
const moment = require("moment");

const manutContasPagar = async (req, res) =>
  (async () => {
    const userName = req.session.userName;
    const token = req.session.token;

    const resp = await axios.get(process.env.SERVIDOR_DW3Back + "/getAllContasPagar", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    
    }).catch(error => {
      if (error.code === "ECONNREFUSED") {
        remoteMSG = "Servidor indisponível"

      } else if (error.code === "ERR_BAD_REQUEST") {
        remoteMSG = "Usuário não autenticado";

      } else {
        remoteMSG = error;
      }
      res.render("contaspagar/view/vwManutContasPagar.njk", {
        title: "Manutenção de Contas a Pagar",
        data: null,
        erro: remoteMSG,
        userName: userName,
      });
    });

    if (!resp) {
      return;
    }


    res.render("contaspagar/view/vwManutContasPagar.njk", {
      title: "Manutenção de Contas a Pagar",
      data: resp.data.registro,
      erro: null,
      userName: userName,
    });
  })();

const insertContasPagar = async (req, res) =>
  (async () => {
    if (req.method == "GET") {
      const token = req.session.token;

      const contaspagar = await axios.get(process.env.SERVIDOR_DW3Back + "/getAllContasPagar", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      return res.render("contaspagar/view/vwFCrContasPagar.njk", {
        title: "Cadastro de Contas a Pagar",
        data: null,
        erro: null, 
        data: contaspagar.data.registro,
        userName: null,
      });

    } else {
      const regData = req.body;
      const token = req.session.token;

      try {
        const response = await axios.post(process.env.SERVIDOR_DW3Back + "/insertContasPagar", regData, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          timeout: 5000,
        });


        res.json({
          status: response.data.status,
          msg: response.data.status,
          data: response.data,
          erro: null,
        });
      } catch (error) {
        console.error('Erro ao inserir dados no servidor backend:', error.message);
        res.json({
          status: "Error",
          msg: error.message,
          data: response.data,
          erro: null,
        });
      }
    }
  })();

const viewContasPagar = async (req, res) =>
  (async () => {
    const token = req.session.token;
    const userName = req.session.userName;
    try {
      if (req.method == "GET") {
        const id = req.params.id;
        oper = req.params.oper;
        parseInt(id);
        response = await axios.post(process.env.SERVIDOR_DW3Back + "/getContasPagarByID",
          {
            id: id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        if (response.data.status == "ok") {
          const contaspagar = await axios.get(process.env.SERVIDOR_DW3Back + "/getAllContasPagar", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            }
          });

          response.data.registro[0].data_vencimento = moment(response.data.registro[0].data_vencimento).format(
            "YYYY-MM-DD"
          );

          res.render("contaspagar/view/vwFRUDrContasPagar.njk", {
            title: "Visualização de Contas a Pagar",
            data: response.data.registro[0],
            disabled: true,
            curso: contaspagar.data.registro,
            userName: userName,
          });
        } else {
          console.log("[ctlContasPagar|viewContasPagar] ID de contaspagar não localizado!");
        }

      }
    } catch (erro) {
      res.json({ status: "[ctlContasPagar.js|viewContasPagar] ContasPagar não localizado!" });
      console.log(
        "[ctlContasPagar.js|viewContasPagar] Try Catch: Erro não identificado",
        erro
      );
    }
  })();

const updateContasPagar = async (req, res) =>
  (async () => {
    const userName = req.session.userName;
    const token = req.session.token;
    try {
      if (req.method == "GET") {
        const id = req.params.id;
        parseInt(id);
        response = await axios.post(
          process.env.SERVIDOR_DW3Back + "/getContasPagarByID",
          {
            id: id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        if (response.data.status == "ok") {
          const contaspagar = await axios.get(
            process.env.SERVIDOR_DW3Back + "/getAllContasPagar", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            }
          });

          response.data.registro[0].data_vencimento = moment(response.data.registro[0].data_vencimento).format(
            "YYYY-MM-DD"
          );

          res.render("contaspagar/view/vwFRUDrContasPagar.njk", {
            title: "Atualização de dados de Contas a Pagar",
            data: response.data.registro[0],
            disabled: false,
            curso: contaspagar.data.registro,
            userName: userName,
          });
        } else {
          console.log("[ctlContasPagar|UpdateContasPagar] Dados não localizados");
        }
      } else {
        const regData = req.body;
        const token = req.session.token;
        try {
          const response = await axios.post(process.env.SERVIDOR_DW3Back + "/updateContasPagar", regData, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            timeout: 5000,
          });

          res.json({
            status: response.data.status,
            msg: response.data.status,
            data: response.data,
            erro: null,
          });
        } catch (error) {
          console.error('[ctlContasPagar.js|UpdateContasPagar] Erro ao atualiza dados de contaspagar no servidor backend:', error.message);
          res.json({
            status: "Error",
            msg: error.message,
            data: response.data,
            erro: null,
          });
        }
      }
    } catch (erro) {
      res.json({ status: "[ctlContasPagar.js|UpdateContasPagar] ContasPagar não localizado!" });
      console.log(
        "[ctlContasPagar.js|UpdateContasPagar] Try Catch: Erro não identificado",
        erro
      );
    }

  })();

const deleteContasPagar = async (req, res) =>
  (async () => {
    const regData = req.body;
    const token = req.session.token;

    try {
      const response = await axios.post(process.env.SERVIDOR_DW3Back + "/DeleteContasPagar", regData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        timeout: 5000, // @ 5 segundos de timeout
      });

      res.json({
        status: response.data.status,
        msg: response.data.status,
        data: response.data,
        erro: null,
      });
    } catch (error) {
      console.error('[ctlContasPagar.js|DeleteContasPagar] Erro ao deletar dados de contaspagar no servidor backend:', error.message);
      res.json({
        status: "Error",
        msg: error.message,
        data: response.data,
        erro: null,
      });
    }
  })();

module.exports = {
  manutContasPagar,
  insertContasPagar,
  viewContasPagar,
  updateContasPagar,
  deleteContasPagar
};
