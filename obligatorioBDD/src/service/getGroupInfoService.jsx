const API = 'http://localhost:5000'
const PATH = '/group'

export default async function getGroupInfoService(groupId) {
  try {
    const res = await fetch(`${API}${PATH}/${groupId}/info`, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${localStorage
          .getItem('token')
          .replace(/"/g, '')}`,
      },
    })

    if (!res.ok) throw new Error(`GET ${PATH}/${groupId}/info -> ${res.status}`)
    const data = await res.json()
    return data
  } catch (error) {
    console.log(error.message)
  }
}
