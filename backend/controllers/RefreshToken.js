import User from "../models/UserModel.js";
import jwt from 'jsonwebtoken';

export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.sendStatus(401);
        const user = await User.findAll({
            where: {
                refresh_token: refreshToken
            }
        });
        if (!user[0]) return res.sendStatus(403);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) return res.sendStatus(403);
            const userId = user[0].UserID;
            const name = user[0].Username;
            const email = user[0].Email;
            const accessToken = jwt.sign({ userId, name, email }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '1d'
            });
            res.json({ accessToken, userId, name});
        });
    } catch (error) {
        console.log(error);
    }
}