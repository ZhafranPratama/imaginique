import Imaginique from "../../public/images/Imaginique.png"
import { useEffect, useState } from "react"
import axios from "axios"

const Navbar = ({ }) => {
    const [name, setName] = useState("");
    const lokasi = window.location.pathname

    useEffect(()=>{
        getToken();
    },[])

    async function getToken () {
        const response = await axios.get("http://localhost:5000/token")
        setName(response.data.name[0])
    }



    return (
        <nav className="bg-white h-[90px] flex fixed top-0 left-0 right-0 items-center justify-between">
            <div className="flex items-center">
                <img className="w-[50px] h-[50px] ml-[10px]" src={Imaginique} />
                <a href="/dashboard">
                    <div className={lokasi === "/dashboard" ? "ml-[14px] self-center text-[20px] font-LeagueSpartan pl-[15px] pr-[15px] pt-[5px] pb-[5px] bg-black text-white rounded-[50px]" : "ml-2 mr-[16px] self-center text-[20px] font-LeagueSpartan pl-[20px]"}>
                        Beranda
                    </div>
                </a>
                <a href="/post">
                    <div className={lokasi === "/post" || lokasi === "/album" ? "ml-[27px] self-center text-[20px] font-LeagueSpartan pl-[15px] pr-[15px] pt-[5px] pb-[5px] bg-black text-white rounded-[50px]" : "ml-[20px] self-center text-[20px] font-LeagueSpartan pl-[20px]"}>
                        Buat
                    </div>
                </a>
            </div>
            <div className="flex items-center">
            <a href="/account">
                    <div className={lokasi === "/account" || lokasi === "/account/album" || lokasi === "/setting" ? "w-[50px] h-[50px] self-center text-center bg-neutral-400 pt-[10px] rounded-full mr-4 text-[20px] font-LeagueSpartan border-[3px] border-black" : "w-[50px] h-[50px] self-center text-center bg-neutral-400 pt-[10px] rounded-full mr-4 text-[20px] font-LeagueSpartan border-[3px] border-white"}>
                        {name}
                    </div>
                </a>
            </div>
        </nav>
    )
}

export default Navbar;