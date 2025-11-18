const API_URL = 'http://localhost:5000'
const PATH = '/createGroup'

export default async function createGroup(BODY) {
  try {
    const res = await fetch(`${API_URL}${PATH}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${(localStorage.getItem('token') || '').replace(
          /"/g,
          ''
        )}`,
      },
      body: JSON.stringify(BODY),
    })

    if (!res.ok) throw new Error(`POST ${PATH} -> ${res.status}`)
    const career = await res.json()
    return career
  } catch (error) {
    console.log(error.message)
  }
}
