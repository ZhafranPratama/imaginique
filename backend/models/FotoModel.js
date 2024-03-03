import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Album from "./AlbumModel.js";
import User from "./UserModel.js";

const {DataTypes} = Sequelize;

const Foto = db.define("foto", {
    FotoID : {type : DataTypes.INTEGER(11), primaryKey : true, autoIncrement : true},
    JudulFoto : DataTypes.TEXT(),
    DeskripsiFoto : DataTypes.TEXT(),
    TanggalUnggah : DataTypes.DATE(),
    LokasiFile : DataTypes.TEXT(),
    AlbumID : DataTypes.INTEGER(11),
    UserID : DataTypes.INTEGER(11),
}, {
    freezeTableName : true,
});

Foto.belongsTo(Album, {
    foreignKey : "AlbumID",
    onDelete : 'CASCADE',
});

Album.hasMany(Foto, {
    foreignKey : "AlbumID",
    onDelete : 'CASCADE',
});

Foto.belongsTo(User, {
    foreignKey : "UserID",
    onDelete : 'CASCADE',
});

User.hasMany(Foto, {
    foreignKey : "UserID",
    onDelete : 'CASCADE',
});

export default Foto;

(async()=> {
    await db.sync();
})();