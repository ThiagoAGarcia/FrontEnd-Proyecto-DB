const API = 'http://localhost:5000'
const PATH = '/shifts/mostDemanded'

export default async function getTurnosMasDemandadosService() {
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
    const shiftData = await res.json()
    return shiftData
  } catch (error) {
    console.log(error.message)
  }
}
