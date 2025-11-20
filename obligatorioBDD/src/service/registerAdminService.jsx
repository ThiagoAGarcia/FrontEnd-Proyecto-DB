const API = 'http://localhost:5000'
const PATH = '/registerAdmin'

export default async function registerAdminService(BODY) {
  try {
    const res = await fetch(`${API}${PATH}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${(localStorage.getItem('token') || '').replace(
          /"/g,
          ''
        )}`,
      },
      body: JSON.stringify(BODY),
    })

    const data = await res.json()

    return data
  } catch (error) {
    console.log(error.message)
    return {
      success: false,
      description: 'Error de conexión con el servidor',
      error: String(error),
    }
  }
}
