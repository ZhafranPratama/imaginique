import Foto from "../models/FotoModel.js";
import path from "path";
import fs from "fs";
import User from "../models/UserModel.js";
import Album from "../models/AlbumModel.js";

export const getImage = async(req, res) => {
    try {
        const response = await Foto.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getImagebyId = async(req, res) => {
    try {
        const response = await Foto.findOne({
            where: {
                FotoID : req.params.fotoId
            },
            include: [
                {
                    model:User,
                    attributes:["Username"]
                }
            ]
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getImagebyUserId = async(req, res) => {
    try {
        const response = await Foto.findAll({
            where: {
                UserID : req.params.userId
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getImagebyAlbumId = async(req, res) => {
        const response = await Foto.findAll({
            where: {
                AlbumID : req.params.albumId
            },
            include:[
                {
                    model:Album
                }
            ]
        });
        res.json(response);
    }

export const postFoto = async(req, res) => {
    const {judul, deskripsi, tanggal, albumId, userId} = req.body;
    const foto = req.files.foto;
    const ext = path.extname(foto.name);
    const filename = foto.md5 + ext;

    foto.mv(`./public/images/${filename}`, async(err) => {
        if(err) return res.status(500).json({msg : err.message});
        console.log(req.body);
            await Foto.create({
                JudulFoto : judul,
                DeskripsiFoto : deskripsi,
                TanggalUnggah : tanggal,
                LokasiFile : filename,
                AlbumID : albumId,
                UserID : userId
            });
            res.status(201).json({msg : "Foto berhasil diupload"})
        
    })
}

export const editFoto = async(req, res) => {
    const data = await Foto.findOne({
        where: {
            FotoID : req.params.fotoId
        }
    });
    if(!data) return res.status(404).json({msg : "Data tidak ditemukan"});
    let filename = "";
    if(req.files === null){
        filename = data.LokasiFile
    }else{
        const foto = req.files.foto;
        const ext = path.extname(foto.name);
        filename = foto.md5 + ext;

        const filepath = `./public/images/${data.LokasiFile}`;
        fs.unlinkSync(filepath);

        foto.mv(`./public/images/${filename}`, (err)=>{
            if (err) return res.status(500).json({msg : err.message});
        });
    }
    const {judul, deskripsi, albumId} = req.body;

    try {
        await Foto.update({
            JudulFoto : judul,
            DeskripsiFoto : deskripsi,
            LokasiFile : filename,
            AlbumID : albumId
        }, {
            where: {
                FotoID : req.params.fotoId
            }
        });
        res.status(200).json({msg : "Post berhasil diubah"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteFoto = async(req, res) => {
    const data = await Foto.findOne({
        where: {
            FotoID : req.params.fotoId
        }
    });
    if(!data) return res.status(404).json({msg : "Data tidak ditemukan"});

    try {
        const filepath = `./public/images/${data.LokasiFile}`;
        fs.unlinkSync(filepath);
        await Foto.destroy({
            where: {
                FotoID : req.params.fotoId
            }
        });
        res.status(200).json({msg : "Data berhasil dihapus"})
    } catch (error) {
        console.log(error.message);
    }
}