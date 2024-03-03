import Imaginique from "../../public/images/Imaginique.png"

const Navbar = ({ }) => {
    return (
        <nav className="bg-white h-[90px] flex fixed top-0 left-0 right-0 items-center justify-between">
            <div className="flex items-center">
                <img className="w-[70px] h-[70px] ml-[10px]" src={Imaginique} />
                <div className="self-center text-red-500 text-[30px] font-LeagueSpartan pl-[10px]">Imaginique</div>
            </div>
            <div className="flex items-center">

                <div className="w-36 h-[57px] pl-[30px] pt-[10px]">
                    <button onClick={()=>document.getElementById('my_modal_1').showModal()} className="w-[100px] h-[40px] left-0 top-0 bg-red-500 rounded-[50px] text-white text-2xl font-LeagueSpartan">Login</button>
                </div>
                <div className="w-36 h-[57px] left-[1370px] pt-[10px]">
                    <button onClick={()=>document.getElementById('my_modal_2').showModal()} className="w-[100px] h-[40px] left-0 top-0 bg-neutral-400 rounded-[50px] text-black text-2xl font-LeagueSpartan">Sign up</button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;