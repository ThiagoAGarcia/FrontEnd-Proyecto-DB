const API = 'http://localhost:5000'

export default async function patchAcceptRequestService(id) {
  try {
    const res = await fetch(`${API}/group/${id}/acceptRequest`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${(localStorage.getItem('token') || '').replace(
          /"/g,
          ''
        )}`,
      },
    })

    const data = await res.json()

    return data
  } catch (error) {
    console.error('Error en patchAcceptRequestService:', error)
    return {success: false, description: 'Error de conexión con el servidor'}
  }
}
