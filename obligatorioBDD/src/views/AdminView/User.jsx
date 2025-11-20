import { useEffect, useState } from 'react'
import getUsersService from '../../service/getUsersService'
import deleteUserByCiService from '../../service/deleteUserByCi'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ModalUpdate from './modalUpdate'
import CreateUserModal from './CreateUserModal'

export default function UserView() {
  const [userSearch, setUserSearch] = useState('')
  const [open, setOpen] = useState(false)
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [crearUserModal, setCrearUserModal] = useState(false)

  const getUsuarios = async () => {
    try {
      const res = await getUsersService()
      setUsers(res.users || [])
    } catch (error) {
      console.error(error)
      toast.error('Error al cargar los usuarios')
    }
  }

  useEffect(() => {
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
    <>
      <div className="text-xl">
        <div className="sm:flex justify-between items-center w-full sm:pb-3">
          <h2 className="ml-1 font-semibold text-gray-800 text-2xl">Usuarios</h2>

          <div className="py-3 sm:py-0 px-1 sm:px-0 sm:p-4 text-gray-300 sm:w-1/2">
            <div className="relative flex"></div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-3 pb-3">
          <input type="text" className="bg-white text-gray-800 h-10 px-5 sm:w-1/2 w-full rounded-full text-sm focus:outline-none border-2 placeholder-gray-400 border-gray-500" placeholder="Buscar" value={userSearch} onChange={(e) => setUserSearch(e.target.value)} />

          <button
            onClick={() => setCrearUserModal(true)}
            className="bg-[#052e66] text-white w-full lg:w-1/5 sm:w-1/3 rounded-xl shadow-md hover:bg-[#073c88] transition disabled:opacity-60 flex items-center justify-center h-10 px-4 border cursor-pointer">
            Crear usuario
          </button>
        </div>


        <div className={`w-full bg-white shadow-md rounded-2xl p-2 flex flex-col border border-gray-400 ${!users || users.length === 0 ? 'justify-center items-center h-80' : ''}`}>
          {!users || users.length === 0 ? (
            <span className="font-medium text-2xl text-gray-600">
              No hay usuarios en el sistema
            </span>
          ) : (
            <>
              <div className="hidden lg:flex w-full px-4 text-left justify-between text-gray-700 font-semibold pb-1 border-b border-gray-300 md:text-lg text-base">
                <div className="w-1/4 text-center">Cédula</div>
                <div className="w-1/3 text-center">Nombre completo</div>
                <div className="w-1/4 text-center">Roles</div>
                <div className="w-1/4 text-center">Administrar</div>
              </div>

              <ul className="w-full overflow-auto scrollbar mt-1 p-2">
                {filteredUsers.map((data) => (
                  <li key={data.ci} className="bg-[#f4f7fc] border border-gray-200 hover:bg-[#e9eef7] transition-all duration-300 rounded-md flex lg:flex-row flex-col lg:items-center justify-between lg:h-20 mb-3 p-3 gap-3" >
                    <div className="lg:w-1/4 w-full lg:border-r-2 border-gray-300 order-2 lg:order-none">
                      <p className="text-base lg:text-xl text-gray-600 lg:text-gray-800 font-semibold text-left lg:text-center">
                        {data.ci}
                      </p>
                    </div>

                    <div className="lg:w-1/3 w-full lg:border-r-2 border-gray-300 order-1 lg:order-none">
                      <p className="text-lg text-gray-800 font-semibold break-all text-left lg:text-center">
                        {data.name} {data.lastName}
                      </p>
                    </div>


                    <div className="lg:w-1/4 w-full lg:border-r-2 border-gray-300 order-3">
                      <div className="flex flex-wrap justify-start lg:justify-center gap-2">
                        {data.roles.map((rol, i) => (
                          <span key={i} className="px-2 py-1 bg-blue-100 text-[#052e66] rounded-md text-sm whitespace-nowrap" >
                            {rol}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-start lg:justify-center items-stretch gap-3 order-4 lg:w-1/4 w-full text-center">
                      <button className="w-full px-4 cursor-pointer border border-[#052e66] py-2 rounded-xl transition-all duration-300 text-sm shadow-md flex items-center justify-center gap-2 bg-[#052e66] text-white hover:bg-[#073c88]" onClick={() => {
                        setSelectedUser(data)
                        setOpen(true)
                      }}>
                        <i className="fa-solid fa-pen text-white"></i>
                        <span className="sm:hidden">Modificar</span>
                      </button>

                      <button onClick={() => deleteUser(data.ci)} className="w-full px-4 cursor-pointer border border-[#052e66] py-2 rounded-xl transition-all duration-300 text-sm shadow-md flex items-center justify-center gap-2 bg-white text-[#052e66] hover:bg-[#f4f7fc]">
                        <i className="fa-solid fa-trash text-[#052e66]"></i>
                        <span className="sm:hidden">Eliminar</span>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>

      <ModalUpdate open={open}
        onClose={() => {
          setOpen(false)
          //setSelectedUser(null) Consideraria sacarlo
        }}
        user={selectedUser}
        onUpdated={getUsuarios}
      />

      <CreateUserModal
        open={crearUserModal}
        onClose={() => {
          setCrearUserModal(false)
        }}
      />
    </>

  )
}
