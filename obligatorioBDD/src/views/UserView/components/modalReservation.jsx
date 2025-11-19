import { useState, useEffect } from 'react'
import Modal from '../../../components/modal';
import getRoomShift from '../../../service/getRoomShift.jsx';
import newReservation from '../../../service/createReservation.jsx';
import { ToastContainer, toast } from 'react-toastify'

export default function ModalReservation({ open, onClose, selectedGroup }) {
    const [selectedSala, setSelectedSala] = useState(null)
    const [selectedTurno, setSelectedTurno] = useState(null)
    const [salas, setSalas] = useState([])
    const [turnos, setTurnos] = useState([]);
    const [date, setDate] = useState("");
    const [building, setBuilding] = useState("");
    const today = new Date(); today.setDate(today.getDate() + 1); let day = today.getDate().toString().padStart(2, "0"); let month = (today.getMonth() + 1).toString().padStart(2, "0"); let year = today.getFullYear();
    let minDate = `${year}-${month}-${day}`;

    useEffect(() => {
        setSalas([]);
        setTurnos([]);
        setSelectedSala(null);
        setSelectedTurno(null);
    }, [date, building]);


    useEffect(() => {
        if (!date || !building) return;

        let cancelled = false;

        const fetchData = async () => {
            const shiftToSend = selectedTurno ?? "null";
            const roomToSend = selectedSala ?? "null";
            try {
                const res = await getRoomShift(building, date, shiftToSend, roomToSend);
                if (cancelled || !res || !res.success) return;
                setSalas(prev => (res.salas !== undefined ? res.salas : prev));
                setTurnos(prev => (res.turnos !== undefined ? res.turnos : prev));
            } catch (err) {
                if (cancelled) return;
                console.error("Error fetching room/shift:", err);
            }
        };

        fetchData();

        return () => { cancelled = true; };
    }, [date, building, selectedSala, selectedTurno]);

    async function crearReserva() {
        if (!date.trim()) {
            toast.error('La fecha es obligatoria', {
                position: 'bottom-left',
                autoClose: 3000,
            })
            return
        }

        if (!building.trim()) {
            toast.error('El edificio es obligatorio', {
                position: 'bottom-left',
                autoClose: 3000,
            })
            return
        }

        if (!selectedSala) {
            toast.error('La sala es obligatoria', {
                position: 'bottom-left',
                autoClose: 3000,
            })
            return
        }

        if (!selectedTurno) {
            toast.error('El turno es obligatorio', {
                position: 'bottom-left',
                autoClose: 3000,
            })
            return
        }

        if (date < minDate) {
            toast.error('La fecha no puede ser anterior a hoy', {
                position: 'bottom-left',
                autoClose: 3000,
            })
            return
        }

        try {
            const BODY = {
                studyGroupId: selectedGroup,
                studyRoomId: selectedSala,
                date: date,
                shiftId: selectedTurno,
            }
            const data = await newReservation(BODY)

            if (!data?.success) {
                toast.error(data?.description || 'Error creando la reserva', {
                    position: 'bottom-left',
                    autoClose: 3000,
                })
                return
            }

            toast.success('Reserva creada con éxito', {
                position: 'bottom-left',
                autoClose: 2500,
            })

            onClose()

            setSelectedSala(null)
            setSelectedTurno(null)
            setDate("")
            setBuilding("")

        } catch (error) {
            console.error(error)
            toast.error('Error de conexión con el servidor', {
                position: 'bottom-left',
                autoClose: 3000,
            })
        }
    }

    const toggleSala = (roomId) => {
        if (selectedSala === roomId) {
            setSelectedSala(null);
        } else {
            setSelectedSala(roomId);
        }
    };


    const toggleTurno = (turnoId) => {
        if (selectedTurno === turnoId) {
            setSelectedTurno(null);
        } else {
            setSelectedTurno(turnoId);
        }
    };

    console.log(selectedGroup);
    console.log(date);
    console.log(selectedSala);
    console.log(selectedTurno);

    return (
        <Modal open={open} onClose={onClose}>
            <div className="text-left w-full p-4 sm:p-6 overflow-y-auto sm:max-h-[80vh] max-h-[100vh] scrollbar">

                <h2 className="font-bold text-[#052e66] text-3xl mb-6">
                    Hacer Reserva
                </h2>

                <div className="flex flex-col gap-2 mb-6">
                    <label className="font-medium text-gray-700">Día de la reserva</label>
                    <input id="date" type="date" min={minDate} onChange={(e) => setDate(e.target.value)} className="bg-gray-100 border rounded-xl px-3 py-2 shadow-sm focus:outline-none border-gray-500 focus:ring-2 focus:ring-[#052e66]/50 transition-all" />
                </div>

                <div className="flex flex-col gap-2 mb-8">
                    <label className="font-medium text-gray-700">Edificio</label>
                    <select id="buildings" onChange={(e) => setBuilding(e.target.value)} className="bg-gray-100 border rounded-xl px-3 py-2 shadow-sm focus:outline-none border-gray-500 focus:ring-2 focus:ring-[#052e66]/50 transition-all">
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
                        <div className="bg-white gap-4 shadow-inner border border-gray-300 rounded-2xl p-4 max-h-68 overflow-y-auto scrollbar">
                            {salas.map((sala) => (
                                <label key={sala.roomId} onClick={(e) => { e.preventDefault(); toggleSala(sala.roomId); }} className={`flex items-center gap-4 p-4 my-4 rounded-xl cursor-pointer shadow-md transition-all ${selectedSala === sala.roomId ? "bg-gradient-to-t from-blue-100 to-blue-50 border-none text-[#052e66] shadow-[#4379c5] scale-[1.01]" : "bg-gray-50 border border-gray-300 hover:shadow-lg"}`}>
                                    <input type="radio" name="sala" className="hidden" value={sala.roomId} checked={selectedSala === sala.roomId} readOnly />
                                    <div className="flex flex-col">
                                        <span className="text-lg font-semibold">{sala.roomName}</span>
                                    </div>
                                    <span className="text-sm text-gray-600"> Capacidad: {sala.capacity} </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold text-[#052e66] text-xl mb-4">Turnos</h3>
                        <div className="bg-white shadow-inner border border-gray-300 rounded-2xl p-4 max-h-68 overflow-y-auto scrollbar">
                            {turnos.map((turno) => (
                                <label key={turno.shiftId} onClick={(e) => { e.preventDefault(); toggleTurno(turno.shiftId); }} className={`flex items-center gap-4 p-4 my-4 rounded-xl cursor-pointer shadow-md transition-all ${selectedTurno === turno.shiftId ? "bg-gradient-to-t from-blue-100 to-blue-50 border-none text-[#052e66] shadow-[#4379c5] scale-[1.01]" : "bg-gray-50 border border-gray-300 hover:shadow-lg"}`}>
                                    <input type="radio" name="turno" className="hidden" value={turno.shiftId} checked={selectedTurno === turno.shiftId} readOnly />
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-gray-800">{turno.start} - {turno.end}</span>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex lg:justify-end justify-center mt-6">
                    <button onClick={crearReserva} className="px-6 py-3 duration-300 rounded-xl border-[#052e66] border-1 font-semibold shadow-md bg-white text-[#052e66] hover:bg-gray-100 transition cursor-pointer">
                        Hacer Reserva
                    </button>
                </div>

            </div>
        </Modal>
    );
}