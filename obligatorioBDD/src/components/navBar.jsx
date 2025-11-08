export default function navBar() {
    return (
        <>
           <nav className="relative bg-[#052e66] after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/30 px-5 py-7 sm:flex sm:items-center sm:justify-between">
                <section className="flex justify-between items-center">
                    <img src=".\public\logo.png" className="h-12" alt="Logo" />
                        <button className="text-white text-xl sm:hidden cursor-pointer">
                            <i className="fa-solid fa-bars w-6 h-6 fill-current" id="hamburguesa"></i>
                        </button>
                </section>
                <div className="hidden flex-col items-start mt-2 gap-2 sm:text-right sm:flex-row sm:m-0 sm:flex " id="nav-buttons">
                    <button className="text-white hover:bg-[#042350] w-full text-left rounded-xl px-3 py-1 transition-colors duration-300 hover:text-white cursor-pointer">Inicio</button>
                    <button className="text-white hover:bg-[#042350] w-full text-left rounded-xl px-3 py-1 transition-colors duration-300 hover:text-white cursor-pointer">Explorar</button>
                </div>
            </nav> 
        </>
    );
}