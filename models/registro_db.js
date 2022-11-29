const db = require('./db')
const Registro = db.sequelize.define('cadastros', {
    name:{
        type: db.Sequelize.STRING,
    },
    telefone:{
        type: db.Sequelize.STRING,
    },
    email:{
        type: db.Sequelize.STRING,
    },
    password:{
        type: db.Sequelize.STRING,
    }
})

// Registro.sync({force:true})
module.exports = Registro