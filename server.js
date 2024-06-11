import express from 'express'
import cors from 'cors'
import { Sequelize, DataTypes } from 'sequelize'

const app = express();
const port = 3333;

app.use(cors())
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "db/database.sqlite"
});

const Employee = sequelize.define("Employee", {
    nome : DataTypes.STRING,
    email : DataTypes.STRING,
    cargo : DataTypes.STRING,
    status : DataTypes.BOOLEAN,
});

app.get('/test', (req, res) => {
    res.send('api rodando')
});

app.post('/colaboradores', async (req,res) => {
    const {nome, email, cargo, status} = req.body;

    if(!nome || !email){
        return res.send(`<div style='background-color: rgba(255,102,102,0.8); position: absolute; top:24px; right: 24px; padding: 4px 24px; border-radius:4px'><p style='color:#fff'>Preencha todos os campos!</p></div>`)
    }
    
    try{
        const funcionario = await Employee.create({
            nome,
            email,
            cargo,
            status: status ? true : false
        })
        
        return res.send(`<div style='background-color: rgba(0,202,32,0.8); position: absolute; top:24px; right: 24px; padding: 4px 24px; border-radius:4px'><p style='color:#fff'>Funcionário registrado com sucesso!</p></div>`);

    }catch(err){
        console.log(err);
        
        return res.send(`<div style='background-color: rgba(255,102,102,0.8); position: absolute; top:24px; right: 24px; padding: 4px 24px; border-radius:4px'><p style='color:#fff'>Erro ao cadastrar...</p></div>`);
    }

    res.send('its works');
})

sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server Online - url http://localhost:${port}`)
    })
})