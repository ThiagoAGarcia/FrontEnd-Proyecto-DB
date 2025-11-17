const API = 'http://localhost:5000'
const PATH = '/myCareer'

export default async function getCareerService() {
  try {
    const res = await fetch(`${API}${PATH}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`.replace(
          /"/g,
          ''
        ),
      },
    })
    if (!res.ok) throw new Error(`GET ${PATH} -> ${res.status}`)
    const career = await res.json()
    return career
  } catch (error) {
    console.log(error.message)
  }
}
