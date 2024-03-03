import { Sequelize } from "sequelize";

const db = new Sequelize('ujikom_db','root', '', {
    host : "localhost",
    dialect : "mysql"
});

export default db