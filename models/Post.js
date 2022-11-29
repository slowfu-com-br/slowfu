const db = require('./db')
const Post = db.sequelize.define('posts', {
    titulo:{
        type: db.Sequelize.STRING
    },
    descricao:{
        type: db.Sequelize.TEXT('long')
    },
    telefone:{
        type: db.Sequelize.STRING
    },
    whatsapp:{
        type: db.Sequelize.STRING
    },
    producao:{
        type: db.Sequelize.STRING
    },
    localidade:{
        type: db.Sequelize.STRING
    }
})
// Post.sync({force:true})
module.exports = Post