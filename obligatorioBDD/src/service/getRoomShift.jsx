const API = 'http://localhost:5000'
const PATH = '/roomShift'

export default async function getRoomShift(BUILDING, DATE, SHIFTID, ROOMID) {
    try {
        const res = await fetch(`${API}${PATH}/${BUILDING}&${DATE}&${SHIFTID}&${ROOMID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage
                    .getItem('token')
                    .replace(/"/g, '')}`,
            },
        })
        if (!res.ok) throw new Error(`GET ${PATH} -> ${res.status}`)
        const rooms = await res.json();
        return rooms
    } catch (error) {
        console.log(error.message)
    }
}