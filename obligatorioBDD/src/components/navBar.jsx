import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import getUsersByCiService from '../service/getUsersByCiService'

export default function NavBar() {
  const [menuAbierto, setMenuAbierto] = useState(false)
  const [userData, setUserData] = useState(null)
  const role = localStorage.getItem('role')
  const toggleMenu = () => setMenuAbierto(!menuAbierto)
  const navigate = useNavigate()
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
    }
    fetchUserData()
  }, [])

  return (
    <>
      <nav className="relative bg-[#052e66] after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/30 px-5 py-7 sm:flex sm:items-center sm:justify-between">
        <section className="flex justify-between w-full items-center">
          <img src="./public/logo.png" className="h-12" alt="Logo" />
          <div className="px-5 flex items-center gap-6 relative">
            <div className="hidden sm:flex items-center gap-6">
              <div className="text-gray-300 flex flex-col leading-tight text-right">
                <h1 className="">
                  {userData
                    ? userData.name + ' ' + userData.lastName
                    : 'Cargando...'}
                </h1>{' '}
                <h1 className="text-gray-400">
                  ( {ROLE_LABELS[role.replace(/"/g, '')]} )
                </h1>{' '}
              </div>

              <button className="text-white text-3xl cursor-pointer">
                <i className="fa-solid fa-envelope w-6 h-6 fill-current"></i>
              </button>
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
                  className="text-left px-4 py-2 hover:bg-[#e5e9f2] rounded-t-xl cursor-pointer transition-colors duration-300"
                  onClick={() => {
                    if (role.replace(/"/g, '') == 'administrator') {
                      navigate('/main-administrator')
                      return
                    }
                    if (role.replace(/"/g, '') == 'librarian') {
                      navigate('/main-librarian')
                      return
                    }
                    if (role.replace(/"/g, '') == 'professor') {
                      navigate('/main-professor')
                      return
                    }
                    if (role.replace(/"/g, '') == 'student') {
                      navigate('/main')
                      return
                    }
                  }}>
                  Inicio
                </button>
                <button
                  className="text-left px-4 py-2 hover:bg-[#e5e9f2] sm:rounded-b-xl cursor-pointer transition-colors duration-300"
                  onClick={() => navigate('/profile')}>
                  {' '}
                  Perfil{' '}
                </button>
                <button
                  className="text-left px-4 py-2 hover:bg-[#e5e9f2] sm:rounded-b-xl cursor-pointer transition-colors duration-300"
                  onClick={() => cerrarSesion()}>
                  {' '}
                  Cerrar Sesión{' '}
                </button>

                <button className="text-left px-4 py-2 hover:bg-[#e5e9f2] flex items-center gap-2 sm:hidden cursor-pointer transition-colors duration-300">
                  <i className="fa-solid fa-envelope text-[#052e66] text-lg"></i>
                  Notificaciones
                </button>
                <button className="text-left px-4 py-2 hover:bg-[#e5e9f2] rounded-b-xl flex items-center gap-2 sm:hidden transition-colors duration-300">
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
