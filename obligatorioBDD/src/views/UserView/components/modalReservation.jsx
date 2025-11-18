import { useState } from 'react'
import Modal from '../../../components/modal';

export default function ModalReservation({ open, onClose }) {
    const [selectedSala, setSelectedSala] = useState(null) /* ESTO SOLO DE LA RESERVA */
    const [selectedTurno, setSelectedTurno] = useState(null) /* ESTO SOLO DE LA RESERVA */

    const salasEjemplo = [
        { id: 1, nombre: "Sala 101", capacidad: 12 },
        { id: 2, nombre: "Sala 102", capacidad: 8 },
        { id: 3, nombre: "Sala 103", capacidad: 6 }
    ]; /* ESTO SOLO DE LA RESERVA */

    const turnosEjemplo = [
        { id: 1, hora: "08:00 - 09:00" },
        { id: 2, hora: "09:00 - 10:00" },
        { id: 3, hora: "10:00 - 11:00" }
    ]; /* ESTO SOLO DE LA RESERVA */

    return (
        <Modal open={open} onClose={onClose}>
            <div className="text-left w-full p-4 sm:p-6 overflow-y-auto sm:max-h-[80vh] max-h-[100vh] scrollbar">

                <h2 className="font-bold text-[#052e66] text-3xl mb-6">
                    Hacer Reserva
                </h2>

                <div className="flex flex-col gap-2 mb-8">
                    <label className="font-medium text-gray-700">Día de la reserva</label>
                    <input id="date" type="date" className="bg-gray-100 border rounded-xl px-3 py-2 shadow-sm focus:outline-none border-gray-500 focus:ring-2 focus:ring-[#052e66]/50 transition-all" />
                </div>

                <div className="flex flex-col gap-2 mb-8">
                    <label className="font-medium text-gray-700">Edificio</label>
                    <select id="buildings" className="bg-gray-100 border rounded-xl px-3 py-2 shadow-sm focus:outline-none border-gray-500 focus:ring-2 focus:ring-[#052e66]/50 transition-all">
                        <option>Athanasius</option>
                        <option>Business School</option>
                        <option>Central</option>
                        <option>Mullin</option>
                        <option>San Ignacio</option>
                        <option>San José</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                        <h3 className="font-bold text-[#052e66] text-xl mb-4">Salas</h3>
                        <div className="bg-white gap-4 shadow-inner border border-gray-300 rounded-2xl p-4 max-h-80 overflow-y-auto">
                            {salasEjemplo.map((sala) => (
                                <label key={sala.id} className={`flex items-center gap-4 p-4 my-4 rounded-xl cursor-pointer shadow-md transition-all ${selectedSala === sala.id ? "bg-gradient-to-t from-blue-100 to-blue-50 border-none text-[#052e66] shadow-[#4379c5] scale-[1.01]" : "bg-gray-50 border border-gray-300 hover:shadow-lg"}`}>
                                    <input type="radio" name="sala" className="hidden" value={sala.id} checked={selectedSala === sala.id} onChange={() => setSelectedSala(sala.id)} />
                                    <div className="flex flex-col">
                                        <span className="text-lg font-semibold">{sala.nombre}</span>
                                    </div>
                                    <span className="text-sm text-gray-600"> Capacidad: {sala.capacidad} </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold text-[#052e66] text-xl mb-4">Turnos</h3>
                        <div className="bg-white shadow-inner border border-gray-300 rounded-2xl p-4 max-h-80 overflow-y-auto">
                            {turnosEjemplo.map((turno) => (
                                <label key={turno.id} className={`flex items-center gap-4 p-4 my-4 rounded-xl cursor-pointer shadow-md transition-all ${selectedTurno === turno.id ? "bg-gradient-to-t from-blue-100 to-blue-50 border-none text-[#052e66] shadow-[#4379c5] scale-[1.01]" : "bg-gray-50 border border-gray-300 hover:shadow-lg"}`}>
                                    <input type="radio" name="turno" className="hidden" value={turno.id} checked={selectedTurno === turno.id} onChange={() => setSelectedTurno(turno.id)} />
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-gray-800">{turno.hora}</span>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex lg:justify-end justify-center mt-6">
                    <button className="px-6 py-3 duration-300 rounded-xl border-[#052e66] border-1 font-semibold shadow-md bg-white text-[#052e66] hover:bg-gray-100 transition cursor-pointer">
                        Hacer Reserva
                    </button>
                </div>

            </div>
        </Modal>
    );
}