// service/getAllGroupsService.jsx
const API = 'http://localhost:5000'
const PATH = '/getAllGroups'

export default async function getAllGroupsService(text = '') {
  try {
    const url = `${API}${PATH}?text=${encodeURIComponent(text)}`
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${(localStorage.getItem('token') || '').replace(
          /"/g,
          ''
        )}`,
      },
    })

    const data = await res.json()
    return data
  } catch (error) {
    console.log(error.message)
  }
}
