import {useEffect, useState, useRef} from 'react'
import {useNavigate} from 'react-router-dom'
import getUsersByCiService from '../service/getUsersByCiService'
import './navScroll.css'
import getUserGroupRequestService from '../service/getUserGroupRequestService'
import NotificationUser from './Notification'
import {useGroups} from '../context/useGroup'

export default function NavBar() {
  const [menuAbierto, setMenuAbierto] = useState(false)
  const [userData, setUserData] = useState(null)
  const [notification, setNotifications] = useState(false)
  const [userRequest, setUserRequest] = useState([])

  const notificationRef = useRef(null)

  const rawRole = localStorage.getItem('role') || '"unknown"'
  const role = rawRole.replace(/"/g, '')

  const navigate = useNavigate()

  const {refreshGroups} = useGroups()

  const toggleMenu = () => setMenuAbierto(!menuAbierto)

  const cerrarSesion = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('ci')
    localStorage.removeItem('role')
    localStorage.removeItem('roles')
    navigate('/')
  }

  const ROLE_LABELS = {
    student: 'Estudiante',
    professor: 'Profesor',
    librarian: 'Bibliotecario',
    administrator: 'Administrador',
    unknown: 'Desconocido',
  }

  useEffect(() => {
    const fetchUserData = async () => {
      const ci = localStorage.getItem('ci').replace(/"/g, '')
      const userData = await getUsersByCiService(ci)
      setUserData(userData.user)

      const requestData = await getUserGroupRequestService()
      const lista = requestData?.grupoRequest || []

      const ordenado = [...lista].sort((a, b) => {
        return new Date(b.requestDate) - new Date(a.requestDate)
      })

      setUserRequest(ordenado)
    }
    fetchUserData()
  }, [])

  useEffect(() => {
    if (!notification) return

    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotifications(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [notification])

  return (
    <>
      <nav className="relative bg-[#052e66] after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/30 px-5 py-7 sm:flex sm:items-center sm:justify-between">
        <section className="flex justify-between w-full items-center">
          <img src="./public/logo.png" className="h-12" alt="Logo" />

          <div className="px-5 flex items-center gap-6 relative">
            <div className="hidden sm:flex items-center gap-6">
              <div className="text-gray-300 flex flex-col leading-tight text-right">
                <h1>
                  {userData
                    ? userData.name + ' ' + userData.lastName
                    : 'Cargando...'}
                </h1>
                <h1 className="text-gray-400">
                  ({ROLE_LABELS[role] || ROLE_LABELS.unknown})
                </h1>
              </div>

              {(role === 'professor' || role === 'student') && (
                <div className="relative">
                  <button
                    className="text-white text-3xl cursor-pointer relative"
                    onClick={() => setNotifications(!notification)}>
                    {userRequest && userRequest.length > 0 && (
                      <i className="fa-solid fa-circle absolute text-red-500 text-sm -right-1" />
                    )}
                    <i className="fa-solid fa-envelope w-6 h-6 fill-current"></i>
                  </button>

                  {notification && (
                    <div
                      ref={notificationRef}
                      className="absolute  top-full mt-3 z-50 -right-4
                        before:content-[''] before:absolute before:-top-3 before:right-6
                        before:border-l-10 before:border-r-10 before:border-b-[14px]
                        before:border-l-transparent before:border-r-transparent before:border-b-white">
                      <div className="shadow-xl bg-white rounded-sm p-4 max-h-96 w-72 md:w-80 overflow-y-auto ucu-scroll">
                        <h1 className="text-lg md:text-xl lg:text-xl font-semibold mb-2 text-[#052e66]">
                          Notificaciones
                        </h1>
                        <hr className="text-gray-300 mb-3" />

                        {userRequest &&
                          userRequest.map((data) => (
                            <NotificationUser
                              key={data.studyGroupId}
                              id={data.studyGroupId}
                              name={data.studyGroupName}
                              date={data.requestDate}
                              onAccepted={async () => {
                                setUserRequest((prev) =>
                                  prev.filter(
                                    (req) =>
                                      req.studyGroupId !== data.studyGroupId
                                  )
                                )

                                await refreshGroups()
                              }}
                            />
                          ))}

                        {userRequest && userRequest.length === 0 && (
                          <p className="text-sm text-gray-500">
                            No tenés notificaciones pendientes.
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <button
              className="text-white text-3xl cursor-pointer"
              onClick={toggleMenu}>
              <i
                className={`fa-solid ${
                  menuAbierto ? 'fa-xmark' : 'fa-bars'
                } w-6 h-6 fill-current`}></i>
            </button>

            {menuAbierto && (
              <div className="absolute right-0 top-14 bg-white text-[#052e66] rounded-xl shadow-lg w-44 flex flex-col z-50">
                <button
                  className="text-left px-4 py-2 hover:bg-[#e5e9f2] rounded-t-xl transition"
                  onClick={() => {
                    if (role === 'administrator') navigate('/main-admin')
                    if (role === 'librarian') navigate('/main-librarian')
                    if (role === 'professor') navigate('/main')
                    if (role === 'student') navigate('/main')
                  }}>
                  Inicio
                </button>

                <button
                  className="text-left px-4 py-2 hover:bg-[#e5e9f2] transition"
                  onClick={() => navigate('/profile')}>
                  Perfil
                </button>

                <button
                  className="text-left px-4 py-2 hover:bg-[#e5e9f2] rounded-b-xl transition"
                  onClick={cerrarSesion}>
                  Cerrar Sesión
                </button>

                <button className="text-left px-4 py-2 hover:bg-[#e5e9f2] flex items-center gap-2 sm:hidden transition">
                  <i className="fa-solid fa-envelope text-[#052e66] text-lg"></i>
                  Notificaciones
                </button>

                <button className="text-left px-4 py-2 hover:bg-[#e5e9f2] rounded-b-xl flex items-center gap-2 sm:hidden transition">
                  <i className="fa-solid fa-user text-[#052e66] text-lg"></i>
                  Perfil
                </button>
              </div>
            )}
          </div>
        </section>
      </nav>
    </>
  )
}
