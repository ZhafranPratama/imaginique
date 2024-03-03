import Navbar from "../components/navbarLandingPage";
import LandingPagePic from "../../public/images/LandingPagePic.png";
import Imaginique from "../../public/images/Imaginique.png";
import CloseImg from "../../public/images/x.png"
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate  = useNavigate();

    useEffect(()=>{
        getToken();
    },[])

    async function getToken () {
            const response = await axios.get("http://localhost:5000/token",{withCredentials:true});
            navigate("/dashboard");
    }

    const register = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("username", username);
        formData.append("email", email);
        formData.append("password", password);
        try {
            await axios.post("http://localhost:5000/register", formData, {
                headers: {
                    "Content-type" : "multipart/form-data",
                }
            });
            window.location.reload();
        } catch (error) {
            console.log(error.message);
        }
    }

    const login = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);
        try {
            await axios.post("http://localhost:5000/login", formData, {
                headers: {
                    "Content-type" : "multipart/form-data",
                }
            });
            navigate('/dashboard');
        } catch (error) {
            console.log(error.response); 
        }
    }

    return (
        <div className="flex flex-col">
            <Navbar></Navbar>
            <div className="h-screen bg-amber-200">
                <div className="flex">
                    <img className="w-[400px] h-[500px] ml-[100px] mt-[150px]" src={LandingPagePic} />
                    <div className="row-1 pt-[230px] pl-[260px]">
                        <div className="relative text-rose-800 text-[70px] font-medium font-LeagueSpartan">Post what you want</div>
                        <div className="relative text-center text-rose-800 text-[40px] font-light font-LeagueSpartan">What did you see on the <br />road today? Share it to the<br />rest of the world, to<br />let them know!</div>
                    </div>
                </div>
            </div>
            <dialog id="my_modal_1" className="modal w-[526px] h-[530px] rounded-[50px]">
                <div className="modal-box bg-white">
                    <div className="flex justify-center items-center mt-[20px]">
                        <img className="w-16 h-16 mt-[10px] ml-[210px]" src={Imaginique} />
                        <form method="dialog">
                            <button>
                                <img className="w-[37px] h-[60px] ml-[180px]" src={CloseImg} />
                            </button>
                        </form>
                    </div>
                    <div className="text-black text-[30px] text-center font-bold font-Manjari mt-[20px] pb-[20px]" >Welcome to Imaginique</div>
                    <div className="flex items-center justify-center">
                    <form onSubmit={login} className="flex flex-col">
                        <label className="text-[25px] font-LeagueSpartan justify-start">Email</label>
                        <input type="email" className="w-[400px] h-[60px] border border-black rounded-[20px] text-[20px] pl-5" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <label className="text-[25px] font-LeagueSpartan justify-start mt-[30px]">Password</label>
                        <input type="password" className="w-[400px] h-[60px] border border-black rounded-[20px] text-[20px] pl-5" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <button className="w-[251px] h-[53px] bg-red-500 rounded-[50px] text-white text-2xl font-LeagueSpartan mx-auto mt-[50px]">Log in</button>
                    </form>
                    </div>
                </div>
            </dialog>
            <dialog id="my_modal_2" className="modal w-[526px] h-[800px] rounded-[50px]">
                <div className="modal-box bg-white">
                    <div className="flex justify-center items-center mt-[20px]">
                        <img className="w-16 h-16 mt-[10px] ml-[210px]" src={Imaginique} />
                        <form method="dialog">
                            <button>
                                <img className="w-[37px] h-[60px] ml-[180px]" src={CloseImg} />
                            </button>
                        </form>
                    </div>
                    <div className="text-black text-[30px] text-center font-bold font-Manjari mt-[20px] pb-[20px]" >Welcome to Imaginique</div>
                    <div className="flex items-center justify-center">
                    <form onSubmit={register} className="flex flex-col">
                        <label className="text-[25px] font-LeagueSpartan justify-start">Email</label>
                        <input type="email" className="w-[400px] h-[60px] border border-black rounded-[20px] text-[20px] pl-5" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <label className="text-[25px] font-LeagueSpartan justify-start mt-[30px]">Username</label>
                        <input type="text" className="w-[400px] h-[60px] border border-black rounded-[20px] text-[20px] pl-5" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                        <label className="text-[25px] font-LeagueSpartan justify-start mt-[30px]">Password</label>
                        <input type="password" className="w-[400px] h-[60px] border border-black rounded-[20px] text-[20px] pl-5" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <button className="w-[251px] h-[53px] bg-red-500 rounded-[50px] text-white text-2xl font-LeagueSpartan mx-auto mt-[50px]">Sign up</button> 
                    </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default LandingPage;