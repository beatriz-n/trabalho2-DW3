var createError = require('http-errors');
var nunjucks = require("nunjucks");
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const session = require('express-session');
const envFilePath = path.resolve(__dirname, './srvDW3Front.env');
require('dotenv').config({ path: envFilePath });

const port = process.env.PORT;
var rtIndex = require('./routes/rtIndex');
var rtContasPagar = require('./routes/rtContasPagar');
jwtchave = process.env.JWTCHAVE;

var app = express();

// Configuração do Nunjucks
const env = nunjucks.configure('apps', {
    autoescape: true,
    express: app,
    watch: true,
});

// Adicionar o filtro de formatação de data
function formatDate(value) {
  if (!value) return '';
  const date = new Date(value);
  // Formatação para 'dd/mm/yyyy'
  return date.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
}
env.addFilter('formatDate', formatDate);

// Middleware do Express
app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.JWTCHAVE, 
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: null },
  })
);

// Definição das rotas
app.use('/', rtIndex);
app.use('/contaspagar', rtContasPagar);

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
