import { useState } from "react";

export default function AvailableRooms( {availableRooms, getAvailableRoomsParameters} ) {
    const date = new Date(); let day = date.getDate(); let month = date.getMonth() + 1; let year = date.getFullYear();
    let currentDate = `${year}-${month}-${day}`;

    const [error, setError] = useState('');

    const getParameters = () => {
        const dateValue = document.getElementById('date').value;
        const buildingValue = document.getElementById('buildings').value;
        console.log(dateValue);
        console.log(buildingValue);

        if (dateValue === '') {
            setError('Debes elegir una fecha.');
        } else {
            setError('');
            console.log(availableRooms);
            getAvailableRoomsParameters(buildingValue, dateValue);
        }
    }

    return (
        <>
            <h2 className="text-3xl flex ml-2 mb-3 font-semibold text-gray-800">
                Salas disponibles
            </h2>
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
                {error && (<p>{error}</p>)}
            </div>
            <ul>
                {availableRooms.length !== 0 && availableRooms.map((room) => (
                    <li key={room.studyRoom}>
                        <div className="flex flex-row space-between">
                            <p>{`${room.start} - ${room.end}`}</p>
                            <p>{room.building}</p>
                            <p>{room.studyRoom}</p>
                            <p>{room.date}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
}