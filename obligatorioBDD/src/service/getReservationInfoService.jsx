const API_URL = 'http://localhost:5000'

export default async function getGroupReservationInfoService(groupId) {
  try {
    const token = localStorage.getItem('token').replace(/"/g, '')

    const resp = await fetch(`${API_URL}/myGroup/${groupId}/reservation`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
      },
    })

    const data = await resp.json()
    return data
  } catch (e) {
    console.error('Error fetching reservation info', e)
    return {
      success: false,
      description: 'Error de conexión al obtener la reserva',
    }
  }
}
