import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import User from "./UserModel.js";

const {DataTypes} = Sequelize;

const Album = db.define("album", {
    AlbumID : {type : DataTypes.INTEGER(11), primaryKey : true, autoIncrement : true},
    NamaAlbum : DataTypes.TEXT(),
    Deskripsi : DataTypes.TEXT(),
    TanggalDibuat : DataTypes.DATE(),
    UserID : DataTypes.INTEGER(11)
}, {
    freezeTableName : true
});

Album.belongsTo(User, {
    foreignKey : "UserID",
    onDelete : 'CASCADE',
});

User.hasMany(Album, {
    foreignKey : "UserID",
    onDelete : 'CASCADE',
});

export default Album;

(async()=> {
    await db.sync();
})();