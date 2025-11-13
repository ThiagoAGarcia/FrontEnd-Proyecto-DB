const API = 'http://localhost:5000'
const PATH = '/campus'

export default async function getCampusService() {
  try {
    const res = await fetch(`${API}${PATH}`)
    if (!res.ok) throw new Error(`GET ${PATH} -> ${res.status}`)
    const campus = await res.json()
    console.log(campus)
    return campus
  } catch (error) {
    console.log(error.message)
  }
}
