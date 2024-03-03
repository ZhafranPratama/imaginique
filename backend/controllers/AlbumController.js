import Album from "../models/AlbumModel.js";
import Foto from "../models/FotoModel.js";

export const getAlbum = async(req, res) => {
    try {
        const response = Album.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getAlbumbyId = async(req, res) => {
    try {
        const response = await Album.findOne({
            where: {
                AlbumID : req.params.albumId
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getAlbumbyUserId = async(req, res) => {
    try {
        const response = await Album.findAll({
            where: {
                UserID : req.params.userId
            },
            include: [
                {
                    model:Foto,
                    attributes:["JudulFoto"]
                }
            ]
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const createAlbum = async(req, res) => {
    const {nama, deskripsi, tanggal, userId} = req.body;
    try {
        await Album.create({
            NamaAlbum : nama,
            Deskripsi : deskripsi,
            TanggalDibuat : tanggal,
            UserID : userId
        });
        res.status(201).json({msg : "Album berhasil dibuat"})
    } catch (error) {
        console.log(error.message);
    }
}

export const editAlbum = async(req, res) => {
    const data = await Album.findOne({
        where: {
            AlbumID : req.params.albumId
        }
    });
    if(!data) return res.status(404).json({msg : "Data tidak ditemukan"});
    const {nama, deskripsi} = req.body;
    try {
        await Album.update({
            NamaAlbum : nama,
            Deskripsi : deskripsi
        }, {
            where: {
                AlbumID : req.params.albumId
            }
        });
        res.status(201).json({msg : "Data berhasil dihapus"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteAlbum = async(req, res) => {
    const data = await Album.findOne({
        where: {
            AlbumID : req.params.albumId
        }
    });
    if(!data) return res.status(404).json({msg : "Data tidak ditemukan"});
    try {
        await Album.destroy({
            where: {
                AlbumID : req.params.albumId
            }
        });
        res.status(200).json({msg : "Data berhasil dihapus"});
    } catch (error) {
        console.log(error.message);
    }
}