const Sequalize = require('sequelize');

const sequalize = new Sequalize('process.env.db_name','process.env.db_user','process.env.db_password',{
    host: 'process.env.db_host',
    dialect: 'mysql'
})

module.exports=sequalize;
