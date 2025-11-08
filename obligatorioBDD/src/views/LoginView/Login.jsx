import {IoEye} from 'react-icons/io5'
import {IoEyeOff} from 'react-icons/io5'
import {useState} from 'react'
import LoginService from '../../service/loginService.jsx'
import { useNavigate } from 'react-router-dom';

function Login() {
  const [verPwd, setVerPwd] = useState(false);
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const commitLogin = async () => {
    const usernameInput = document.getElementById('emailInput').value;
    const passwordInput = document.getElementById('passwordInput').value;
    const BODY = {
      "mail": usernameInput,
      "password": passwordInput
    };
    const logged = await LoginService(BODY);
    console.log(logged);

    if (logged.success) {
      setLoginError('');
    } else {
      setLoginError(logged.description);
    }
  }

  return (
    <>
      <div className="w-full h-[100vh] flex flex-col justify-center items-center">
        <img
          src=".\public\ucu.png"
          alt="Logo de la Universidad Católica de Uruguay"
          className="w-50 h-auto"
        />
        <div className="flex flex-col justify-center text-center items-center shadow-xl rounded-2xl w-[70%] lg:w-[30%] h-120 p-12">
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
                className="w-full border-b mb-6 p-2 rounded-sm focus:border-blue-900 focus:border-b"
              />
              <section className="relative w-full text-left">
                <label htmlFor="passwordInput">Contraseña</label>
                <i
                  className="absolute top-9 right-5 cursor-pointer"
                  onClick={() => setVerPwd(!verPwd)}>
                  {verPwd ? <IoEyeOff size={20} /> : <IoEye size={20} />}
                </i>
                <input
                  type={verPwd ? 'text' : 'password'}
                  id="passwordInput"
                  className="w-full border-b mb-6 p-2 rounded-sm focus:border-blue-900 focus:border-b"
                />
              </section>
              <div className="flex mb-2 items-center justify-center w-full">
                <input type="checkbox" id="rememberInput" className="mr-1" />
                <label htmlFor="rememberInput">Recordar usuario</label>
              </div>
              <section className="w-full flex justify-center items-center">
                <button className="w-40 h-auto bg-blue-900 rounded-full p-2 text-white cursor-pointer" onClick={() => commitLogin()}>
                  Iniciar sesión
                </button>
                <p>{loginError}</p>
              </section>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
