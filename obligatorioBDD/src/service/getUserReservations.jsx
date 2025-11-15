const API = 'http://localhost:5000'
const PATH = '/user/reservations'

export default async function getReservationsUserService() {
  try {
    const res = await fetch(`${API}${PATH}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${(
          localStorage.getItem('token') || ''
        ).replace(/"/g, '')}`,
      },
    })
    if (!res.ok) throw new Error(`GET ${PATH} -> ${res.status}`)
    const reservation = await res.json()
    return reservation
  } catch (error) {
    console.log(error.message)
  }
}
