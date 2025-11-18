export default async function switchRole(newRole) {
  const res = await fetch('http://localhost:5000/switchRole', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${(localStorage.getItem('token') || '').replace(
        /"/g,
        ''
      )}`,
    },
    body: JSON.stringify({role: newRole}),
  })

  const data = await res.json()

  if (!res.ok || !data.success) {
    throw new Error(data.description || `Error HTTP ${res.status}`)
  }
  console.log(data)
  console.log(data.access_token)
  localStorage.setItem('token', JSON.stringify(data.access_token))
  localStorage.setItem('role', JSON.stringify(data.role))
  localStorage.setItem('roles', JSON.stringify(data.roles || []))

  return data
}
