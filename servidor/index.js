// JWT
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');
var { expressjwt: expressJWT } = require("express-jwt");
const cors = require('cors');

var cookieParser = require('cookie-parser')

const express = require('express');
const { usuario } = require('./models');

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
  }).unless({ path: ["/autenticar", "/logar", "/deslogar", "/usuarios/cadastrar"] })
);

app.get('/autenticar', async function(req, res){
  res.render('autenticar');
})

app.get('/usuarios/cadastrar', async function(req, res){
  res.render('cadastrar');
})

app.post('/usuarios/cadastrar', async function(req, res){
  try {
    await usuario.create(req.body);
    res.redirect('/usuarios/cadastrar')
} catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ocorreu um erro ao criar o usuário.' });
}
})

app.get('/', async function(req, res){
  res.render("home")
})

app.post('/logar', (req, res) => {
  //if (req.body.usuario == "picolo" && req.body.senha == "123") { continua..
  const { usuario, senha } = req.body //sinaliza req.body.usuario e req.body.senha
  if( usuario == "Picolo" && senha == "123"){ //se for igual a isso
    const id = 1;
    const token = jwt.sign({ id }, process.env.SECRET, {//jwt = json web token
      expiresIn: 666 //num em segundos, qnd o token expira
    })
    //res.send("Usuário autenticado com sucesso!") //login correto
    res.cookie('token', token, {httpOnly: true});
    return res.json({//serve pra ver oq a gente acabou de fazer, informações q  serão passadas pro servs
      usuario: usuario,
      token: token
    })
  }

  res.status(500).json({mensagem:"Login Inválido"})//se td tiver errado, retorna isso aq
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