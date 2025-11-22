const API = 'http://localhost:5000'
const PATH = '/newReservationExpress'

export default async function postReservationExpressService(BODY) {
  try {
    const res = await fetch(`${API}${PATH}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${(
          localStorage.getItem('token') || ''
        ).replace(/"/g, '')}`,
      },
      body: JSON.stringify(BODY),
    })

    const data = await res.json()
    return data
  } catch (error) {
    console.log(error.message)
  }
}
