const API = 'http://localhost:5000'
const PATH = '/getUserGroupRequest'

export default async function getUserGroupRequestService() {
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
    const groupRequest = await res.json()
    return groupRequest
  } catch (error) {
    console.log(error.message)
  }
}
