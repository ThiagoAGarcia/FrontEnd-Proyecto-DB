const API = 'http://localhost:5000'
const PATH = '/sendGroupRequest'

export default async function sendGroupRequest(studyGroupId, receiver) {
  try {
    const res = await fetch(`${API}${PATH}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${(
          localStorage.getItem('token') || ''
        ).replace(/"/g, '')}`,
      },
      body: JSON.stringify({studyGroupId: studyGroupId, receiver: receiver}),
    })
    if (!res.ok) {
      const errorJson = await res.json().catch(() => ({}))
      throw new Error(errorJson.description || `POST ${PATH} -> ${res.status}`)
    }

    return await res.json()
  } catch (error) {
    console.log(error.message)
  }
}
