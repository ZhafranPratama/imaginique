import Navbar from "../components/navbarHomePage";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CloseImg from "../../public/images/x.png";

const Setting = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [namaLengkap, setNamaLengkap] = useState("");
    const [alamat, setAlamat] = useState("");
    const date = new Date();
    const navigate = useNavigate();
    const lokasi = window.location.pathname;

    useEffect(() => {
        getToken();
        getUser();
    }, [])

    async function getToken() {
        try {
            const response = await axios.get("http://localhost:5000/token");
            return response.data
        } catch (e) {
            navigate("/");
            alert("Login terlebih dahulu")
        }
    }

    const getUser = async (e) => {
        const response = await axios.get(`http://localhost:5000/user/${(await getToken()).userId}`);
        setAlamat(response.data.Alamat);
        setUsername(response.data.Username);
        setNamaLengkap(response.data.NamaLengkap);
        setEmail(response.data.Email);
    }

    const updateUser = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("username", username);
        formData.append("email", email);
        formData.append("nama", namaLengkap);
        formData.append("alamat", alamat);
        const response = await axios.patch(`http://localhost:5000/user/${(await getToken()).userId}`, formData, {
            headers: {
                "Content-type": "multipart/form-data",
            }
        });
        window.location.reload();
        console.log(response);
    }

    const Logout = async (e) => {
        await axios.delete(`http://localhost:5000/logout`);
        navigate('/');
    }

    return (
        <>
            <Navbar />
            <div className="h-screen mt-[90px] ml-10">
            <dialog id="modal_logout" className="modal w-[526px] h-[250px] rounded-[50px]">
                <div className="modal-box bg-white">
                    <div className="flex justify-center items-center mt-[20px]">
                        <form method="dialog">
                            <button>
                                <img className="w-[37px] h-[60px] ml-[575%]" src={CloseImg} />
                            </button>
                        </form>
                    </div>
                    <div className="text-black text-[30px] text-center font-bold font-Manjari pb-[20px]" >Apakah anda yakin ingin keluar?</div>
                    <div className="flex items-center justify-center">
                        <button className="w-[251px] h-[53px] bg-red-500 rounded-[50px] text-white text-2xl font-LeagueSpartan mx-auto" onClick={Logout}>Logout</button>  
                    </div>
                </div>
            </dialog>
                <div className="flex flex-row">
                    <div className=" flex h-screen w-[20%] border-r-2 items-start">
                        <div className="flex fixed flex-col justify-between">
                            <a href="/setting" className=" flex items-start">
                                <div className={lokasi === "/setting" ? "self-center text-[20px] font-LeagueSpartan pl-[15px] pr-[15px] pt-[5px] pb-[5px] bg-black text-white rounded-[50px]" : "pt-1 self-center text-[20px] font-LeagueSpartan pl-[20px]"}>
                                    Edit Credentials
                                </div>
                            </a>
                            <div className="flex items-end pt-[300%]">
                                <button onClick={()=>document.getElementById('modal_logout').showModal()} className="w-[100px] h-[40px] left-0 top-0 bg-red-500 rounded-[50px] text-white text-2xl font-LeagueSpartan">Logout</button>
                            </div>
                        </div>
                    </div>
                    <form onSubmit={updateUser} className=" flex flex-col pl-[25%] pt-10">
                        <label className="text-[25px] font-LeagueSpartan justify-start">Username</label>
                        <input type="text" className="w-[400px] h-[60px] border border-black rounded-[20px] text-[20px] pl-5" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <label className="text-[25px] font-LeagueSpartan justify-start">Email</label>
                        <input type="text" className="w-[400px] h-[60px] border border-black rounded-[20px] text-[20px] pl-5" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label className="text-[25px] font-LeagueSpartan justify-start">Nama Lengkap</label>
                        <input type="text" className="w-[400px] h-[60px] border border-black rounded-[20px] text-[20px] pl-5" placeholder="Nama Lengkap" value={namaLengkap} onChange={(e) => setNamaLengkap(e.target.value)} />
                        <label className="text-[25px] font-LeagueSpartan justify-start">Alamat</label>
                        <input type="text" className="w-[400px] h-[60px] border border-black rounded-[20px] text-[20px] pl-5" placeholder="Alamat" value={alamat} onChange={(e) => setAlamat(e.target.value)} />
                        <button className="w-[251px] h-[53px] bg-red-500 rounded-[50px] text-white text-2xl font-LeagueSpartan mx-auto mt-[50px]">Update Data</button>
                    </form>
                    <a href="/account" className=" flex items-start">
                        <img src={CloseImg} alt="" className="w-[30px] ml-32"/>
                    </a>
                </div>

            </div>
        </>
    )
}

export default Setting;