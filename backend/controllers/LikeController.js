import Like from "../models/LikeModel.js";

export const getLikebyPostId = async(req, res) => {
    try {
        const response = await Like.findAll({
            where: {
                FotoID : req.params.fotoId
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getLikebyUserId = async(req, res) => {
    try {
        const response = await Like.findAll({
            where: {
                UserID : userId
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getLikeDetail = async(req, res) => {
        const response = await Like.findOne({
            where: {
                UserID : req.params.userId,
                FotoID : req.params.postId,
            }
        });
        res.json(response);
}

export const addLike = async(req, res) => {
    const {fotoId, userId, tanggal} = req.body;
    await Like.create({
        FotoID : fotoId,
        UserID : userId, 
        TanggalLike : tanggal
    });
    res.status(201).json({msg : 'Foto berhasil disukai'});
}

export const deleteLike = async(req, res) => {
    await Like.destroy({
        where: {
            UserID : req.params.userId,
            FotoID : req.params.postId,
        }
    });
    res.status(200).json({msg : 'Like berhasil dihapus'});
}