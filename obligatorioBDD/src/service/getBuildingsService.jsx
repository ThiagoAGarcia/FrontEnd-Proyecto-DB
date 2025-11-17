const API = 'http://localhost:5000'
const PATH = '/buildings'

export default async function getBuildingsService() {
  try {
    const res = await fetch(`${API}${PATH}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${(localStorage.getItem('token') || '').replace(
          /"/g,
          ''
        )}`,
      },
    })

    if (!res.ok) throw new Error(`GET ${PATH} -> ${res.status}`)

    return await res.json()
  } catch (error) {
    console.error('Error al obtener edificios:', error)
    return {success: false, buildings: []}
  }
}
