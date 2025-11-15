import {IoEye, IoEyeOff} from 'react-icons/io5'
import {useEffect, useState} from 'react'
import LoginService from '../../service/loginService.jsx'
import {useNavigate} from 'react-router-dom'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {Oval} from 'react-loader-spinner'

function Login() {
  const [verPwd, setVerPwd] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('ci')
    localStorage.removeItem('roles')
  }, [])

  const commitLogin = async () => {
    const email = document.getElementById('emailInput').value.trim()
    const password = document.getElementById('passwordInput').value.trim()

    if (!email || !password) {
      toast.error('Debes completar todos los campos', {
        position: 'bottom-left',
        autoClose: 3000,
      })
      return
    }

    const regexEmail = /^[a-zA-Z0-9._%+-]+@(correo\.ucu\.edu\.uy|ucu\.edu\.uy)$/
    if (!regexEmail.test(email)) {
      toast.error(
        'El correo debe pertenecer al dominio @ucu.edu.uy o @correo.ucu.edu.uy',
        {
          position: 'bottom-left',
          autoClose: 3000,
        }
      )
      return
    }

    try {
      setIsLoading(true)

      const BODY = {email, password}
      const logged = await LoginService(BODY)

      if (logged?.success) {
        console.log(logged.role)
        toast.success('Inicio de sesión exitoso', {
          position: 'bottom-left',
          autoClose: 2500,
        })
        localStorage.setItem('token', logged.access_token)
        localStorage.setItem('role', JSON.stringify(logged.role))

        localStorage.setItem('ci', JSON.stringify(logged.ci))
        if (logged.role.includes('administrator')) {
          setTimeout(() => navigate('/admin'), 2500)
          return
        }

        if (logged.role.includes('librarian')) {
          setTimeout(() => navigate('/main-librarian'), 2500)
          return
        }

        if (logged.role.includes('student')) {
          setTimeout(() => navigate('/main'), 2500)
          return
        }
      } else {
        toast.error(logged?.description || 'Correo o contraseña incorrectos', {
          position: 'bottom-left',
          autoClose: 3000,
        })
      }
    } catch (error) {
      console.error(error)
      toast.error('Error de conexión con el servidor', {
        position: 'bottom-left',
        autoClose: 3000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="flex flex-col items-center">
            <Oval
              height={35}
              width={35}
              color="#1d4ed8"
              visible={true}
              ariaLabel="loading-login"
              secondaryColor="#e5e7eb"
              strokeWidth={4}
              strokeWidthSecondary={4}
            />
          </div>
        </div>
      )}

      <div className="w-full h-[100vh] flex flex-col justify-center items-center">
        <img
          src="./public/ucu.png"
          alt="Logo de la Universidad Católica de Uruguay"
          className="w-50 h-auto"
        />
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col justify-center text-center items-center shadow-xl rounded-2xl w-[70%] lg:w-[30%] h-120 p-12 bg-white">
          <h1 className="text-4xl text-blue-900">Inicio de sesión</h1>
          <div className="w-full flex flex-col justify-center items-center mt-10">
            <form
              onSubmit={(e) => e.preventDefault()}
              id="loginForm"
              className="w-full flex flex-col justify-start items-start">
              <label htmlFor="emailInput">Email</label>
              <input
                type="text"
                id="emailInput"
                className="w-full border-b mb-6 p-2 rounded-sm focus:border-blue-900 focus:outline-none bg-[rgb(232,240,254)]"
                placeholder="ejemplo@correo.ucu.edu.uy"
                disabled={isLoading}
              />

              <section className="relative w-full text-left">
                <label htmlFor="passwordInput">Contraseña</label>
                <i
                  className="absolute top-9 right-5 cursor-pointer"
                  onClick={() => !isLoading && setVerPwd(!verPwd)}>
                  {verPwd ? <IoEyeOff size={20} /> : <IoEye size={20} />}
                </i>
                <input
                  type={verPwd ? 'text' : 'password'}
                  id="passwordInput"
                  className="w-full border-b mb-6 p-2 rounded-sm focus:border-blue-900 focus:outline-none bg-[rgb(232,240,254)]"
                  placeholder="contraseña"
                  disabled={isLoading}
                />
              </section>

              <div className="flex mb-2 items-center justify-center w-full">
                <input
                  type="checkbox"
                  id="rememberInput"
                  className="mr-1"
                  disabled={isLoading}
                />
                <label htmlFor="rememberInput">Recordar usuario</label>
              </div>

              <section className="w-full flex justify-center items-center">
                <button
                  type="submit"
                  className="w-40 h-auto bg-blue-900 rounded-full p-2 text-white cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  onClick={commitLogin}
                  disabled={isLoading}>
                  {isLoading ? 'Ingresando...' : 'Iniciar sesión'}
                </button>
              </section>

              <div className="w-full flex justify-center items-center mt-5">
                <span>
                  ¿No tienes un usuario?{' '}
                  <a href="/register" className="border-b hover:border-b-0">
                    Registrarse
                  </a>
                </span>
              </div>
            </form>
          </div>
        </form>
      </div>

      <ToastContainer />
    </>
  )
}

export default Login
