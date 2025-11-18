const API = 'http://localhost:5000'
const PATH = '/myGroups'

export default async function getMyGroupsService() {
  try {
    const res = await fetch(`${API}${PATH}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage
          .getItem('token')
          .replace(/"/g, '')}`,
      },
    })
    if (!res.ok) throw new Error(`GET ${PATH} -> ${res.status}`)
    const grupos = await res.json()
    return grupos
  } catch (error) {
    console.log(error.message)
  }
}
