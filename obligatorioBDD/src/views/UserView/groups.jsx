import { useState, useEffect } from 'react';
import Modal from '../../components/modal.jsx';
import SearchUsers from '../../service/getUsersRequest.jsx';
import CreateGroup from '../../service/createGroupService.jsx';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GetMyGroups from "../../service/getMyGroups.jsx";
import sendGroupRequest from '../../service/sendGroupRequest.jsx';


export default function Groups() {
    const [open, setOpen] = useState(false);
    const [usuarios, setUsuarios] = useState([]);
    const [groupName, setGroupName] = useState("");
    const [agregados, setAgregados] = useState({});
    const [grupos, setGrupos] = useState([]);

    async function handleSearch(text) {
        const data = await SearchUsers(text);
        console.log("DATA BACKEND:", data);

        if (data.success) {
            setUsuarios(data.users);
        }
    }

    async function handleCreateGroup() {
        if (!groupName.trim()) {
            toast.error("El nombre del grupo es obligatorio", {
                position: "bottom-left",
                autoClose: 3000,
            });
            return;
        }

        try {
            const data = await CreateGroup(groupName);

            if (!data.grupo || !data.grupo.id) {
                toast.error("No se pudo obtener el ID del grupo creado");
                return;
            }


            if (data?.success) {
                const studyGroupId = data.grupo.id;
                const seleccionados = Object.entries(agregados).filter(([_, marcado]) => marcado).map(([index]) => usuarios[index]);

                for (const user of seleccionados) {
                    const resp = await sendGroupRequest(studyGroupId, user.ci);

                    if (!resp.success) {
                        console.warn("Error enviando solicitud a:", user.ci, resp);
                    }
                }

                toast.success("Grupo creado y solicitudes enviadas", {
                    position: "bottom-left",
                    autoClose: 2500,
                });

                setOpen(false);
                setTimeout(() => {
                    window.location.reload();
                }, 1500);

            } else {
                toast.error(data?.description || "Error creando el grupo", {
                    position: "bottom-left",
                    autoClose: 3000,
                });
            }

        } catch (error) {
            console.error(error);
            toast.error("Error de conexión con el servidor", {
                position: "bottom-left",
                autoClose: 3000,
            });
        }
    }


    useEffect(() => {
        async function fetchGroups() {
            const data = await GetMyGroups();

            if (data.success) {
                setGrupos(data.grupos);
            }
        }

        fetchGroups();
    }, []);



    useEffect(() => {
        if (open) {
            handleSearch("");
        }
    }, [open]);

    const hayGrupos = grupos.length > 0;

    return (
        <>
            <div className='flex justify-between items-end pb-3'>
                <h2 className="ml-1 font-semibold text-gray-800 text-2xl">Grupos</h2>
                {hayGrupos && (
                    <button className={`flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm hover:bg-[#e9f0fd] transition cursor-pointer`} onClick={() => setOpen(true)}>
                        <span className="font-medium text-[#052e66]">
                            <i className="fa-solid fa-plus text-green-600"></i> Crear nuevo grupo
                        </span>
                    </button>
                )}
            </div>


            <div className={`w-full bg-white shadow-md rounded-2xl p-2 flex flex-col border border-gray-400 ${!hayGrupos ? "justify-center items-center h-80" : ""}`}>

                {hayGrupos ? (
                    <>
                        <div className="hidden lg:flex w-full justify-between text-gray-700 font-semibold px-2 pb-1 border-b border-gray-300 text-lg">
                            <div className="w-1/2 text-center">Nombre del grupo</div>
                            <div className="w-1/4 text-center">Lider</div>
                            <div className="w-1/3 text-center">Acciones</div>
                        </div>

                        <ul className="w-full overflow-auto scrollbar mt-1">
                            {grupos.map((grupo, index) => (

                                <div key={index} className="w-full rounded-md bg-[#f4f7fc] border border-gray-200 text-black p-3 my-2">
                                    <div className="hidden lg:flex justify-between items-center text-xl">
                                        <div className="w-1/2 text-center border-r-2 border-gray-300">
                                            <h1>{grupo.groupName}</h1>
                                        </div>
                                        <div className="w-1/4 text-center border-r-2 border-gray-300">
                                            <h1>{grupo.leaderName} {grupo.leaderLastName}</h1>
                                        </div>
                                        <div className="w-1/3 flex justify-center items-center gap-2">
                                            <button className="rounded-md px-3 py-1 cursor-pointer bg-[#e3edff] border border-[#bfd4ff] text-[#052e66] hover:bg-[#d5e4ff] transition-colors">
                                                Info
                                            </button>
                                            <button className="rounded-md px-3 py-1 cursor-pointer bg-[#e6f9f0] border border-[#b8ebd6] text-[#052e66] hover:bg-[#d4f5e8] transition-colors">
                                                Hacer reserva <i className="fa-solid fa-plus text-[#0d9b64]"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex flex-col lg:hidden gap-2">
                                        <span className="font-semibold text-gray-800">
                                            {grupo.groupName}
                                        </span>

                                        <span className="text-gray-600">
                                            Líder: {grupo.leaderName} {grupo.leaderLastName}
                                        </span>

                                        <div className="flex gap-2 mt-2">
                                            <button className="flex-1 rounded-xl px-4 py-2 cursor-pointer bg-[#e3edff] border border-[#bfd4ff] text-[#052e66] shadow-md hover:bg-[#d5e4ff] transition">
                                                Info
                                            </button>

                                            <button className="flex-1 rounded-xl px-4 py-2 cursor-pointer bg-[#e6f9f0] border border-[#b8ebd6] text-[#052e66] shadow-md hover:bg-[#d4f5e8] transition">
                                                Hacer reserva <i className="fa-solid !hidden lg:!inline fa-plus text-[#0d9b64]"></i>
                                            </button>
                                        </div>

                                    </div>

                                </div>

                            ))}
                        </ul>
                    </>
                ) : (
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm hover:bg-[#e9f0fd] transition cursor-pointer" onClick={() => setOpen(true)}>
                        <span className="font-medium text-[#052e66]">
                            <i className="fa-solid fa-plus text-green-600"></i> Crear nuevo grupo
                        </span>
                    </button>
                )}

            </div>
            <Modal open={open} onClose={() => setOpen(false)}>
                <div className="text-left w-full p-4 sm:p-6">
                    <h2 className="font-bold text-[#052e66] text-3xl mb-6">Crear grupo </h2>

                    <div className="flex flex-col gap-2 mb-8">
                        <label className="font-medium text-gray-700">Nombre del grupo</label>
                        <input type="text" value={groupName} onChange={(e) => setGroupName(e.target.value)} className="bg-gray-50 h-12 px-4 rounded-xl text-sm focus:outline-none border border-gray-300 focus:ring-2 focus:ring-[#052e66]/30 transition" placeholder="Grupo..." />
                    </div>

                    <div className='flex sm:justify-between flex-col gap-2 sm:flex-row sm:items-center'>
                        <label className="font-medium text-gray-700 sm:self-end">Enviar solicitudes</label>
                        <input type="text" onChange={(e) => handleSearch(e.target.value)} className="bg-gray-50 sm:h-8 h-12 px-5 sm:w-1/2 rounded-xl text-sm focus:outline-none border border-gray-300 focus:ring-2 focus:ring-[#052e66]/30 transition" placeholder="Buscar usuarios" />
                    </div>

                    <div className="w-full scrollbar bg-white rounded-2xl p-4 mt-2 shadow-inner border border-gray-200 max-h-72 overflow-y-auto space-y-3">

                        <div className="hidden md:flex w-full text-gray-600 font-medium px-2 pb-2 border-b border-gray-300">
                            <div className="basis-1/4 lg:basis-1/5 text-left">Nombre</div>
                            <div className="basis-1/4 lg:basis-1/5 text-left">Apellido</div>
                            <div className="basis-1/3 lg:basis-2/5 text-left">Correo</div>
                            <div className="basis-1/5 text-left">Solicitud</div>
                        </div>

                        {usuarios.map((user, index) => (
                            <div key={index} className="bg-[#f4f7fc] rounded-xl p-4 border border-gray-200 hover:border-[#052e66]/40 hover:bg-[#eef3fb] transition shadow-sm flex flex-col md:flex-row md:items-center gap-3">
                                <div className="md:hidden flex flex-col">
                                    <span className="font-semibold text-gray-800">
                                        {user.name} {user.lastName}
                                    </span>
                                    <span className="text-sm text-gray-600 break-all">{user.mail}</span>

                                    <button onClick={() => setAgregados(prev => ({ ...prev, [index]: !prev[index] }))}
                                        className={`px-4 cursor-pointer border border-[#052e66] py-2 mt-3 rounded-xl transition-all duration-300 text-sm shadow-md flex items-center gap-2 ${agregados[index]
                                            ? "bg-white text-[#052e66]"
                                            : "bg-[#052e66] text-white hover:bg-[#073c88]"
                                            }`}
                                    >
                                        <i className={`fa-solid ${agregados[index] ? "fa-xmark text-[#052e66]" : "fa-envelope text-white"} transition-all duration-300`}></i>
                                        {agregados[index] ? "Cancelar" : "Enviar"}
                                    </button>

                                </div>

                                <div className="hidden md:flex w-full items-center text-gray-700">
                                    <div className="basis-1/4 lg:basis-1/5">{user.name}</div>
                                    <div className="basis-1/4 lg:basis-1/5">{user.lastName}</div>
                                    <div className="basis-1/3 lg:basis-2/5 break-all pr-2">{user.mail}</div>

                                    <div className="basis-1/5 flex justify-start">
                                        <button
                                            onClick={() => setAgregados(prev => ({ ...prev, [index]: !prev[index] }))}
                                            className={`px-4 cursor-pointer border border-[#052e66] py-2 rounded-xl transition-all duration-300 text-sm shadow-md flex items-center gap-2 ${agregados[index]
                                                ? "bg-white text-[#052e66]"
                                                : "bg-[#052e66] text-white hover:bg-[#073c88]"
                                                }`}
                                        >
                                            <i className={`fa-solid ${agregados[index] ? "fa-xmark text-[#052e66]" : "fa-envelope text-white"} transition-all duration-300`}></i>
                                            {agregados[index] ? "Cancelar" : "Enviar"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                    <div className='flex flex-col mt-3 sm:flex-row sm:justify-end'>
                        <button className="sm:w-1/4 w-full sm:mt-0 sm:mx-5 py-3 cursor-pointer text-white bg-[#052e66] rounded-xl font-semibold shadow-md hover:bg-[#073c88] transition" onClick={handleCreateGroup}>
                            Crear grupo
                        </button>
                        <button onClick={() => setOpen(false)} className="sm:w-1/2 sm:hidden mt-3 sm:mt-0 inline w-full sm:mx-5 py-3 cursor-pointer text-white bg-[#052e66] rounded-xl font-semibold shadow-md hover:bg-[#073c88] transition">
                            Cancelar
                        </button>
                    </div>
                </div>
            </Modal>
            <ToastContainer />
        </>
    );
}