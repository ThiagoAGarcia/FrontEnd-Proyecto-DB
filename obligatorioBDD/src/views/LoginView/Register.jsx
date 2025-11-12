import {IoEye} from 'react-icons/io5'
import {IoEyeOff} from 'react-icons/io5'
import {useState} from 'react'

function Register() {
  const [verPwd, setVerPwd] = useState(false)
  
  return (
    <>
      <div className="flex flex-col justify-center items-center w-full">
        <img
          src=".\public\ucu.png"
          alt="Logo de la Universidad Católica de Uruguay"
          className="w-50 h-auto"
        />
        <div className="flex flex-col justify-center items-center shadow-xl rounded-2xl w-[80%] lg:w-[40%] h-auto p-12">
          <h1 className="text-4xl text-blue-900">Registro</h1>
          <div className="w-full flex flex-col justify-center items-center">
            <form
              id="loginForm"
              className="w-full flex flex-col justify-start items-start">
              <label htmlFor="CiInput" className="p-1">
                ci
              </label>
              <input
                type="text"
                id="CiInput"
                className="w-full border-b mb-6 p-2 rounded-sm focus:border-blue-900 focus:border-b bg-[rgb(232,240,254)]"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={8}
                placeholder="Ingrese su cédula sin puntos ni guiones"
                title="Solo se permiten números"
              />

              <label htmlFor="NameInput" className="p-1">
                Name
              </label>
              <input
                type="text"
                id="NameInput"
                className="w-full border-b mb-6 p-2 rounded-sm focus:border-blue-900 focus:border-b bg-[rgb(232,240,254)]"
                placeholder="nombre"
              />

              <label htmlFor="LastNameInput" className="p-1">
                LastName
              </label>
              <input
                type="text"
                id="LastNameInput"
                className="w-full border-b mb-6 p-2 rounded-sm focus:border-blue-900 focus:border-b bg-[rgb(232,240,254)]"
                placeholder="apellido"
              />

              <label htmlFor="emailInput" className="p-1">
                Email
              </label>
              <input
                type="text"
                id="emailInput"
                className="w-full border-b mb-6 p-2 rounded-sm focus:border-blue-900 focus:border-b bg-[rgb(232,240,254)]"
                placeholder="ejemplo@correo.ucu.edu.uy"
              />

              <label htmlFor="carreraInput" className="p-1">
                Carrera
              </label>
              <div className="relative w-full">
                <select
                  id="carreraInput"
                  className="appearance-none w-full border-b mb-6 p-2 pr-8 rounded-sm focus:border-blue-900 focus:border-b bg-[rgb(232,240,254)]">
                  <option value="">Seleccione una carrera</option>
                  <option value="INGE">Ingeniería Informática</option>
                </select>
                <span className="absolute top-2 right-5 pointer-events-none">
                  ▼
                </span>
              </div>

              <section className="relative w-full text-left">
                <label htmlFor="passwordInput" className="p-1">
                  Contraseña
                </label>
                <i
                  className="absolute top-9 right-5 cursor-pointer"
                  onClick={() => setVerPwd(!verPwd)}>
                  {verPwd ? <IoEyeOff size={20} /> : <IoEye size={20} />}
                </i>
                <input
                  type={verPwd ? 'text' : 'password'}
                  id="passwordInput"
                  className="w-full border-b mb-6 p-2 rounded-sm focus:border-blue-900 focus:border-b bg-[rgb(232,240,254)]"
                  placeholder="contraseña"
                />
              </section>

              <section className="w-full flex justify-center items-center">
                <button className="w-40 h-auto bg-blue-900 rounded-full p-2 text-white cursor-pointer">
                  Registrarse
                </button>
              </section>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register
