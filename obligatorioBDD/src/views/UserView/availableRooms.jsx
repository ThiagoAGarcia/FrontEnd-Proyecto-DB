import { useState } from "react";

export default function AvailableRooms( {availableRooms, getAvailableRoomsParameters} ) {
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
            <div className="flex flex-row justify-between w-full">
                <h2 className="text-3xl flex ml-2 mb-3 font-semibold text-gray-800">Salas disponibles</h2>
                {error && (<p className="text-red-500 text-sm">{error}</p>)}
                <div>
                    <input id='date' type='date' min={currentDate}/>
                    <select id='buildings' name='buildings' className="">
                        <option value='Athanasius' className="text-">Edficio Athanasius</option>
                        <option value='Business School'>Business School</option>
                        <option value='Central'>Edificio Central</option>
                        <option value='Mullin'>Edficio Mullin</option>
                        <option value='San Ignacio'>Edficio San Ignacio</option>
                        <option value='San José'>Edficio San José</option>
                    </select>
                    <button onClick={() => getParameters()}>Buscar</button>
                </div>
            </div>
            
            
            <div className="w-full flex justify-between text-gray-700 font-semibold px-2 pb-1 border-b border-gray-300 md:text-lg text-base">
                <div>Horario</div>
                <div>Edificio</div>
                <div>Sala</div>
                <div>Fecha</div>
                <div>Capacidad</div>
            </div>
            <ul>
                {availableRooms.length !== 0 && availableRooms.map((room) => (
                    <li key={room.id}>
                        <div className="w-full flex flex-row justify-between p-2 m-1">
                            <p>{`${room.start} - ${room.end}`}</p>
                            <p>{room.building}</p>
                            <p>{room.studyRoom}</p>
                            <p>{room.date}</p>
                            <p>{room.capacity}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
}