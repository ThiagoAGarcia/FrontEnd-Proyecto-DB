import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";

function Login() {

    return (
        <>
            <div className="flex flex-col justify-center items-center">
                <img src='.\public\ucu.png' alt='Logo de la Universidad Católica de Uruguay' className='w-50 h-auto'/>
                <div className='flex flex-col justify-center items-center shadow-xl rounded-2xl p-2 w-120 h-120'>
                    <h1 className='text-4xl text-blue-900'>Inicio de sesión</h1>
                    <div className='w-full flex flex-col justify-center items-center'>
                        <form id="loginForm" className='w-full flex flex-col justify-start items-start p-12'>
                            <label htmlFor='emailInput'>Email</label>
                            <input type='text' id='emailInput' className='w-full border-b mb-6 focus:border-blue-900 focus:border-b'/>

                            <label htmlFor='passwordInput'>Contraseña</label>
                            <input type='password' id='passwordInput' className='w-full border-b mb-6 focus:border-blue-900 focus:border-b'/>
                        </form>
                        <form className='flex m-2'>
                            <input type='checkbox' id='rememberInput' className='mr-1'/>
                            <label htmlFor='rememberInput'>Recordar usuario</label>
                        </form>
                        <button className='w-40 h-auto bg-blue-900 rounded-2xl p-1 text-white cursor-pointer'>Iniciar sesión</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login