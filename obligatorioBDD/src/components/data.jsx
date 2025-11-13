export default function Data({ reserva }) {
    return (
        <div className="w-full rounded-md bg-gray-200 text-black p-2 my-1 flex justify-between md:text-xl text-lg">
            <div className="border-r-3 pr-3 border-gray-300 items-center flex justify-center">
                <h1>12:00 - 13:00</h1>
            </div>
            <div className="flex pl-3">
                <div className="border-r-3 pr-3 border-gray-300 items-center flex justify-center">
                    <span><h1 className="hidden sm:inline">Sala</h1> 101</span>
                </div>
                {/* <div className="border-r-3 px-3 border-gray-300 items-center flex justify-center">
                    <h1>Mullin</h1>
                </div> */}
                <button className="font-semibold ml-3 border-2 rounded-md mx-1 px-3 bg-gray-300 hover:bg-gray-200 transition-colors cursor-pointer">
                    Info.
                </button>
                <button className="border-2 rounded-md mx-1 px-0.5 bg-red-100 cursor-pointer hover:bg-red-50 transition-colors flex justify-center items-center">
                    <i className="fa-solid fa-xmark text-[#052e66]"></i>
                </button>
                <button className="border-2 rounded-md mx-1 px-0.5 bg-green-100 cursor-pointer hover:bg-green-50 transition-colors flex justify-center items-center">
                    <i className="fa-solid fa-check text-[#052e66]"></i>
                </button>
            </div>
        </div>
    );
}
