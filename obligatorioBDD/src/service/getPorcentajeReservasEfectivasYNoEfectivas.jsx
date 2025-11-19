const API = 'http://localhost:5000'
const PATH = '/porcentajeReservasEfectivasYNoEfectivas'

export default async function getPorcentajeReservasEfectivasYNoEfectivas() {
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
    const reservas = await res.json()
    return reservas
  } catch (error) {
    console.log(error.message)
  }
}
