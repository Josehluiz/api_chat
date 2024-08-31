var express = require("express");
var app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());

const usuarioController = require("./controllers/usuarioController");
const salaController = require("./controllers/salaController");
const token = require("./util/token");

const port = process.env.PORT || 3001;

app.post('/some-endpoint', async (req, res) => {
    try {
        const test = await token.checktoken(req.headers.token, req.headers.iduser, req.headers.nick);
        if (test) {
            res.status(200).send('Token is valid');
        } else {
            res.status(401).send('Invalid token');
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

const router = express.Router();
app.use('/', router.get('/', (req, res) => {
    res.status(200).send("<h1>API - CHAT</h1>")
}));


app.use('/salas', router.get('/salas', async (req, res, next) => {
    console.log("Chegou na rota de salas");
    const token = require("./util/token");
    console.log(req.headers.token);
    const test = await token.checktoken(req.headers.token, req.headers.iduser, req.headers.nick)
    console.log(req.headers.iduser);
    console.log(test);
    if(test)
        {
        let resp = await salaController.get();

        res.status(200).send(resp);

    }else{
        res.status(401).send({"msg":"Usuário inválido"});
    }

}));

app.use('/sobre', router.get('/sobre', (req, res, next) => {
    res.status(200).send({
        "nome": "API - CHAT",
        "versao": "0.1.0",
        "author": "José Luiz Pereira da Rosa"
    })
}));




app.use("/usuario/entrar", router.post("/usuario/entrar", async (req, res) => {
        try {
        let resp = await usuarioController.entrar(req.body.nick);
        res.status(200).send(resp);
    } catch (error) {
        res.status(400).send({ error: "deu errado" });
        console.log("deu errado", error);
    }
    }
));

app.post("/sala/entrar", async (req, res) => {
    console.log("Entrar na sala");
    try {
        const test = await token.checktoken(req.headers.token, req.headers.iduser, req.headers.nick);
        console.log(test,"teste");
        if (test) {
            let resp = await salaController.entrar(req.headers.iduser, req.headers.idsala);
            res.status(200).send(resp);
        } else {
            res.status(401).send({ error: "Invalid token" });
        }
    } catch (error) {
        res.status(500).send({ error: "Internal Server Error" });
        console.log("Erro ao entrar na sala", error);
    }
});

app.use("/sala/sair", router.post("/sala/sair", async (req, res) => {
    const token = require("./util/token");
    const salaController = require("./controllers/salaController");
    if (!token.checktoken(req.headers.token, req.headers.iduser, req.headers.nick)) return false;
    
    let resp = await salaController.sair(req.headers.iduser);
    res.status(200).send(resp);
}));


app.use("/sala/listar", router.get("/sala/listar", async (req, res) => {
    const token = require("./util/token");
    const salaController = require("./controllers/salaController");
    if (!token.checktoken(req.headers.token, req.headers.iduser, req.headers.nick)) return false;
    
    let resp = await salaController.buscarMensagens(req.headers.idsala, req.query.timestamp);
    res.status(200).send(resp);
}));

app.use("/sala/enviar", router.post("/sala/enviar", async (req, res) => {
    const token = require("./util/token");
    const salaController = require("./controllers/salaController");
    if (!token.checktoken(req.headers.token,req.headers.iduser,req.headers.nick)) return false;
    let resp = await salaController.enviarMensagem(req.headers.nick, req.body.msg, req.body.idsala);
    res.status(200).send(resp);
}));




module.exports=app;