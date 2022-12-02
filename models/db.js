const Sequelize = require('sequelize')
// CONEXÃO COM O A BASE DE DADOS
const sequelize = new Sequelize('slowfu', 'slowfu_add1', 'Slowfu2022',{
    host: "mysql.slowfu.com.br",
    dialect: 'mysql',
    query:{raw:true}
})
module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}