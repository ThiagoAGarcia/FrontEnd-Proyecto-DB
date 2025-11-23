export default function Data({ children, reserva }) {
    return (
        <div className="bg-[#f4f7fc] rounded-xl p-4 border border-gray-200 hover:border-[#052e66]/40 transition-all hover:bg-[#eef3fb] duration-200 shadow-sm flex flex-col lg:flex-row lg:items-center gap-3 text-gray-800">

            <div className="lg:hidden flex flex-col gap-1 text-xl">
                <span className="font-semibold">
                    {reserva.start} - {reserva.end}
                </span>
                <span>Sala: {reserva.studyRoom}</span>
                <span>Estado: {reserva.state}</span>

                <div className="flex gap-3 mt-2">
                    {children}
                </div>
            </div>

            <div className="hidden lg:flex lg:flex-row w-full items-center text-gray-700 md:text-lg text-sm">
                <div className="w-1/3 text-center border-r-2 border-gray-300">
                    {reserva.start} - {reserva.end}
                </div>

                <div className="w-1/5 text-center border-r-2 border-gray-300">
                    {reserva.studyRoom}
                </div>

                <div className={`w-1/7 text-center font-semibold border-r-2 border-gray-300 ${reserva.state === "Finalizada" ? "text-red-500" : "text-green-500"} ${reserva.state === "Finalizada" ? "Finalizada" : "Activa"}`}>
                    {reserva.state}
                </div>

                <div className="w-1/3 flex flex-row justify-center items-center gap-2">
                    {children}
                </div>
            </div>
        </div>
    );
}
