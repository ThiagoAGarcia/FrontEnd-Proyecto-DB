import {
  IoEye,
  IoEyeOff,
  IoAddCircleOutline,
  IoRemoveCircleOutline,
} from 'react-icons/io5'
import {useEffect, useState} from 'react'
import postRegisterService from '../../service/registerService'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import getCarrersService from '../../service/getCareers'
import getCampusService from '../../service/getCampus'
import {Oval} from 'react-loader-spinner'
import {useNavigate} from 'react-router-dom'

function Register() {
  useEffect(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('ci')
    localStorage.removeItem('roles')
  }, [])

  const [verPwd, setVerPwd] = useState(false)
  const [errores, setErrores] = useState({})
  const [career, setCareer] = useState([])
  const navigate = useNavigate()
  const [campus, setCampus] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [showSecondCareer, setShowSecondCareer] = useState(false)

  useEffect(() => {
    async function getCareer() {
      try {
        const data = await getCarrersService()
        setCareer(data.careers)
      } catch (error) {
        console.error('Error al obtener las carreras:', error)
      }
    }
    getCareer()

    async function getCampus() {
      try {
        const data = await getCampusService()
        setCampus(data.campus)
      } catch (error) {
        console.error('Error al obtener los campus:', error)
      }
    }
    getCampus()
  }, [])

  const validarFormulario = async (e) => {
    e.preventDefault()

    const erroresTemp = {}

    const ci = document.getElementById('CiInput').value.trim()
    const nombre = document.getElementById('NameInput').value.trim()
    const apellido = document.getElementById('LastNameInput').value.trim()
    const email = document.getElementById('emailInput').value.trim()
    const carrera = document.getElementById('carreraInput').value
    const password = document.getElementById('passwordInput').value.trim()
    const campus = document.getElementById('campusInput').value
    const secondCareer = document.getElementById('secondCareerInput')
      ? document.getElementById('secondCareerInput').value
      : ''

    const regexNombre = /^[a-zA-ZÀ-ÿ\s]+$/
    const regexEmail = /^[a-zA-Z0-9._%+-]+@(correo\.ucu\.edu\.uy|ucu\.edu\.uy)$/

    if (!/^\d{8}$/.test(ci)) {
      erroresTemp.ci = 'La cédula debe tener exactamente 8 dígitos numéricos.'
    }

    if (!regexNombre.test(nombre)) {
      erroresTemp.nombre = 'El nombre solo puede contener letras y espacios.'
    }

    if (!regexNombre.test(apellido)) {
      erroresTemp.apellido =
        'El apellido solo puede contener letras y espacios.'
    }

    if (!regexEmail.test(email)) {
      erroresTemp.email =
        'El correo debe pertenecer al dominio @ucu.edu.uy o @correo.ucu.edu.uy.'
    }

    if (!carrera) {
      erroresTemp.carrera = 'Debe seleccionar una carrera.'
    }

    if (!campus) {
      erroresTemp.campus = 'Debe seleccionar un campus.'
    }

    if (password.length < 8) {
      erroresTemp.password = 'La contraseña debe tener al menos 8 caracteres.'
    }

    setErrores(erroresTemp)

    if (Object.keys(erroresTemp).length === 0) {
      const BODY = {
        ci,
        name: nombre,
        lastName: apellido,
        career: carrera,
        email,
        password,
        campus,
        secondCareer: showSecondCareer && secondCareer ? secondCareer : null,
      }

      try {
        setIsLoading(true)

        const register = await postRegisterService(BODY)

        if (register?.success) {
          toast.success('Registro exitoso', {
            position: 'bottom-left',
            autoClose: 3000,
          })
          e.target.reset()
          setTimeout(() => navigate('/admin'), 2500)
          return
        } else {
          toast.error(register?.description || 'Error al registrar', {
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
              ariaLabel="loading-register"
              secondaryColor="#e5e7eb"
              strokeWidth={4}
              strokeWidthSecondary={4}
            />
          </div>
        </div>
      )}

      <div className="flex flex-col justify-center items-center w-full">
        <img
          src="./public/ucu.png"
          alt="Logo de la Universidad Católica de Uruguay"
          className="w-50 h-auto"
        />

        <div className="flex flex-col justify-center items-center shadow-xl rounded-2xl w-[80%] lg:w-[40%] h-auto p-12 bg-white">
          <h1 className="text-4xl text-blue-900 mb-4">Registro</h1>

          <form
            id="loginForm"
            className="w-full flex flex-col justify-start items-start"
            onSubmit={validarFormulario}>
            <label htmlFor="CiInput" className="p-1">
              CI
            </label>
            <input
              type="text"
              id="CiInput"
              disabled={isLoading}
              className="w-full border-b mb-2 p-2 rounded-sm bg-[rgb(232,240,254)]"
              maxLength={8}
              placeholder="Ingrese su cédula sin puntos ni guiones"
            />
            {errores.ci && <p className="text-red-600 text-sm">{errores.ci}</p>}

            <label htmlFor="NameInput" className="p-1">
              Nombre
            </label>
            <input
              type="text"
              id="NameInput"
              disabled={isLoading}
              className="w-full border-b mb-2 p-2 rounded-sm bg-[rgb(232,240,254)]"
              placeholder="nombre"
            />
            {errores.nombre && (
              <p className="text-red-600 text-sm">{errores.nombre}</p>
            )}

            <label htmlFor="LastNameInput" className="p-1">
              Apellido
            </label>
            <input
              type="text"
              id="LastNameInput"
              disabled={isLoading}
              className="w-full border-b mb-2 p-2 rounded-sm bg-[rgb(232,240,254)]"
              placeholder="apellido"
            />
            {errores.apellido && (
              <p className="text-red-600 text-sm">{errores.apellido}</p>
            )}

            <label htmlFor="emailInput" className="p-1">
              Email
            </label>
            <input
              type="text"
              id="emailInput"
              disabled={isLoading}
              className="w-full border-b mb-2 p-2 rounded-sm bg-[rgb(232,240,254)]"
              placeholder="ejemplo@correo.ucu.edu.uy"
            />
            {errores.email && (
              <p className="text-red-600 text-sm">{errores.email}</p>
            )}

            <label htmlFor="carreraInput" className="p-1">
              Carrera
            </label>
            <div className="relative w-full mb-2">
              <select
                id="carreraInput"
                disabled={isLoading}
                className="appearance-none w-full border-b mb-2 p-2 pr-8 rounded-sm bg-[rgb(232,240,254)]">
                <option value="">Seleccione una carrera</option>
                {career.map((data) => (
                  <option key={data.careerId} value={data.careerId}>
                    {data.careerName}
                  </option>
                ))}
              </select>
              <span className="absolute top-2 right-5 pointer-events-none">
                ▼
              </span>
            </div>

            <button
              type="button"
              disabled={isLoading}
              onClick={() => setShowSecondCareer((prev) => !prev)}
              className="flex items-center gap-2 text-blue-900 mb-2">
              {showSecondCareer ? (
                <>
                  <IoRemoveCircleOutline size={20} />
                  <span>Quitar segunda carrera</span>
                </>
              ) : (
                <>
                  <IoAddCircleOutline size={20} />
                  <span>Agregar segunda carrera</span>
                </>
              )}
            </button>

            {showSecondCareer && (
              <>
                <label htmlFor="secondCareerInput" className="p-1">
                  Segunda carrera (opcional)
                </label>
                <div className="relative w-full mb-2">
                  <select
                    id="secondCareerInput"
                    disabled={isLoading}
                    className="appearance-none w-full border-b mb-2 p-2 pr-8 rounded-sm bg-[rgb(232,240,254)]">
                    <option value="">Seleccione una segunda carrera</option>
                    {career.map((data) => (
                      <option key={data.careerId} value={data.careerId}>
                        {data.careerName}
                      </option>
                    ))}
                  </select>
                  <span className="absolute top-2 right-5 pointer-events-none">
                    ▼
                  </span>
                </div>
              </>
            )}

            <label htmlFor="campusInput" className="p-1">
              Campus
            </label>
            <div className="relative w-full mb-2">
              <select
                id="campusInput"
                disabled={isLoading}
                className="appearance-none w-full border-b mb-2 p-2 pr-8 rounded-sm bg-[rgb(232,240,254)]">
                <option value="">Seleccione un campus</option>
                {campus.map((data) => (
                  <option key={data.campusName} value={data.campusName}>
                    {data.campusName}
                  </option>
                ))}
              </select>
              <span className="absolute top-2 right-5 pointer-events-none">
                ▼
              </span>
            </div>

            {errores.carrera && (
              <p className="text-red-600 text-sm">{errores.carrera}</p>
            )}

            <section className="relative w-full text-left mb-2">
              <label htmlFor="passwordInput" className="p-1">
                Contraseña
              </label>
              <i
                className="absolute top-9 right-5 cursor-pointer"
                onClick={() => !isLoading && setVerPwd(!verPwd)}>
                {verPwd ? <IoEyeOff size={20} /> : <IoEye size={20} />}
              </i>
              <input
                type={verPwd ? 'text' : 'password'}
                id="passwordInput"
                disabled={isLoading}
                className="w-full border-b mb-2 p-2 rounded-sm bg-[rgb(232,240,254)]"
                placeholder="contraseña"
              />
              {errores.password && (
                <p className="text-red-600 text-sm">{errores.password}</p>
              )}
            </section>

            <section className="w-full flex justify-center items-center mt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-40 h-auto bg-blue-900 rounded-full p-2 text-white cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed">
                {isLoading ? 'Registrando...' : 'Registrarse'}
              </button>
            </section>

            <div className="w-full flex justify-center items-center mt-5">
              <span>
                ¿Ya tienes un usuario?{' '}
                <a href="/" className="border-b hover:border-b-0">
                  Iniciar sesión
                </a>
              </span>
            </div>
          </form>
        </div>
      </div>

      <ToastContainer />
    </>
  )
}

export default Register
