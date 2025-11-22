const API = 'http://localhost:5000'
const PATH = '/updateMyUser'

export default async function patchUserService(BODY) {
  try {
    const res = await fetch(`${API}${PATH}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${(
          localStorage.getItem('token') || ''
        ).replace(/"/g, '')}`,
      },
      body: JSON.stringify(BODY),
    });

    let data = null;
    data = await res.json();
    return data;

  } catch (error) {
    return { success: false, description: "No se pudo conectar con el servidor" };
  }
}
