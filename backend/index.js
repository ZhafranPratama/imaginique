import express from "express";
import FileUpload from "express-fileupload";
import cors from "cors";
import cookieParser from "cookie-parser";
import UserRoute from "./routes/UserRoute.js"
import LikeRoute from "./routes/LikeRoute.js";
import KomentarRoute from "./routes/KomentarRoute.js";
import FotoRoute from "./routes/FotoRoute.js";
import AlbumRoute from "./routes/AlbumRoute.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors(({credentials : true, origin : "http://localhost:5173"})));
app.use(express.json());
app.use(FileUpload());
app.use(cookieParser());
app.use(express.static("public"));
app.use(UserRoute);
app.use(LikeRoute);
app.use(KomentarRoute);
app.use(FotoRoute);
app.use(AlbumRoute);

app.listen(5000, ()=> console.log('Server up and Running...'));