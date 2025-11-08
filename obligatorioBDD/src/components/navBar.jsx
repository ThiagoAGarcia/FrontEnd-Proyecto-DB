import { useState } from "react";

export default function NavBar() {
    const [menuAbierto, setMenuAbierto] = useState(false);
    const toggleMenu = () => setMenuAbierto(!menuAbierto);

    return (
        <>
            <nav className="relative bg-[#052e66] after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/30 px-5 py-7 sm:flex sm:items-center sm:justify-between">
                <section className="flex justify-between w-full items-center">
                    <img src="./public/logo.png" className="h-12" alt="Logo" />
                    <div className="px-5 flex items-center gap-6 relative">
                        <div className="hidden sm:flex items-center gap-6">
                            <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center cursor-pointer">
                                <i className="fa-solid fa-user text-[#052e66] text-lg"></i>
                            </div>
                            <button className="text-white text-3xl cursor-pointer">
                                <i className="fa-solid fa-envelope w-6 h-6 fill-current"></i>
                            </button>
                        </div>
                        <button className="text-white text-3xl cursor-pointer" onClick={toggleMenu}>
                            <i className={`fa-solid ${menuAbierto ? "fa-xmark" : "fa-bars"} w-6 h-6 fill-current`}></i>
                        </button>
                        {menuAbierto && (
                            <div className="absolute right-0 top-14 bg-white text-[#052e66] rounded-xl shadow-lg w-44 flex flex-col z-50">
                                <button className="text-left px-4 py-2 hover:bg-[#e5e9f2] rounded-t-xl cursor-pointer transition-colors duration-300">Inicio</button>
                                <button className="text-left px-4 py-2 hover:bg-[#e5e9f2] sm:rounded-b-xl cursor-pointer transition-colors duration-300"> Cerrar Sesión </button>
                                <button className="text-left px-4 py-2 hover:bg-[#e5e9f2] flex items-center gap-2 sm:hidden cursor-pointer transition-colors duration-300">
                                    <i className="fa-solid fa-envelope text-[#052e66] text-lg"></i>
                                    Notificaciones
                                </button>
                                <button className="text-left px-4 py-2 hover:bg-[#e5e9f2] rounded-b-xl flex items-center gap-2 sm:hidden transition-colors duration-300">
                                    <i className="fa-solid fa-user text-[#052e66] text-lg"></i>
                                    Perfil
                                </button>
                            </div>
                        )}
                    </div>
                </section>
            </nav>
        </>
    );
}
