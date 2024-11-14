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
        title: "Manutenção de contaspagar",
        data: null,
        erro: remoteMSG,
        userName: userName,
      });
    });

    if (!resp) {
      return;
    }


    res.render("contaspagar/view/vwManutContasPagar.njk", {
      title: "Manutenção de contaspagar",
      data: resp.data.registro,
      erro: null,
      userName: userName,
    });
  })();

const insertContasPagar = async (req, res) =>
  (async () => {
    if (req.method == "GET") {
      const token = req.session.token;

      const cursos = await axios.get(
        process.env.SERVIDOR_DW3Back + "/GetAllCursos", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      return res.render("contaspagar/view/vwFCrContasPagar.njk", {
        title: "Cadastro de contaspagar",
        data: null,
        erro: null, 
        curso: cursos.data.registro,
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

const ViewContasPagar = async (req, res) =>
  (async () => {
    const userName = req.session.userName;
    const token = req.session.token;
    try {
      if (req.method == "GET") {
        const id = req.params.id;
        oper = req.params.oper;
        parseInt(id);

        response = await axios.post(
          process.env.SERVIDOR_DW3Back + "/getAlunoByID",
          {
            alunoid: id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        if (response.data.status == "ok") {
          const cursos = await axios.get(
            process.env.SERVIDOR_DW3Back + "/GetAllCursos", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            }
          });

          response.data.registro[0].datanascimento = moment(response.data.registro[0].datanascimento).format(
            "YYYY-MM-DD"
          );

          res.render("contaspagar/view/vwFRUDrContasPagar.njk", {
            title: "Visualização de contaspagar",
            data: response.data.registro[0],
            disabled: true,
            curso: cursos.data.registro,
            userName: userName,
          });
        } else {
          console.log("[ctlContasPagar|ViewContasPagar] ID de aluno não localizado!");
        }

      }
    } catch (erro) {
      res.json({ status: "[ctlContasPagar.js|ViewContasPagar] Aluno não localizado!" });
      console.log(
        "[ctlContasPagar.js|viewContasPagar] Try Catch: Erro não identificado",
        erro
      );
    }
  })();

const UpdateAluno = async (req, res) =>
  (async () => {
    const userName = req.session.userName;
    const token = req.session.token;
    try {
      if (req.method == "GET") {
        const id = req.params.id;
        parseInt(id);

        response = await axios.post(
          process.env.SERVIDOR_DW3Back + "/getAlunoByID",
          {
            alunoid: id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        if (response.data.status == "ok") {
          const cursos = await axios.get(
            process.env.SERVIDOR_DW3Back + "/GetAllCursos", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            }
          });

          response.data.registro[0].datanascimento = moment(response.data.registro[0].datanascimento).format(
            "YYYY-MM-DD"
          );

          res.render("contaspagar/view/vwFRUDrContasPagar.njk", {
            title: "Atualização de dados de contaspagar",
            data: response.data.registro[0],
            disabled: false,
            curso: cursos.data.registro,
            userName: userName,
          });
        } else {
          console.log("[ctlContasPagar|UpdateAluno] Dados não localizados");
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
          console.error('[ctlContasPagar.js|UpdateAluno] Erro ao atualiza dados de contaspagar no servidor backend:', error.message);
          res.json({
            status: "Error",
            msg: error.message,
            data: response.data,
            erro: null,
          });
        }
      }
    } catch (erro) {
      res.json({ status: "[ctlContasPagar.js|UpdateAluno] Aluno não localizado!" });
      console.log(
        "[ctlContasPagar.js|UpdateAluno] Try Catch: Erro não identificado",
        erro
      );
    }

  })();

const DeleteAluno = async (req, res) =>
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
      console.error('[ctlContasPagar.js|DeleteAluno] Erro ao deletar dados de contaspagar no servidor backend:', error.message);
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
  ViewContasPagar,
  UpdateAluno,
  DeleteAluno
};
