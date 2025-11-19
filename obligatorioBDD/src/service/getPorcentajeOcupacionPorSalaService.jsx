const API = 'http://localhost:5000'
const PATH = '/porcentajeOcupacionPorEdificio'

export default async function getPorcentajeOcupacionPorSalaService() {
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
    const ocupacion = await res.json()
    return ocupacion
  } catch (error) {
    console.log(error.message)
  }
}
