import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import getBuildingsService from "../../service/getBuildingsService.jsx";
import getAvailableRoomsService from "../../service/getAvailableRoomsService.jsx";


export default function AvailableRooms() {
    const [selectedBuilding, setSelectedBuilding] = useState(null);
    const today = new Date(); today.setDate(today.getDate() + 1); let day = today.getDate().toString().padStart(2, "0"); let month = (today.getMonth() + 1).toString().padStart(2, "0"); let year = today.getFullYear();
    let minDate = `${year}-${month}-${day}`;
    const [buildings, setBuildings] = useState([]);
    const [date, setDate] = useState("");
    const [salas, setSalas] = useState([]);

    const cardAnimation = {
        hidden: { opacity: 0, y: -30 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, delay: i * 0.15 }
        })
    };

    const zoomOut = {
        initial: { opacity: 1, scale: 1, filter: "blur(0px)" },
        exit: {
            opacity: 0,
            scale: 1.2,
            filter: "blur(8px)",
            transition: { duration: 0.6 }
        }
    };

    const zoomIn = {
        hidden: { opacity: 0, scale: 0.9, filter: "blur(8px)" },
        visible: {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            transition: { duration: 0.6 }
        }
    };

    useEffect(() => {
        const fetchBuildings = async () => {
            const res = await getBuildingsService();
            if (res.success) {
                setBuildings(res.buildings);
                console.log(res);
            }
        };
        fetchBuildings();
    }, []);

    useEffect(() => {
        if (!selectedBuilding || !date) return;

        const fetchStudyRooms = async () => {
            const res = await getAvailableRoomsService(selectedBuilding, date);
            if (res.success) {
                console.log(res);
                setSalas(res.rooms);
            } else {
                setSalas([]);
            }

        };

        fetchStudyRooms();
    }, [selectedBuilding, date]);

    const salasUnicas = Object.values(
        salas.reduce((acc, sala) => {
            if (!acc[sala.studyRoom]) {
                acc[sala.studyRoom] = sala;
            }
            return acc;
        }, {})
    );

    return (
        <div className="w-full overflow-hidden">
            <AnimatePresence mode="wait">
                {!selectedBuilding && (
                    <motion.div key="building-list" variants={zoomOut} initial="initial" exit="exit" animate="initial" className="grid lg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6 place-items-center overflow-hidden" >
                        {buildings.map((building, index) => (
                            <motion.div key={index} custom={index} initial="hidden" animate="visible" variants={cardAnimation} className="w-full max-w-sm bg-white rounded-2xl shadow-md border-2 border-gray-200 overflow-hidden">
                                <img src={`${building.image}`} alt="Campus" className="w-full h-60 object-cover" />
                                <div className="flex flex-col p-3">
                                    <h2 className="text-lg font-semibold text-gray-900">{building.buildingName}</h2>
                                    <p className="text-sm text-gray-500">{building.address}</p>
                                    <button onClick={() => setSelectedBuilding(building.buildingName)} className="mt-4 w-full py-2 cursor-pointer duration-300 text-white bg-[#052e66] border-2 border-[#052e66] rounded-xl font-semibold shadow-md hover:bg-[#0b49a1] transition">
                                        Ver Salas
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>


            <AnimatePresence mode="wait">
                {selectedBuilding && (
                    <motion.div key="rooms-list" variants={zoomIn} initial="hidden" animate="visible" exit="hidden" className="w-full flex flex-col gap-4">
                        <button onClick={() => setSelectedBuilding(null)} className="w-fit text-[#052e66] font-semibold text-lg cursor-pointer transition-transform duration-300 hover:-translate-x-2">
                            <i className="fa-solid fa-angle-left"></i> Volver
                        </button>

                        <div className="w-full px-4 ">
                            <div className="flex sm:justify-between sm:items-end sm:flex-row flex-col pb-3">
                                <h2 className="ml-1 font-semibold text-gray-800 text-2xl pb-2 sm:pb-0">Salas Libres</h2>
                                <input id="date" onChange={(e) => setDate(e.target.value)} type="date" min={minDate} className="bg-gray-100 border rounded-xl px-3 py-2 shadow-sm focus:outline-none border-gray-500 focus:ring-2 focus:ring-[#052e66]/50 transition-all" />
                            </div>

                            <div className="p-4 bg-gray-100 rounded-xl shadow border border-gray-200">
                                <div className="w-full flex flex-col gap-6">
                                    {salasUnicas.map((sala, index) => (
                                        <details key={index} className="w-full bg-white shadow-md rounded-xl border border-gray-200 open:shadow-lg transition-all" >
                                            <summary className="cursor-pointer select-none flex justify-between items-center px-4 py-3">
                                                <div className="flex flex-col">
                                                    <h2 className="text-xl font-bold text-[#052e66]">
                                                        {sala.studyRoom}
                                                    </h2>
                                                    <span className="text-gray-500 text-sm">
                                                        Capacidad: {sala.capacity}
                                                    </span>
                                                </div>

                                                <div className="flex items-center justify-center gap-2 text-[#052e66] text-xl font-semibold">
                                                    <i className="fa-solid fa-chevron-down"></i>
                                                </div>
                                            </summary>

                                            <div className="hidden lg:flex w-full justify-between text-[#052e66] font-semibold px-3 pb-1 border-b border-gray-300 text-lg">
                                                <div className="w-1/2 text-center">Status</div>
                                                <div className="w-1/2 text-center">Hora de inicio</div>
                                                <div className="w-1/2 text-center">Hora de final</div>
                                            </div>

                                            <ul className="w-full overflow-auto scrollbar mt-1 px-2 pb-3">
                                                {salas.filter(r => r.studyRoom === sala.studyRoom).map((turno, i) => (
                                                    <div key={i} className="w-full rounded-md bg-[#f4f7fc] border border-gray-200 text-black p-3 my-2">
                                                        <div className="hidden lg:flex justify-between items-center text-lg">
                                                            <div className={`w-1/2 text-center border-r-2 font-semibold border-gray-300 
                                                                ${turno.status === "Ocupado" ? "text-red-500" : "text-green-500"}`}>
                                                                {turno.status === "Ocupado" ? "Reservado" : "Disponible"}
                                                            </div>

                                                            <div className="w-1/2 text-center border-r-2 border-gray-300">
                                                                {turno.start}
                                                            </div>

                                                            <div className="w-1/2 text-center">
                                                                {turno.end}
                                                            </div>
                                                        </div>

                                                        <div className="flex flex-col lg:hidden">
                                                            <span className="font-semibold text-gray-800">
                                                                {turno.start} - {turno.end}
                                                            </span>

                                                            <span className={`${turno.status === "Disponible" ? "text-green-500" : "text-red-500"} text-sm`}>
                                                                {turno.status === "Disponible" ? "Disponible" : "Reservado"}
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </ul>
                                        </details>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div >
    );
}
