export default function Data({ children, reserva }) {
    return (
        <div className="w-full rounded-md bg-[#f4f7fc] border border-gray-200 text-black p-2 my-1 flex justify-between items-center md:text-xl text-lg">
            <div className="w-1/2 text-center border-r-2 border-gray-300">
                <h1>12:00 - 13:00</h1>
            </div>
            <div className="w-1/4 text-center border-r-2 border-gray-300">
                <span><h1 className="hidden sm:inline">Sala</h1> 101</span>
            </div>
            <div className="w-1/2 sm:w-1/3 flex justify-center items-center text-sm md:text-xl">
                {children}
            </div>
        </div>
    );
}
