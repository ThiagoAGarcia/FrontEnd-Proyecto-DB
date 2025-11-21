import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import getBuildingsService from "../../service/getBuildingsService.jsx";
import getRoomsAdmin from "../../service/getRoomsAdmin.jsx";
import CreateSalaModal from "./CreateSalaModal.jsx";
import ModifySalaModal from "./ModifySalaModal.jsx";
import getStudyRooms from "../../service/getStudyRooms.jsx";

export default function Salas() {
    const [selectedBuilding, setSelectedBuilding] = useState(null);
    const [buildings, setBuildings] = useState([]);
    const [salas, setSalas] = useState([]);
    const [salaSearch, setSalaSearch] = useState('');
    const [open, setOpen] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [openModify, setOpenModify] = useState(false);

    const [studyRooms, setStudyRooms] = useState([]);

    const getRooms = async () => {
        try {
            const res = await getStudyRooms()
            setStudyRooms(res.studyRooms || [])
        } catch (error) {
            console.error(error)
            toast.error('Error al cargar las salas')
        }
    }

    useEffect(() => {
        getRooms()
    }, [])

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
        if (!selectedBuilding) return;

        const fetchRooms = async () => {
            const res = await getRoomsAdmin(selectedBuilding);
            if (res.success) {
                console.log(res);
                setSalas(res.rooms);
            } else {
                setSalas([]);
            }

        };

        fetchRooms();
    }, [selectedBuilding]);

    return (
        <>

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

                <CreateSalaModal open={open} onClose={() => { setOpen(false) }} selectedBuilding={selectedBuilding} />

                <ModifySalaModal open={openModify} onClose={() => { setOpenModify(false) }} selectedRoom={selectedRoom} onUpdated={getRooms} />

                <AnimatePresence mode="wait">
                    {selectedBuilding && (
                        <motion.div key="rooms-list" variants={zoomIn} initial="hidden" animate="visible" exit="hidden" className="w-full flex flex-col gap-4">

                            <button onClick={() => setSelectedBuilding(null)} className="w-fit text-[#052e66] font-semibold text-lg cursor-pointer transition-transform duration-300 hover:-translate-x-2">
                                <i className="fa-solid fa-angle-left"></i> Volver
                            </button>

                            <div className="w-full px-4 ">
                                <div className="flex sm:justify-between sm:items-end sm:flex-row flex-col pb-3 gap-3">
                                    <input type="text" className="bg-white text-gray-800 h-10 px-5 sm:w-1/2 w-full rounded-full text-sm focus:outline-none border-2 placeholder-gray-400 border-gray-500" placeholder="Buscar" value={salaSearch} onChange={(e) => setSalaSearch(e.target.value)} />
                                    <button onClick={() => setOpen(true)} className="bg-[#052e66] text-white w-full lg:w-1/5 sm:w-1/3 rounded-xl shadow-md hover:bg-[#073c88] transition disabled:opacity-60 flex items-center justify-center h-10 px-4 border cursor-pointer">
                                        Añadir Sala
                                    </button>
                                </div>

                                <div className={`w-full bg-white shadow-md rounded-2xl p-2 flex flex-col border border-gray-400 ${!salas || salas.length === 0 ? 'justify-center items-center h-80' : ''}`}>
                                    {!salas || salas.length === 0 ? (
                                        <span className="font-medium text-2xl text-gray-600">
                                            No hay salas en el sistema
                                        </span>
                                    ) : (
                                        <>
                                            <div className="hidden lg:flex w-full px-4 text-left justify-between text-gray-700 font-semibold pb-1 border-b border-gray-300 md:text-lg text-base">
                                                <div className="w-1/4 text-center">Nombre</div>
                                                <div className="w-1/5 text-center">Capacidad</div>
                                                <div className="w-1/4 text-center">Tipo</div>
                                                <div className="w-1/2 text-center">Acciones</div>
                                            </div>

                                            <ul className="w-full overflow-auto scrollbar mt-1 p-2">
                                                {salas.map((data) => (
                                                    <li key={data.studyRoomId} className="bg-[#f4f7fc] border border-gray-200 hover:bg-[#e9eef7] transition-all duration-300 rounded-md flex lg:flex-row flex-col lg:items-center justify-between lg:h-20 mb-3 p-3 lg:gap-3 gap-2" >
                                                        <div className="lg:w-1/4 w-full lg:border-r-2 border-gray-300">
                                                            <p className="text-2xl lg:text-lg text-gray-800 font-semibold break-all text-left lg:text-center">
                                                                {data.roomName}
                                                            </p>
                                                        </div>

                                                        <div className="lg:w-1/5 w-full lg:border-r-2 border-gray-300">
                                                            <p className="text-base lg:text-xl text-gray-600 lg:text-gray-800 font-semibold text-left lg:text-center">
                                                                <span className="lg:hidden inline">Capacidad: </span>{data.capacity}
                                                            </p>
                                                        </div>


                                                        <div className="lg:w-1/4 w-full lg:border-r-2 border-gray-300">
                                                            <div className="flex flex-wrap justify-start lg:justify-center gap-2">
                                                                <span className="lg:hidden inline">Tipo: </span>{data.roomType}
                                                            </div>
                                                        </div>

                                                        <div className="flex flex-col sm:flex-row justify-start lg:justify-center items-stretch gap-3 lg:w-1/2 w-full text-center">
                                                            <button className="w-full px-4 cursor-pointer border border-[#052e66] py-2 rounded-xl transition-all duration-300 text-sm shadow-md flex items-center justify-center gap-2 bg-[#052e66] text-white hover:bg-[#073c88]" onClick={() => {
                                                                setSelectedRoom(data)
                                                                setOpenModify(true)
                                                            }}>
                                                                <i className="fa-solid fa-pen text-white"></i>
                                                                <span className="sm:hidden">Modificar</span>
                                                            </button>

                                                            <button onClick={() => deleteUser(data.ci)} className="w-full px-4 cursor-pointer border border-[#052e66] py-2 rounded-xl transition-all duration-300 text-sm shadow-md flex items-center justify-center gap-2 bg-white text-[#052e66] hover:bg-[#f4f7fc]">
                                                                <i className="fa-solid fa-trash text-[#052e66]"></i>
                                                                <span className="sm:hidden">Eliminar</span>
                                                            </button>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div >
        </>

    );
}
