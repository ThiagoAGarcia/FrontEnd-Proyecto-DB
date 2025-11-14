import NavBar from "../components/navBar";
import Footer from "../components/footer";
import { useState } from "react";
import Data from "./UserView/components/data";
import MisReservas from "./UserView/components/misReservas";

export default function ProfileUser() {
    const [tab, setTab] = useState("acerca");

    const user = {
        nombre: "Santiago",
        apellido: "Aguerre",
        rol: "Bibliotecario",
        correo: "santiago.aguerre@correo.ucu.edu.uy",
        campus: "Montevideo",
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
            <NavBar />

            <section className="flex-grow flex flex-col items-center justify-start py-10 sm:p-10">
                <div className="w-full max-w-5xl bg-white shadow-md rounded-xl p-8">
                    <div className="flex flex-col md:flex-row items-center justify-between px-1">
                        <div className="flex flex-col md:flex-row text-center md:text-left items-center justify-center gap-6">
                            <div className="w-30 h-30 rounded-full bg-[#052e66] flex items-center justify-center cursor-pointer">
                                <i className="fa-solid fa-user text-white text-6xl"></i>
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold">
                                    {user.nombre} {user.apellido}
                                </h1>
                                <p className="text-sm text-gray-500 mt-1">
                                    ({user.rol})
                                </p>
                            </div>
                        </div>

                        <div className="relative w-48 mt-6 md:flex lg:flex-col md:mt-0">
                            <select id="carreraInput" className="appearance-none w-full border-b mb-6 p-2 pr-8 rounded-sm focus:border-blue-900 focus:border-b bg-gray-50">
                                <option value="">Cambiar de Rol</option>
                                <option value="INGE">Administrador</option>
                                <option value="INGE">Profesor</option>
                            </select>
                            <span className="absolute top-2 right-5 pointer-events-none text-[#052e66]"> ▼ </span>
                        </div>
                    </div>

                    <div className="flex gap-6 mt-6 border-b">
                        <button onClick={() => setTab("acerca")} className={`cursor-pointer pb-2 font-medium ${tab === "acerca" ? "border-b-2 border-[#052e66] text-[#052e66]" : "text-gray-500 hover:text-gray-700"}`}> Acerca de mí</button>
                        {/* Esto tendria que desaparecer si el rol es administrador o bibliotecario*/} <button onClick={() => setTab("reservas")} className={`cursor-pointer pb-2 font-medium ${tab === "reservas" ? "border-b-2 border-[#052e66] text-[#052e66]" : "text-gray-500 hover:text-gray-700"}`}> Reservas realizadas</button>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6 mt-6 shadow-sm">

                        {tab === "acerca" && (
                            <>
                                <h2 className="text-xl font-bold mb-4 text-[#052e66]">Acerca de mí</h2>
                                <div className="grid grid-cols-1 pl-2 md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="font-semibold text-[#052e66]">Nombre</p>
                                        <p>{user.nombre}</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-[#052e66]">Apellido</p>
                                        <p>{user.apellido}</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-[#052e66]">Email</p>
                                        <p className="break-words">{user.correo}</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-[#052e66]">Campus</p>
                                        <p>{user.campus}</p>
                                    </div>
                                </div>

                                <Data />
                            </>
                        )}

                        {tab === "reservas" && (
                            <MisReservas />
                        )}

                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
