import { useState } from 'react'
import Modal from '../../components/modal.jsx'

export default function Groups() {
    const [open, setOpen] = useState(false);
    const grupos = [
        
    ]
    const [agregados, setAgregados] = useState({});
    const hayGrupos = grupos.length > 0;

    const usuarios = [
        { nombre: "Agostina", apellido: "Etchebarren", correo: "agostina.etchebarren@correo.ucu.edu.uy" },
        { nombre: "Santiago", apellido: "Aguerre", correo: "santiago.aguerre@correo.ucu.edu.uy" },
        { nombre: "Martín", apellido: "Gómez", correo: "martin.gomez@correo.ucu.edu.uy" },
    ]
    const hayUsuarios = usuarios.length > 0;

    return (
        <>
            <h2 className="ml-1 pb-3 font-semibold text-gray-800 text-2xl">Grupos</h2>
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
                                            <h1>{grupo.nombre}</h1>
                                        </div>
                                        <div className="w-1/4 text-center border-r-2 border-gray-300">
                                            <h1>{grupo.lider}</h1>
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
                                            {grupo.nombre}
                                        </span>

                                        <span className="text-gray-600">
                                            Líder: {grupo.lider}
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
                        <input type="text" className="bg-gray-50 h-12 px-4 rounded-xl text-sm focus:outline-none border border-gray-300 focus:ring-2 focus:ring-[#052e66]/30 transition" placeholder="Grupo..." />
                    </div>

                    <div className='flex sm:justify-between flex-col gap-2 sm:flex-row sm:items-center'>
                        <label className="font-medium text-gray-700 sm:self-end">Enviar solicitudes</label>
                        <input type="text" className="bg-gray-50 sm:h-8 h-12 px-5 sm:w-1/2 rounded-xl text-sm focus:outline-none border border-gray-300 focus:ring-2 focus:ring-[#052e66]/30 transition" placeholder="Buscar usuarios" />
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
                                        {user.nombre} {user.apellido}
                                    </span>
                                    <span className="text-sm text-gray-600 break-all">{user.correo}</span>

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
                                    <div className="basis-1/4 lg:basis-1/5">{user.nombre}</div>
                                    <div className="basis-1/4 lg:basis-1/5">{user.apellido}</div>
                                    <div className="basis-1/3 lg:basis-2/5 break-all pr-2">{user.correo}</div>

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
                        <button className="sm:w-1/4 w-full sm:mt-0 sm:mx-5 py-3 cursor-pointer text-white bg-[#052e66] rounded-xl font-semibold shadow-md hover:bg-[#073c88] transition">
                            Crear grupo
                        </button>
                        <button onClick={() => setOpen(false)} className="sm:w-1/2 sm:hidden mt-3 sm:mt-0 inline w-full sm:mx-5 py-3 cursor-pointer text-white bg-[#052e66] rounded-xl font-semibold shadow-md hover:bg-[#073c88] transition">
                            Cancelar
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
}