import Data from "../../../components/data";

export default function ReservationsAvailable( {reservationsToday, handleNewManagedReservation } ) {
    const reservas = [
        { studyGroupid: 101, roomName: "Sala 101" },
        { studyGroupid: 102, roomName: "Sala 102" },
        { studyGroupid: 103, roomName: "Sala 103" },
    ];

    const hayReservas = reservas.length > 0;

    return (
        <div className="text-xl">
            <div className="sm:flex justify-between items-center w-full sm:pb-3">
                <h2 className="ml-1 font-semibold text-gray-800 text-2xl">Reservas Disponibles</h2>
                <div className=" py-3 sm:py-0 px-1 sm:px-0 sm:p-4 text-gray-300 outline-none focus:outline-none sm:w-1/2">
                    <div className="relative flex">
                        <input type="text" className="bg-white h-10 flex px-5 w-full rounded-full text-sm focus:outline-none border-2 border-gray-500" placeholder="Buscar reservas" />
                    </div>
                </div>
            </div>


            <div className={`w-full bg-white shadow-md rounded-2xl p-2 flex border border-gray-400 ${!hayReservas ? "justify-center items-center h-80" : ""}`}>
                {hayReservas ? (
                    <ul className="w-full overflow-auto scrollbar">
                        {reservas.map((reserva) => (
                            <li key={reserva.studyGroupid}>
                                <Data reserva={reserva} />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <span className="font-medium text-2xl text-gray-600">
                        No hay reservas disponibles hoy
                    </span>
                )}
            </div>
        </div>
    );
}
