// service/createReservation.jsx
const API = 'http://localhost:5000'
const PATH = '/newReservation'

export default async function newReservation(body) {
  try {
    const token = (localStorage.getItem('token') || '').replace(/"/g, '')

    const res = await fetch(`${API}${PATH}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
      },
      body: JSON.stringify(body),
    })

    const data = await res.json()

    return data
  } catch (error) {
    console.error('Error creando la reserva', error)
    return {
      success: false,
      description: 'Error de conexión al crear la reserva',
    }
  }
}
