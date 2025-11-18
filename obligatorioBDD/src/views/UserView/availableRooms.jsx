import { useState } from "react";

export default function AvailableRooms({ availableRooms, getAvailableRoomsParameters }) {
    const date = new Date(); let day = date.getDate(); let month = date.getMonth() + 1; let year = date.getFullYear();
    let currentDate = `${year}-${month}-${day}`;

    const [error, setError] = useState('');

    const getParameters = () => {
        const dateValue = document.getElementById('date').value;
        const buildingValue = document.getElementById('buildings').value;        

        if (dateValue === '') {
            setError('Debes elegir una fecha.');
        } else {
            setError('');
            getAvailableRoomsParameters(buildingValue, dateValue);
        }
    }

    return (
        <>
            <div className="flex flex-col lg:flex-row gap-3 w-full mb-4 lg:items-end  lg:justify-between">
                <h2 className="lg:ml-1 ml-0 font-semibold text-gray-800 text-2xl">Salas disponibles</h2>
                <div className="flex gap-3 flex-col md:flex-row md:items-end">
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-600 mb-1">Fecha</label>
                        <input id="date" type="date" min={currentDate} className="bg-gray-100 border rounded-xl px-3 py-2 shadow-sm focus:outline-none border-gray-500 focus:ring-2 focus:ring-[#052e66]/50 transition-all" />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-600 mb-1">Edificio</label>
                        <select id="buildings" className="bg-gray-100 border rounded-l-xl px-3 py-2 shadow-sm focus:outline-none border-gray-500 focus:ring-2 focus:ring-[#052e66]/50 transition-all">
                            <option value="Athanasius">Edificio Athanasius</option>
                            <option value="Business School">Business School</option>
                            <option value="Central">Edificio Central</option>
                            <option value="Mullin">Edificio Mullin</option>
                            <option value="San Ignacio">Edificio San Ignacio</option>
                            <option value="San José">Edificio San José</option>
                        </select>
                    </div>
                    <div className="flex justify-center md:justify-end">
                        <button onClick={getParameters} className="self-center lg:self-end px-12 py-2 shadow rounded-md cursor-pointer bg-[#e3edff] border border-[#bfd4ff] text-[#052e66] hover:bg-[#d5e4ff] transition-colors">
                            Buscar
                        </button>
                    </div>
                </div>
            </div>

            <div className="w-full bg-white shadow-md rounded-2xl p-2 flex flex-col border border-gray-400">
                <div className="hidden text-center lg:flex w-full justify-between text-gray-700 font-semibold px-2 pb-1 border-b border-gray-300 text-lg">
                    <div className="w-1/5">Horario</div>
                    <div className="w-1/5">Edificio</div>
                    <div className="w-1/5">Sala</div>
                    <div className="w-1/5">Fecha</div>
                    <div className="w-1/5">Capacidad</div>
                </div>
                <ul className="w-full overflow-auto scrollbar mt-1 hidden lg:block">
                    {availableRooms.map((room) => (
                        <li key={room.id}>
                            <div className="w-full rounded-md bg-[#f4f7fc] border border-gray-200 text-black p-3 my-2 flex justify-between text-lg">

                                <div className="w-1/5 text-center border-r-2 border-gray-300">
                                    {room.start} - {room.end}
                                </div>

                                <div className="w-1/5 text-center border-r-2 border-gray-300">
                                    {room.building}
                                </div>

                                <div className="w-1/5 text-center border-r-2 border-gray-300">
                                    {room.studyRoom}
                                </div>

                                <div className="w-1/5 text-center border-r-2 border-gray-300">
                                    {room.date}
                                </div>

                                <div className="w-1/5 text-center">
                                    {room.capacity}
                                </div>

                            </div>
                        </li>
                    ))}
                </ul>

                <ul>
                    {availableRooms.length !== 0 && availableRooms.map((room) => (
                        <li key={room.id}>
                            <div className="bg-[#f4f7fc] lg:hidden rounded-xl p-4 my-2 border border-gray-200 shadow-sm flex flex-col gap-2 text-[#052e66]">
                                <p><span className="font-semibold">Horario:</span> {room.start} - {room.end}</p>
                                <p><span className="font-semibold">Edificio:</span> {room.building}</p>
                                <p><span className="font-semibold">Sala:</span> {room.studyRoom}</p>
                                <p><span className="font-semibold">Fecha:</span> {room.date}</p>
                                <p><span className="font-semibold">Capacidad:</span> {room.capacity}</p>
                            </div>
                        </li>

                    ))}
                </ul>

            </div>

        </>
    );
}