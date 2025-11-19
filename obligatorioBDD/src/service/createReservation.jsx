const API = 'http://localhost:5000'
const PATH = '/newReservation'

export default async function createReservation(BODY) {
    try {
        const res = await fetch(`${API}${PATH}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${(localStorage.getItem('token') || '').replace(/"/g, '')}`,
            },
            body: JSON.stringify(BODY),
        })
        if (!res.ok) throw new Error(`POST ${PATH} -> ${res.status}`)
        const reservation = await res.json()
        return reservation
    } catch (error) {
        console.log(error.message);
    }
}