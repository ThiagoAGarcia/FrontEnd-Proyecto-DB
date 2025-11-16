import Data from './components/data'

export default function ReservationsAvailable({
  reservationsToday,
  handleNewManagedReservation,
}) {
  const hayReservas = reservationsToday && reservationsToday.length > 0

  return (
    <div className="text-xl">
      <div className="sm:flex justify-between items-center w-full sm:pb-3">
        <h2 className="ml-1 font-semibold text-gray-800 text-2xl">
          Reservas Disponibles
        </h2>

        <div className="py-3 sm:py-0 px-1 sm:px-0 sm:p-4 text-gray-300 sm:w-1/2">
          <div className="relative flex">
            <input
              type="text"
              className="bg-white h-10 flex px-5 w-full rounded-full text-sm focus:outline-none border-2 placeholder-gray-400 border-gray-500"
              placeholder="Buscar reservas"
            />
          </div>
        </div>
      </div>

      <div
        className={`w-full bg-white shadow-md rounded-2xl p-2 flex flex-col border border-gray-400 ${
          !hayReservas ? 'justify-center items-center h-80' : ''
        }`}>
        {hayReservas ? (
          <>
            <div className="w-full flex justify-between text-gray-700 font-semibold px-2 pb-1 border-b border-gray-300 md:text-lg text-base">
              <div className="w-1/2 text-center">Turno</div>
              <div className="w-1/4 text-center">Salas</div>
              <div className="w-1/2 sm:w-1/3 text-center">Acciones</div>
            </div>

            <ul className="w-full overflow-auto scrollbar mt-1">
              {reservationsToday.map((reservation) => (
                <li key={reservation.studyGroupId}>
                  <Data reserva={reservation}>
                    <button
                      title="Cancelar reserva"
                      className="border-1 rounded-md sm:mx-1 px-2 mx-0.5 p-0.5 bg-red-100 cursor-pointer hover:bg-red-50 transition-colors">
                      <i className="fa-solid fa-xmark text-[#052e66]"></i>
                    </button>
                    <button
                      onClick={() => handleNewManagedReservation(reservation)}
                      title="Aceptar reserva"
                      className="border-1 rounded-md sm:mx-1 px-2 mx-0.5 p-0.5 bg-green-100 cursor-pointer hover:bg-green-50 transition-colors">
                      <i className="fa-solid fa-check text-[#052e66]"></i>
                    </button>
                    <button
                      title="Más información"
                      className="border-1 rounded-md sm:mx-1 mx-0.5 p-0.5 px-2 font-semibold bg-gray-300 hover:bg-gray-200 transition-colors cursor-pointer">
                      <i className="fa-solid fa-arrow-right text-[#052e66]"></i>
                    </button>
                  </Data>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <span className="font-medium text-2xl text-gray-600">
            No hay reservas disponibles hoy
          </span>
        )}
      </div>
    </div>
  )
}
