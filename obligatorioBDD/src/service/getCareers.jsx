const API = 'http://localhost:5000'
const PATH = '/career'

export default async function getCarrersService() {
  try {
    const res = await fetch(`${API}${PATH}`)
    if (!res.ok) throw new Error(`GET ${PATH} -> ${res.status}`)
    const carrera = await res.json()
    return carrera
  } catch (error) {
    console.log(error.message)
  }
}
