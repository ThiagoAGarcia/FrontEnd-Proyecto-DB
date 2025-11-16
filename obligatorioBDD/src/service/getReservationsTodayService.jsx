const API = 'http://localhost:5000'
const PATH = '/reservationsAvailableToday'

export default async function getReservationsTodayService() {
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
    const reservationData = await res.json()
    return reservationData
  } catch (error) {
    console.log(error.message)
  }
}
