const API = 'http://localhost:5000'
const PATH = '/freeRooms'

export default async function getAvailableRoomsService(DATE) {
  try {
    const res = await fetch(`${API}${PATH}/${DATE}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`.replace(
          /"/g,
          ''
        ),
      },
    })
    if (!res.ok) {
        const test = await res.json();
        throw new Error(`GET ${PATH} -> ${res.status} ${test.error}`)}
    const rooms = res.json()
    return rooms
  } catch (error) {
    console.log(error.message)
  }
}