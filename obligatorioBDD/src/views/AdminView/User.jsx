import {useEffect, useState} from 'react'
import getUsersService from '../../service/getUsersService'
import deleteUserByCiService from '../../service/deleteUserByCi'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function UserView() {
  const [userSearch, setUserSearch] = useState('')
  const [users, setUsers] = useState([])

  useEffect(() => {
    async function getUsuarios() {
      try {
        const res = await getUsersService()
        setUsers(res.users || [])
      } catch (error) {
        console.error(error)
        toast.error('Error al cargar los usuarios')
      }
    }
    getUsuarios()
  }, [])

  const deleteUser = async (ci) => {
    try {
      const res = await deleteUserByCiService(ci)

      if (res.success) {
        setUsers((prev) => prev.filter((u) => u.ci !== ci))
        toast.success(res.description || 'Usuario eliminado correctamente')
      } else {
        toast.error(res.description || 'No se pudo eliminar el usuario')
      }
    } catch (error) {
      toast.error(error.message || 'Error al eliminar el usuario')
    }
  }

  const filteredUsers = users.filter((u) => {
    const text = `${u.name} ${u.lastName} ${u.ci}`.toLowerCase()
    return text.includes(userSearch.toLowerCase())
  })

  return (
    <div className="text-xl">
      <ToastContainer position="bottom-left" className="z-50" />
      <div className="sm:flex justify-between items-center w-full sm:pb-3">
        <h2 className="ml-1 font-semibold text-gray-800 text-2xl">Usuarios</h2>

        <div className="py-3 sm:py-0 px-1 sm:px-0 sm:p-4 text-gray-300 sm:w-1/2">
          <div className="relative flex"></div>
        </div>
      </div>
      <input
        type="text"
        className="bg-white h-10 flex px-5 w-full rounded-full text-sm focus:outline-none border-2 placeholder-gray-400 border-gray-500 mb-5"
        placeholder="Buscar"
        value={userSearch}
        onChange={(e) => setUserSearch(e.target.value)}
      />
      <div
        className={`w-full bg-white shadow-md rounded-2xl p-2 flex flex-col border border-gray-400 ${
          !users || users.length === 0 ? 'justify-center items-center h-80' : ''
        }`}>
        {!users || users.length === 0 ? (
          <span className="font-medium text-2xl text-gray-600">
            No hay usuarios en el sistema
          </span>
        ) : (
          <>
            <div className="w-full flex justify-between text-gray-700 font-semibold px-2 pb-1 border-b border-gray-300 md:text-lg text-base">
              <div className="w-1/2 text-center">Nombre - Cédula</div>
              <div className="w-1/4 text-center">Tipo</div>
              <div className="w-1/2 text-center">Administrar</div>
            </div>

            <ul className="w-full overflow-auto scrollbar mt-1 p-2">
              {filteredUsers.map((data) => (
                <li
                  key={data.ci}
                  className="bg-gray-200 rounded-xl flex items-center justify-between h-20 mb-2">
                  <div className="w-1/2 text-center">
                    <p className="text-xs md:text-sm lg:text-lg">
                      {data.name} {data.lastName} - {data.ci}
                    </p>
                  </div>

                  <div className="w-1/4 text-center">
                    {data.roles.map((rol) => (
                      <p key={rol} className="text-xs md:text-sm lg:text-lg">
                        {rol}
                      </p>
                    ))}
                  </div>

                  <div className="flex justify-center w-1/2 text-center">
                    <section className="flex gap-5 text-white justify-center items-center">
                      <button className="p-3 flex justify-center items-center bg-yellow-300 rounded-sm cursor-pointer">
                        <i className="fa-solid fa-pen text-sm lg:text-lg"></i>
                      </button>

                      <button
                        onClick={() => deleteUser(data.ci)}
                        className="p-3 flex justify-center items-center bg-red-400 rounded-sm cursor-pointer">
                        <i className="fa-solid fa-trash text-sm lg:text-lg"></i>
                      </button>
                    </section>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  )
}
