const API_URL = 'http://localhost:5000'
const PATH = '/cancelReservation'

export default async function cancelReservationService(
  studyGroupId,
  studyRoomId,
  date,
  shiftId
) {
  try {
    const token = localStorage.getItem('token')?.replace(/"/g, '')

    const resp = await fetch(
      `${API_URL}${PATH}/${studyGroupId}&${studyRoomId}&${date}&${shiftId}`,
      {
        method: 'DELETE',
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
    console.error('Error al cancelar la reserva', e)
    return {
      success: false,
      description: 'Error de conexión al cancelar la reserva',
    }
  }
}
