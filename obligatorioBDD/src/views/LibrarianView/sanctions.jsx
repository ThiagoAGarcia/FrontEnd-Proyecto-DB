export default function Sanctions({ finishedReservations }) {
    const hayReservas = Array.isArray(finishedReservations) && finishedReservations.length > 0;

    return (
        <div>
            <div
                className={`w-full bg-white shadow-md rounded-2xl p-2 flex flex-col border border-gray-400 ${!hayReservas ? 'justify-center items-center h-80' : ''
                    }`}>
                {hayReservas ? (
                    <>
                        <div className="w-full flex justify-between text-gray-700 font-semibold px-2 pb-1 border-b border-gray-300 md:text-lg text-base">
                            <div className="w-1/2 text-center">Turno</div>
                            <div className="w-1/4 text-center">Salas</div>
                            <div className="w-1/2 sm:w-1/3 text-center">Acciones</div>
                        </div>

                        <ul className="w-full overflow-auto scrollbar mt-1">
                            {finishedReservations &&
                                finishedReservations.map((reservation) => (
                                    <li key={reservation.studyGroupId}>
                                        <Data reserva={reservation}>
                                            <button
                                                onClick={() =>
                                                    handleRestoreAvailableReservation(reservation)
                                                }
                                                title="Dejar de gestionar"
                                                className="border-1 rounded-md sm:mx-1 px-2 mx-0.5 p-0.5 bg-red-100 cursor-pointer hover:bg-red-50 transition-colors">
                                                <i className="fa-solid fa-arrow-left text-[#052e66]"></i>
                                            </button>
                                            <button
                                                title="Información reserva"
                                                className="border-1 rounded-md sm:mx-1 px-2 mx-0.5 p-0.5 bg-gray-300 hover:bg-gray-200  cursor-pointer transition-colors">
                                                <i className="fa-solid fa-circle-exclamation text-[#052e66]"></i>
                                            </button>
                                        </Data>
                                    </li>
                                ))}
                        </ul>
                    </>
                ) : (
                    <span className="font-medium text-2xl text-gray-600">
                        No se ha gestionado ninguna reserva hoy
                    </span>
                )}
            </div>
        </div>
    )
}