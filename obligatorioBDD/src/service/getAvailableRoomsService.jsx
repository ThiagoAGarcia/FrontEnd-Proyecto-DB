const API = 'http://localhost:5000'
const PATH = '/freeRooms'

export default async function getAvailableRoomsService(BUILDING, DATE) {
  try {
    const res = await fetch(`${API}${PATH}/${BUILDING}&${DATE}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`.replace(
          /"/g,
          ''
        ),
      },
    })
    if (!res.ok) {throw new Error(`GET ${PATH} -> ${res.status}`)}
    const rooms = await res.json();
    return rooms
  } catch (error) {
    console.log(error.message)
  }
}