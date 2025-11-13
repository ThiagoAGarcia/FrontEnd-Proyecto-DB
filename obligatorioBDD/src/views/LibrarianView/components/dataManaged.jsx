export default function Data({ reserva }) {
    return (
        <div className="w-full rounded-md bg-gray-200 text-black p-2 my-1 flex justify-between items-center md:text-xl text-lg">
            <div className="w-1/2 text-center border-r-2 border-gray-300">
                <h1>12:00 - 13:00</h1>
            </div>
            <div className="w-1/4 text-center border-r-2 border-gray-300">
                <span><h1 className="hidden sm:inline">Sala</h1> 101</span>
            </div>
            <div className="w-1/2 sm:w-1/3 flex justify-center items-center text-sm md:text-xl">       
                <button title="Dejar de gestionar" className="border-1 rounded-md sm:mx-1 px-2 mx-0.5 p-0.5 bg-red-100 cursor-pointer hover:bg-red-50 transition-colors">
                    <i className="fa-solid fa-arrow-left text-[#052e66]"></i>
                </button>
                <button title="Información reserva" className="border-1 rounded-md sm:mx-1 px-2 mx-0.5 p-0.5 bg-gray-300 hover:bg-gray-200  cursor-pointer transition-colors">
                    <i className="fa-solid fa-circle-exclamation text-[#052e66]"></i>
                </button>
            </div>
        </div>
    );
}
