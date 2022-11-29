const Sequelize = require('sequelize')
// CONEXÃO COM O A BASE DE DADOS
const sequelize = new Sequelize('slowfu', 'root', '0000',{
    host: "localhost",
    dialect: 'mysql',
    query:{raw:true}
})
module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}