const API = 'http://localhost:5000';
const PATH = '/leaveGroup';

export default async function deleteUserByCiService(GROUPID) {
  try {
    const token = (localStorage.getItem('token') || '').replace(/"/g, '')

    const res = await fetch(`${API}${PATH}/${GROUPID}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
         Authorization: `Bearer ${token}`,
      },
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.description || `DELETE ${PATH} -> ${res.status}`)
    }

    return data
  } catch (error) {
    console.log(error.message)

    throw error
  }
}
