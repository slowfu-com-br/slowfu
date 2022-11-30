if(process.env.NODE_ENV !== "production"){
    require("dotenv").config()
}
//Bibliotecas Instaladas
const express = require ("express")
const app = express()
const bcrypt = require ("bcrypt")
const passport = require("passport")
const initializePassport = require("./passport-config")
const flash = require("express-flash")
const session = require("express-session")
const methodOverride = require("method-override")
const Sequelize = require('sequelize')
const Post = require ('./models/Post')
const Registro = require('./models/registro_db')
const path = require ("path")

const bodyParser = require('body-parser')
const { json} = require("express/lib/response")

const Rota = 2000;
const port = process.env.Port || Rota;


app.set('view engine', 'ejs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(flash())

const users = []

app.use('/public', express.static('public'))
app.use(express.urlencoded({extended: false}))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    is_logged_in: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride("_method"))

//Processo de Login
// app.post("/loginEspecial", checkNotAuthenticated, passport.authenticate("local", {
//     successRedirect: "/posts",
//     failureRedirect: "/login",
//     failureFlash: true
// }))

// //Processo de Registro
// app.post("/register", checkNotAuthenticated, async (req, res) =>{
//     try{
//         const hashedPassword = await bcrypt.hash(req.body.password, 10)
//         users.push({
//             id:Date.now().toString(),
//             name: req.body.name,
//             email: req.body.email,
//             telefone: req.body.telefone,
//             password: hashedPassword,
//         })
//         console.log(users)
//         res.redirect("/login")
//     } catch (e) {
//         console.log(e);
//         res.redirect("/login")
//     }
// })

// Inserção de dados de cadastro
app.post('/register', async function(req,res) {
    // const hashedPassword = await bcrypt.hash(req.body.password, 10)
    Registro.create({
        name: req.body.name,
        email: req.body.email,
        telefone: req.body.telefone,
        password: req.body.password,
    }).then(function(){
        res.redirect('/login')
    }).catch(function(){
        res.send("Houve um erro" + erro)
    })
})

// Inserção de dados de postagens
app.post('/postagem', async function(req,res) {
    Post.create({
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        telefone: req.body.telefone,
        whatsapp: req.body.whatsapp,
        producao: req.body.producao,
        localidade: req.body.localidade
    }).then(function(){
        res.redirect('/posts')
    }).catch(function(){
        res.send("Houve um erro" + erro)
    })
})

app.post('/loginEspecial', async function(req, res){
            Registro.findAll({where:{ 
                email: req.body.email,
                password: req.body.password
            }}).then(data => {
            console.log(data)
            //req.flash(data)
            res.redirect("/posts")
        }).catch(err=>{
            res.redirect("/login")
        })
})

//Início das Rotas
//Rota Home (Página Não restrita)
app.get('/', function(req, res){
    Post.findAll({order:[['id', 'DESC']]}).then(function(posts){
        res.render("index.ejs",{posts:posts})
    })
})

//Rota de Visualização
app.get('/posts', checkNotAuthenticated, function(req, res){
    
    Post.findAll({order:[['id', 'DESC']]}).then(function(posts){
        res.render("posts.ejs", {posts:posts})
    })
})


//Rota Login
app.get('/login', (req, res) =>{
    res.render("login.ejs")
})

// Rota Quem Somos
app.get('/quem-somos', (req, res) =>{
    res.render("quem-somos.ejs")
})
// Rota Quem Somos
app.get('/quem-somos', (req, res) =>{
    res.render("quem-somos.ejs")
})

// Inicio Blog
// Rota Blog
app.get('/blog', (req, res) =>{
    res.render("blog.ejs")
})

// Rota 
app.get('/osociobio-apresenta-recomendacoes-a-presidenciaveis-sobre-economia-sustentavel', checkNotAuthenticated, (req, res) =>{
    res.render("osociobio-apresenta-recomendacoes-a-presidenciaveis-sobre-economia-sustentavel.ejs")
})
// Rota 
app.get('/slow-food-indica', checkNotAuthenticated, (req, res) =>{
    res.render("slow-food-indica.ejs")
})
// Rota 
app.get('/comida-comunidade-e-regeneracao', checkNotAuthenticated, (req, res) =>{
    res.render("comida-comunidade-e-regeneracao.ejs")
})
// Rota 
app.get('/cajui-da-conservacao-do-cerrado-a-cena-gastronomica-da-capital-federal', checkNotAuthenticated, (req, res) =>{
    res.render("cajui-da-conservacao-do-cerrado-a-cena-gastronomica-da-capital-federal.ejs")
})
// Fim Blog

// 404
app.get('/404', checkNotAuthenticated, (req, res) =>{
    res.render("404.ejs")
})

// Mapa do Site
app.get('/mapa-do-site', checkNotAuthenticated, (req, res) =>{
    res.render("mapa-do-site.ejs")
})

// FAQ
app.get('/faq', checkNotAuthenticated, (req, res) =>{
    res.render("faq.ejs")
})

// Contato
app.get('/contato', checkNotAuthenticated, (req, res) =>{
    res.render("contato.ejs")
})

//Rota Registro
// app.get('/register', checkNotAuthenticated, (req, res)=>{
//     res.render("register.ejs")
// })
//fim das rotas

//Inserção de dados na tabela postagem
app.post('/add', function(req, res){
    Post.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
    }).then(function(){
        res.redirect('/posts')
    }).catch(function(err){
        res.send("A Postagem não existe.")
    })
})

//deletar dados da tabela postagem
app.get('/deletar/:id', function(req, res){
    Post.destroy({where: {'id': req.params.id}}).then(function(){
        res.redirect('/posts')
    }).catch(function(err){
        res.send("A Postagem não Existe.")
    })
})

//Comando para deslogar do sistema
app.delete("/logout", (req, res) =>{
    req.logout(req.user, err =>{
        if (err) return next(err)
        res.redirect("/")
    })
})

//Funções de Autenticação
function checkAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/login")
}

function checkNotAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return res.redirect("/")
    }
    next()
}

//Localhost
app.listen(Rota, () =>
  console.log(`Servidor rodando em http://localhost:${port}`),
); 