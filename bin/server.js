require("dotenv").config();
const app = require("../src/api");

app.use((req, res, next) => {
    next();
});

console.log(process.env.API_PORT);
let port = process.env.API_PORT ||3001;
app.listen(port);

console.log(`listenig on ${port}`);

//pXjhFJi1MOEbSpeU senha banco de dados
//josehluiz00 nome banco de dados