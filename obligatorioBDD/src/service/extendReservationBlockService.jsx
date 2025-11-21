const API_URL = 'http://localhost:5000'

export default async function extendReservationBlockService(groupId) {
  try {
    const token = localStorage.getItem('token')?.replace(/"/g, '')

    const resp = await fetch(
      `${API_URL}/myGroup/${groupId}/reservation/extend-2h`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify({}),
      }
    )

    const data = await resp.json()
    return data
  } catch (e) {
    console.error('Error extendiendo la reserva', e)
    return {
      success: false,
      description: 'Error de conexión al extender la reserva',
    }
  }
}
