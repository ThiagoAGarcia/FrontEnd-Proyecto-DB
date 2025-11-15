const API = 'http://localhost:5000'
const PATH = '/userByCi'

export default async function getUsersByCiService(ci) {
  try {
    const res = await fetch(`${API}${PATH}/${ci}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${(
          localStorage.getItem('token') || ''
        ).replace(/"/g, '')}`,
      },
    })
    if (!res.ok) throw new Error(`GET ${PATH} -> ${res.status}`)
    const user = await res.json()
    return user
  } catch (error) {
    console.log(error.message)
  }
}
