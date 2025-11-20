const API = 'http://localhost:5000'
const PATH = '/searchUsersOutsideRequest'

export default async function getSearchUsersOutsideRequest(text, groupId) {
  try {
    const res = await fetch(`${API}${PATH}?text=${text}&groupId=${groupId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage
          .getItem('token')
          .replace(/"/g, '')}`,
      },
    })

    if (!res.ok) throw new Error(`GET ${PATH} -> ${res.status}`)

    const users = await res.json()
    return users
  } catch (error) {
    console.log(error.message)
  }
}
