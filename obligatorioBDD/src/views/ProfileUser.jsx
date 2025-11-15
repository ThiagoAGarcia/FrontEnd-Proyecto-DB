import NavBar from '../components/navBar'
import Footer from '../components/footer'
import {useState, useEffect} from 'react'
import getUsersByCiService from '../service/getUsersByCiService'
import getCareerService from '../service/getCareer'
import getReservationsUserService from '../service/getUserReservations'
import Data from './UserView/components/data'
import MisReservas from './UserView/components/misReservas'

const ROLE_LABELS = {
  student: 'Estudiante',
  professor: 'Profesor',
  librarian: 'Bibliotecario',
  administrator: 'Administrador',
  unknown: 'Desconocido',
}

export default function ProfileUser() {
  const [tab, setTab] = useState('acerca')
  const [userData, setUserData] = useState(null)
  const [careerData, setCareerData] = useState([])
  const [reservas, setReservas] = useState(null)

  const [roles, setRoles] = useState([])
  const [currentRole, setCurrentRole] = useState('')

  useEffect(() => {
    const fetchUserData = async () => {
      const ci = (localStorage.getItem('ci') || '').replace(/"/g, '')
      if (!ci) return

      const userRes = await getUsersByCiService(ci)
      if (userRes && userRes.user) {
        setUserData(userRes.user)
      }

      const careerRes = await getCareerService()
      if (careerRes && careerRes.careers) {
        setCareerData(careerRes.careers)
      }

      const reservationData = await getReservationsUserService()
      if (reservationData && reservationData.reservations) {
        setReservas(reservationData.reservations)
      }

      const storedRoleRaw = localStorage.getItem('role')
      const storedRole = storedRoleRaw ? storedRoleRaw.replace(/"/g, '') : ''

      const storedRolesRaw = localStorage.getItem('roles')
      let storedRoles = []

      if (storedRolesRaw) {
        try {
          const parsed = JSON.parse(storedRolesRaw)
          if (Array.isArray(parsed)) {
            storedRoles = parsed
          }
        } catch (e) {
          storedRoles = []
        }
      }

      if (!storedRoles.length && storedRole) {
        storedRoles = [storedRole]
      }

      setRoles(storedRoles)
      setCurrentRole(storedRole || storedRoles[0] || '')
    }

    fetchUserData()
  }, [])

  const user = {
    nombre: userData ? userData.name : 'Cargando...',
    apellido: userData ? userData.lastName : '',
    rol: currentRole || (localStorage.getItem('role') || '').replace(/"/g, ''),
    correo: userData ? userData.mail : '',
    campus: userData ? userData.campus : '',
  }

  const handleRoleChange = (e) => {
    const newRole = e.target.value
    setCurrentRole(newRole)
    localStorage.setItem('role', JSON.stringify(newRole))
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      <NavBar />

      <section className="flex-grow flex flex-col items-center justify-start py-10 sm:p-10">
        <div className="w-full max-w-5xl bg-white shadow-md rounded-xl p-8">
          <div className="flex flex-col md:flex-row items-center justify-between px-1">
            <div className="flex flex-col md:flex-row text-center md:text-left items-center justify-center gap-6">
              <div>
                <h1 className="text-3xl font-bold">
                  {user.nombre} {user.apellido}
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  ({ROLE_LABELS[user.rol] || user.rol || 'Rol no definido'})
                </p>
              </div>
            </div>

            <div className="relative w-48 mt-6 md:flex lg:flex-col md:mt-0">
              <select
                id="roleSelector"
                value={currentRole || ''}
                onChange={handleRoleChange}
                className="appearance-none w-full border-b mb-6 p-2 pr-8 rounded-sm focus:border-blue-900 focus:border-b bg-gray-50">
                <option value="" disabled>
                  Cambiar de Rol
                </option>
                {roles.map((r) => (
                  <option key={r} value={r}>
                    {ROLE_LABELS[r] || r}
                  </option>
                ))}
              </select>
              <span className="absolute top-2 right-5 pointer-events-none text-[#052e66]">
                ▼
              </span>
            </div>
          </div>

          <div className="flex gap-6 mt-6 border-b">
            <button
              onClick={() => setTab('acerca')}
              className={`cursor-pointer pb-2 font-medium ${
                tab === 'acerca'
                  ? 'border-b-2 border-[#052e66] text-[#052e66]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}>
              Acerca de mí
            </button>
            <button
              onClick={() => setTab('reservas')}
              className={`cursor-pointer pb-2 font-medium ${
                tab === 'reservas'
                  ? 'border-b-2 border-[#052e66] text-[#052e66]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}>
              Reservas realizadas
            </button>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mt-6 shadow-sm">
            {tab === 'acerca' && (
              <>
                <h2 className="text-xl font-bold mb-4 text-[#052e66]">
                  Acerca de mí
                </h2>
                <div className="grid grid-cols-1 pl-2 md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold text-[#052e66]">Nombre</p>
                    <p>{user.nombre}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-[#052e66]">Apellido</p>
                    <p>{user.apellido}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-[#052e66]">Email</p>
                    <p className="break-words">{user.correo}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-[#052e66]">Campus</p>
                    <p>{user.campus}</p>
                  </div>
                </div>
                {localStorage.getItem('role').replace(/"/g, '') ===
                  'student' && (
                  <div className="text-gray-700 text-lg overflow-y-auto scrollbar pt-10">
                    <div className="w-full bg-white rounded-2xl p-2 flex flex-col border border-gray-400">
                      <div className="w-full flex justify-between text-gray-700 font-semibold px-2 pb-1 border-b border-gray-300 md:text-lg text-base">
                        <div className="w-1/2 text-center">Carrera</div>
                        <div className="md:w-1/6 w-1/3 text-center">Plan</div>
                        <div className="md:w-1/2 text-center hidden md:inline">
                          Facultad
                        </div>
                        <div className="md:w-1/6 w-1/3 text-center">Tipo</div>
                      </div>

                      {careerData.map((career) => (
                        <ul
                          className="w-full overflow-auto scrollbar mt-1"
                          key={career.careerId}>
                          <li>
                            <div className="w-full rounded-md bg-gray-200 text-black p-2 my-1 flex justify-between items-center md:text-lg text-sm">
                              <div className="w-1/2 text-center border-r-2 border-gray-300">
                                <h1 className="break-words">
                                  {career.careerName}
                                </h1>
                              </div>
                              <div className="md:w-1/6 w-1/3 text-center border-r-2 border-gray-300">
                                <h1>{career.planYear}</h1>
                              </div>
                              <div className="md:w-1/2 text-center border-r-2 hidden md:inline border-gray-300">
                                <h1 className="break-words">
                                  {career.facultyName}
                                </h1>
                              </div>
                              <div className="md:w-1/6 w-1/3 text-center border-gray-300">
                                <h1>{career.type}</h1>
                              </div>
                            </div>
                          </li>
                        </ul>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {tab === 'reservas' && (
              <>
                <h2 className="text-xl font-bold mb-4 text-[#052e66]">
                  Mis reservas
                </h2>
                <div className="flex flex-col gap-3">
                  {reservas &&
                    reservas.map((reserva, idx) => (
                      <div
                        key={idx}
                        className="p-4 bg-white rounded shadow border flex justify-between">
                        <div>
                          <p className="font-semibold text-[#052e66]">
                            {reserva.roomName} - {reserva.buildingName}
                          </p>
                          <p className="text-sm text-gray-600">
                            {reserva.studyGroupName}
                          </p>
                        </div>
                        <div>
                          <p className="font-semibold text-right text-[#052e66]">
                            {reserva.date}
                          </p>
                          <p className="text-sm text-gray-600">
                            {reserva.startTime} - {reserva.endTime}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
