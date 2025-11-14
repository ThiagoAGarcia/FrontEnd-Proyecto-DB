export default function Data() {
    return (
        <div className="text-gray-700 text-lg overflow-y-auto scrollbar pt-10">
            <div className="w-full bg-white rounded-2xl p-2 flex flex-col border border-gray-400">

                <div className="w-full flex justify-between text-gray-700 font-semibold px-2 pb-1 border-b border-gray-300 md:text-lg text-base">
                    <div className="w-1/2 text-center">Carrera</div>
                    <div className="md:w-1/6 w-1/3 text-center">Plan</div>
                    <div className="md:w-1/2 text-center hidden md:inline">Facultad</div>
                    <div className="md:w-1/6 w-1/3 text-center">Tipo</div>
                </div>

                <ul className="w-full overflow-auto scrollbar mt-1">
                    <li>
                        <div className="w-full rounded-md bg-gray-200 text-black p-2 my-1 flex justify-between items-center md:text-lg text-sm">
                            <div className="w-1/2 text-center border-r-2 border-gray-300">
                                <h1 className="break-words">Ingeniería en Informática</h1>
                            </div>
                            <div className="md:w-1/6 w-1/3 text-center border-r-2 border-gray-300">
                                <h1>2021</h1>
                            </div>
                            <div className="md:w-1/2 text-center border-r-2 hidden md:inline border-gray-300">
                                <h1 className="break-words">Facultad de Ingeniería y Tecnologías</h1>
                            </div>
                            <div className="md:w-1/6 w-1/3 text-center border-gray-300">
                                <h1>Grado</h1>
                            </div>
                        </div>
                    </li>
                </ul>

            </div>
        </div>
    )
};