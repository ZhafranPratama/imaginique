import Komentar from "../models/KomentarModel.js";
import User from "../models/UserModel.js";

export const getKomentarbyPostId = async(req, res) => {
    try {
        const response = await Komentar.findAll({
            where: {
                FotoId : req.params.fotoId
            },
            include:[
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

export const addKomentar = async(req, res) => {
    const {fotoId , userId, isi, tanggal} = req.body;
    await Komentar.create({
            FotoID : fotoId,
            UserID : userId,
            IsiKomentar : isi,
            TanggalKomentar : tanggal
        });
        res.status(201).json({msg : 'Komentar berhasil dibuat'})
    }