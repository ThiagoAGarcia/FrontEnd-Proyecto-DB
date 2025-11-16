export default function AvailableRooms( {availableRooms} ) {
    console.log(availableRooms)
    return (
        <>
            <h2 className="text-3xl flex ml-2 mb-3 font-semibold text-gray-800">
                Salas disponibles
            </h2>
            <ul>
                {availableRooms && availableRooms.map((room) => {
                    <li key={room.studyRoom}>
                        <p>{`${room.start} - ${room.end}`}</p>
                        <p>{room.building}</p>
                        <p>{room.studyRoom}</p>
                    </li>
                })}
            </ul>
        </>
    );
}