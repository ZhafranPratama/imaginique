import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const User = db.define("user", {
    UserID : {type : DataTypes.INTEGER(11), primaryKey : true, autoIncrement : true},
    Username : DataTypes.TEXT(),
    Password : DataTypes.TEXT(),
    Email : DataTypes.TEXT(),
    NamaLengkap : DataTypes.TEXT(),
    Alamat : DataTypes.TEXT(),
    refresh_token : DataTypes.TEXT()
}, {
    freezeTableName : true
});

export default User;

(async()=> {
    await db.sync();
})();