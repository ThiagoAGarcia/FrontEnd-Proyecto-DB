const API = 'http://localhost:5000'
const PATH = '/promedioParticipantesPorSalas'

export default async function getPromedioPorSalasService() {
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
    const roomsData = await res.json()
    return roomsData
  } catch (error) {
    console.log(error.message)
  }
}
