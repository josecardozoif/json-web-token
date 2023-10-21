// JWT
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');
var { expressjwt: expressJWT } = require("express-jwt");
const cors = require('cors');

var cookieParser = require('cookie-parser')

const express = require('express');
const { usuario } = require('./models');

const crypto = require('./crypto');

const app = express();

app.set('view engine', 'ejs');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));

//algo q o servidor taca no navegador por um tempo, será usado para autenticação
app.use(cookieParser()); //pegar uma coisa e transformar em outra 
app.use(
  expressJWT({
    secret: process.env.SECRET,
    algorithms: ["HS256"],
    getToken: req => req.cookies.token
  }).unless({ path: ["/autenticar", "/logar", "/deslogar", "/usuarios/cadastrar", "/usuarios/listar"] })
);

app.get('/autenticar', async function(req, res){
  res.render('autenticar');
})

app.get('/usuarios/cadastrar', async function(req, res){
  res.render('cadastrar');
})

app.post('/usuarios/cadastrar', async function(req, res){
  
  if(req.body.senha == req.body.confirmar){
    let usercrypto = req.body
  
    usercrypto.senha = crypto.encrypt(req.body.senha);

    await usuario.create(usercrypto);
    res.redirect('/usuarios/listar')
  } else {
    res.status(500).json({mensagem:"As senhas não coincidem!"})
  }
})

app.get('/usuarios/listar', async function(req, res){
let lista = await usuario.findAll()//select do db 
  res.render('listar', {users: lista});
})

app.get('/', async function(req, res){
  res.render("home")
})

app.post('/logar', async (req, res) => {
  //if (req.body.usuario == "picolo" && req.body.senha == "123") { continua..
  //const { usuario, senha } = req.body //sinaliza req.body.usuario e req.body.senha
  const cadastro = await usuario.findOne({ where: {usuario: req.body.usuario, senha: crypto.encrypt(req.body.senha)}})

  if(cadastro){
  const id = cadastro.id;
  const token = jwt.sign({ id }, process.env.SECRET, {//jwt = json web token
    expiresIn: 666 //num em segundos, qnd o token expira
  })
  //res.send("Usuário autenticado com sucesso!") //login correto
  res.cookie("token", token, {httpOnly: true});
  return res.redirect("/");
  }
  res.status(500).json({mensagem:"Login Inválido"})
})

app.post('/deslogar', function(req, res) {
  res.cookie('token', null, {httpOnly: true});
  res.json({
    deslogado: true
  })
})

app.listen(3000, function() {
  console.log('App de Exemplo escutando na porta 3000!')
});