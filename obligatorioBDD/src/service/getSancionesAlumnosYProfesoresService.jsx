const API = 'http://localhost:5000'
const PATH = '/sancionesProfesoresYAlumnos'

export default async function getSancionesProfesoresYAlumnos() {
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
    const sanciones = await res.json()
    return sanciones
  } catch (error) {
    console.log(error.message)
  }
}
