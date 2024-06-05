import express from 'express'
import cors from 'cors'
import { Sequelize, DataTypes } from 'sequelize';

const app = express();
const port = 3333;

app.use(cors())
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "db/database.sqlite"
})

const employee = sequelize.define("employee",{
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    cargo: DataTypes.STRING,
    status:DataTypes.BOOLEAN,
})

app.get('/test', (req, res) => {
    res.send('api rodando')
})

sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server Online - url http://localhost:${port}`)
    })
})