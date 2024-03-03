import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUser = async (req, res) => {
    try {
        const user = await User.findOne({
            attributes: ['UserID', 'Username', 'Email', 'NamaLengkap', 'Alamat'], where:{
                UserID : req.params.userId
            }
        });
        res.json(user);
    } catch (error) {
        console.log(error);
    }
}

export const Register = async (req, res) => {
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await User.create({
            Username: username,
            Email: email,
            Password: hashPassword
        });
        res.json({ msg: 'Registrasi Berhasil' });
    } catch (error) {
        console.log(error);
    }
}

export const Login = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                Email: req.body.email
            }
        });
        const match = await bcrypt.compare(req.body.password, user.Password)
        if (!match) return res.status(400).json({ msg: "Wrong Password" });
        const userId = user.UserID;
        const username = user.Username;
        const email = user.Email;
        const accessToken = jwt.sign({ userId, username, email }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '20s'
        });
        const refreshToken = jwt.sign({ userId, username, email }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        });
        await User.update({ refresh_token: refreshToken }, {
            where: {
                UserID: userId
            }
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 100
        });
        res.json({ accessToken });
    } catch (error) {
        res.status(404).json(error.message);
    }

}

export const Logout = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    const user = await User.findAll({
        where:{
            refresh_token: refreshToken
        }
    });
    if (!user[0]) return res.sendStatus(204);
    const userId = user[0].UserID;
    await User.update({ refresh_token: null }, {
        where: {
            UserID: userId
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200)

}

export const updateUser = async(req, res) => {
    const {username, password, email, nama, alamat} = req.body;
    const data = await User.findOne({
        where:{
            UserID : req.params.userId
        }
    })
    if(!data) return res.status(404).json({msg : "Data tidak ditemukan"});
    try {
        await User.update({
            Username : username,
            Email : email,
            NamaLengkap : nama,
            Alamat : alamat
        }, {
            where: {
                UserID : req.params.userId
            }
        });
        res.status(201).json({msg : "Data berhasil diubah"})
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteUser = async(req, res) => {
    const data = await User.findOne({
        where: {
            UserID : req.params.userId
        }
    });
    if(!data) return res.status(404).json({msg : "Data tidak ditemukan"});
    try {
        await User.destroy({
            where: {
                UserID : req.params.userId
            }
        });
        res.status(200).json({msg : "Data berhasil dihapus"});
    } catch (error) {
        console.log(error.message);
    }
}
