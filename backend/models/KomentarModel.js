import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Foto from "./FotoModel.js";
import User from "./UserModel.js";

const {DataTypes} = Sequelize;

const Komentar = db.define("komentarfoto", {
    KomentarID : {type : DataTypes.INTEGER(11), primaryKey : true, autoIncrement : true},
    FotoID : DataTypes.INTEGER(11),
    UserID : DataTypes.INTEGER(11),
    IsiKomentar : DataTypes.TEXT(),
    TanggalKomentar : DataTypes.DATE()
}, {
    freezeTableName : true
});

Komentar.belongsTo(Foto, {
    foreignKey : "FotoID",
    onDelete : 'CASCADE'
});

Foto.hasMany(Komentar, {
    foreignKey : "FotoID",
    onDelete : 'CASCADE',
});

Komentar.belongsTo(User, {
    foreignKey : "UserID",
    onDelete : 'CASCADE',
});

User.hasMany(Komentar, {
    foreignKey : "UserID",
    onDelete : 'CASCADE',
});

export default Komentar;

(async()=> {
    await db.sync()
})();
