export default function managedReservations() {
    return (
        <div>
            <h2 className="text-3xl flex ml-2 mb-3 font-semibold text-gray-800">Reservas Gestionadas</h2>
            <div className="w-full bg-white shadow-md rounded-2xl p-6 flex justify-center items-center h-80 border border-gray-400">
                <span className="font-medium text-2xl text-gray-600">No has gestionado reservas hoy</span>
            </div>
        </div>
    );
}