const API = 'http://localhost:5000'
const PATH = '/studyRooms'

export default async function getStudyRooms() {
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
    const studyRooms = await res.json()
    return studyRooms
  } catch (error) {
    console.log(error.message)
  }
}