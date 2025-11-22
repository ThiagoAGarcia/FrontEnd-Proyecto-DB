// getRoomShiftToday.jsx
const API = 'http://localhost:5000'
const PATH = '/roomShiftToday'

export default async function getRoomShiftTodayService(
  shiftId = 'null',
  roomId = 'null'
) {
  try {
    const res = await fetch(`${API}${PATH}/${shiftId}&${roomId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${(localStorage.getItem('token') || '').replace(
          /"/g,
          ''
        )}`,
      },
    })
    return await res.json()
  } catch (error) {
    console.log(error.message)
  }
}
