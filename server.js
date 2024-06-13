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

app.get('/colaboradores', async (req, res)=>{
    try {
        const funcionarios = await Employee.findAll();
        let html = funcionarios.map((funcionario)=> `
            <div style='background-color:#fafafa; padding:8px; border-radius:8px; margin-bottom:14px; position:relative' >
                <strong style='color:#000; font-size:20px;'>${funcionario.nome}</strong>
                <p style='color:#000'> Email: ${funcionario.email}</p>
                <p style='color:#000'> Cargo: ${funcionario.cargo}</p>
                <p style='color:#000'> Status: ${funcionario.status ? "<span style='background-color:#039e00; padding:0px 8px;'> Ativo </span>":"<span style='background-color:#bf0d02; padding:0px 8px; color:#fff'> Inativo </span>"}</p>

                <div style='position:absolute; top:14px; right:14px'>
                    <button 
                        style='background-color:#121212; 
                        padding:0 8px; 
                        color:#fff' 
                        onclick="handleEdit(
                            ${funcionario.id},
                            '${funcionario.nome}', 
                            '${funcionario.email}', 
                            '${funcionario.cargo}', 
                            '${funcionario.status}'
                        )"
                        >
                        Editar
                    </button>
                    <button 
                        style='background-color:#ef4444; 
                        padding:0 8px; color:#fff' 
                        onclick='handleDelete(${funcionario.id})'
                        >
                        Deletar
                    </button>
                </div>
            </div>
        `).join('');

        return res.send(html);

    } catch (error) {
        console.log(error);
        return res.send(`<div style='background-color: rgba(255,102,102,0.8); position: absolute; top:24px; right: 24px; padding: 4px 24px; border-radius:4px'><p style='color:#fff'>Erro ao buscar dados...</p></div>`);
    }
});

app.delete('/colaboradores/:id', async(req,res) => {
    
    const id = req.params.id;
    
    if(!id){
        return res.send("<div style='background-color: rgba(255,102,102,0.8); position: absolute; top:24px; right: 24px; padding: 4px 24px; border-radius:4px'><p style='color:#fff'>Erro ao buscar dados...</p></div>");
    }

    try {
        const funcionario = await Employee.findByPk(id);
        
        if(!funcionario){
            return res.status(400).send("<div style='background-color: rgba(255,102,102,0.8); position: absolute; top:24px; right: 24px; padding: 4px 24px; border-radius:4px'><p style='color:#fff'>Erro ao buscar dados...</p></div>");
        }

        await funcionario.destroy();

        return res.send("<div style='background-color: rgba(0,202,32,0.8); position: absolute; top:24px; right: 24px; padding: 4px 24px; border-radius:4px'><p style='color:#fff'>Funcionário deletado com sucesso!</p></div>");

    } catch (error) {
        console.log(error);
        return res.status(400).send("<div style='background-color: rgba(255,102,102,0.8); position: absolute; top:24px; right: 24px; padding: 4px 24px; border-radius:4px'><p style='color:#fff'>Erro ao buscar dados...</p></div>");
    }
});

app.put('/colaboradores', async(req, res) => {
    const{id, nome, email, cargo, status} = req.body;
    console.log(req.body);
    res.send('ok');
});

sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server Online - url http://localhost:${port}`)
    });
});