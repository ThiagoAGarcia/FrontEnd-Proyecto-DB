const API = 'http://localhost:5000'
const PATH = '/freeRooms'

export default async function getFreeRooms(BUILDING, DATE, SHIFTID, ROOMNAME) {
  try {
    const res = await fetch(`${API}${PATH}/${BUILDING}&${DATE}&${SHIFTID}&${ROOMNAME}`, {
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