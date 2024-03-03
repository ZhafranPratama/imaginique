import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Foto from "./FotoModel.js";
import User from "./UserModel.js";

const {DataTypes} = Sequelize;

const Like = db.define("likefoto", {
    LikeID : {type : DataTypes.INTEGER(11), primaryKey : true, autoIncrement : true},
    FotoID : DataTypes.INTEGER(11),
    UserID : DataTypes.INTEGER(11),
    TanggalLike : DataTypes.DATE()
}, {
    freezeTableName : true
});

Like.belongsTo(Foto, {
    foreignKey : "FotoID",
    onDelete : 'CASCADE',
});

Foto.hasMany(Like, {
    foreignKey : "FotoID",
    onDelete : 'CASCADE',
});

Like.belongsTo(User, {
    foreignKey : "UserID",
    onDelete : 'CASCADE',
});

User.hasMany(Like, {
    foreignKey : "UserID",
    onDelete : 'CASCADE',
});

export default Like;

(async()=> {
    await db.sync();
})();