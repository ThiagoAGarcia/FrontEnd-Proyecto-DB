const API = 'http://localhost:5000'
const PATH = '/activateUser'

export default async function activateUserByCiService(ci) {
  try {
    const token = (localStorage.getItem('token') || '').replace(/"/g, '')

    const res = await fetch(`${API}${PATH}/${ci}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.description || `PATCH ${PATH} -> ${res.status}`)
    }

    return data
  } catch (error) {
    console.log(error.message)

    throw error
  }
}