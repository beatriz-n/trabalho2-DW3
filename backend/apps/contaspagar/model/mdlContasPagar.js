const db = require("../../../database/databaseconfig");

const getAllContasPagar = async () => {
  return (
    await db.query(
      "SELECT * FROM contas_pagar WHERE removido = false ORDER BY descricao ASC"
    )
  ).rows;
};

const getContasPagarByID = async (contaID) => {
  return (
    await db.query(
      "SELECT * FROM contas_pagar WHERE id = $1 AND removido = false ORDER BY descricao ASC",
      [contaID]
    )
  ).rows;
};''

const insertContasPagar = async (contaREGPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "INSERT INTO contas_pagar (descricao, data_vencimento, valor, removido) " +
        "VALUES ($1, $2, $3, $4)",
        [
          contaREGPar.descricao,
          contaREGPar.data_vencimento,
          contaREGPar.valor,
          contaREGPar.removido || false
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "Erro INSERT contas_pagar " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};


const updateContasPagar = async (contaREGPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "UPDATE contas_pagar SET " +
        "descricao = $2, " +
        "data_vencimento = $3, " +
        "valor = $4, " +
        "removido = $5 " +
        "WHERE id = $1",
        [
          contaREGPar.id,
          contaREGPar.descricao,
          contaREGPar.data_vencimento,
          contaREGPar.valor,
          contaREGPar.removido
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "Erro UPDATE contas_pagar " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

const deleteContasPagar = async (contaREGPar) => {
  let linhasAfetadas;
  let msg = "ok";

  try {
    linhasAfetadas = (
      await db.query(
        "UPDATE contas_pagar SET removido = true WHERE id = $1",
        [contaREGPar.id]
      )
    ).rowCount;
  } catch (error) {
    msg = "Erro DELETE contas_pagar " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};
;

module.exports = {
  getAllContasPagar,
  getContasPagarByID,
  insertContasPagar,
  updateContasPagar,
  deleteContasPagar
};
