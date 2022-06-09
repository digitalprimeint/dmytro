const Sequelize = require("sequelize");
const initModels = require("./models/init-models");

const sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        dialect: 'mysql',
        define: {
            freezeTableName: true,
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        }
    },
)

let db = initModels(sequelize);

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db;