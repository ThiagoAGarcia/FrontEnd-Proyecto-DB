import {useState, useEffect} from 'react'
import Modal from '../../../components/modal'
import {ToastContainer, toast} from 'react-toastify'
import SearchUsers from '../../../service/getSearchUsersRequest.jsx'
import CreateGroup from '../../../service/createGroupService.jsx'
import sendGroupRequest from '../../../service/sendGroupRequest.jsx'
import {Oval} from 'react-loader-spinner'

export default function modalGroup({open, onClose, refreshGroups}) {
  const [usuarios, setUsuarios] = useState([])
  const [groupName, setGroupName] = useState('')
  const [agregados, setAgregados] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  async function handleSearch(text) {
    if (isLoading) return
    const data = await SearchUsers(text)
    if (data?.success) {
      setUsuarios(data.users)
    }
  }

  async function handleCreateGroup() {
    if (isLoading) return

    if (!groupName.trim()) {
      toast.error('El nombre del grupo es obligatorio', {
        position: 'bottom-left',
        autoClose: 3000,
      })
      return
    }

    try {
      setIsLoading(true)

      const BODY = {
        studyGroupName: groupName,
      }
      const data = await CreateGroup(BODY)

      if (!data?.grupo || !data.grupo.id) {
        toast.error(data?.description || 'Error creando el grupo', {
          position: 'bottom-left',
          autoClose: 3000,
        })
        return
      }

      if (data.success) {
        const studyGroupId = data.grupo.id
        const seleccionados = Object.entries(agregados)
          .filter(([_, marcado]) => marcado)
          .map(([ci]) => usuarios.find((user) => user.ci === parseInt(ci)))

        for (const user of seleccionados) {
          const resp = await sendGroupRequest(studyGroupId, user.ci)

          if (!resp?.success) {
            toast.warn(resp.description, {
              position: 'bottom-left',
              autoClose: 3000,
            })
          }
        }

        toast.success('Grupo creado y solicitudes enviadas', {
          position: 'bottom-left',
          autoClose: 2500,
        })

        onClose()
        setGroupName('')
        setAgregados({})

        await refreshGroups()
      } else {
        toast.error(data?.description || 'Error creando el grupo', {
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

  useEffect(() => {
    if (open) {
      handleSearch('')
    } else {
      setGroupName('')
      setAgregados({})
      setUsuarios([])
      setIsLoading(false)
    }
  }, [open])

  return (
    <Modal open={open} onClose={isLoading ? () => {} : onClose}>
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[1px] rounded-2xl">
          <Oval
            height={35}
            width={35}
            color="#052e66"
            secondaryColor="#e5e7eb"
            strokeWidth={4}
            strokeWidthSecondary={4}
            ariaLabel="loading-create-group"
          />
        </div>
      )}

      <div className="text-left w-full p-4 sm:p-6 relative">
        <h2 className="font-bold text-[#052e66] text-3xl mb-6">Crear grupo </h2>

        <div className="flex flex-col gap-2 mb-8">
          <label className="font-medium text-gray-700">Nombre del grupo</label>
          <input
            type="text"
            value={groupName}
            onChange={(e) => !isLoading && setGroupName(e.target.value)}
            disabled={isLoading}
            className="bg-gray-50 h-12 px-4 rounded-xl text-sm focus:outline-none border border-gray-300 focus:ring-2 focus:ring-[#052e66]/30 transition disabled:opacity-60 disabled:cursor-not-allowed"
            placeholder="Grupo..."
          />
        </div>

        <div className="flex sm:justify-between flex-col gap-2 sm:flex-row sm:items-center">
          <label className="font-medium text-gray-700 sm:self-end">
            Enviar solicitudes
          </label>
          <input
            type="text"
            onChange={(e) => handleSearch(e.target.value)}
            disabled={isLoading}
            className="bg-gray-50 sm:h-8 h-12 px-5 sm:w-1/2 rounded-xl text-sm focus:outline-none border border-gray-300 focus:ring-2 focus:ring-[#052e66]/30 transition disabled:opacity-60 disabled:cursor-not-allowed"
            placeholder="Buscar usuarios"
          />
        </div>

        <div className="w-full scrollbar bg-white rounded-2xl p-4 mt-2 shadow-inner border border-gray-200 max-h-72 overflow-y-auto space-y-3">
          <div className="hidden md:flex w-full text-gray-600 font-medium px-2 pb-2 border-b border-gray-300">
            <div className="basis-1/4 lg:basis-1/5 text-left">Nombre</div>
            <div className="basis-1/4 lg:basis-1/5 text-left">Apellido</div>
            <div className="basis-1/3 lg:basis-2/5 text-left">Correo</div>
            <div className="basis-1/5 text-left">Solicitud</div>
          </div>

          {usuarios.map((user) => (
            <div
              key={user.ci}
              className="bg-[#f4f7fc] rounded-xl p-4 border border-gray-200 hover:border-[#052e66]/40 hover:bg-[#eef3fb] transition shadow-sm flex flex-col md:flex-row md:items-center gap-3">
              <div className="md:hidden flex flex-col">
                <span className="font-semibold text-gray-800">
                  {user.name} {user.lastName}
                </span>
                <span className="text-sm text-gray-600 break-all">
                  {user.mail}
                </span>

                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() =>
                    !isLoading &&
                    setAgregados((prev) => ({
                      ...prev,
                      [user.ci]: !prev[user.ci],
                    }))
                  }
                  className={`px-4 cursor-pointer border border-[#052e66] py-2 mt-3 rounded-xl transition-all duration-300 text-sm shadow-md flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed ${
                    agregados[user.ci]
                      ? 'bg-white text-[#052e66]'
                      : 'bg-[#052e66] text-white hover:bg-[#073c88]'
                  }`}>
                  <i
                    className={`fa-solid ${
                      agregados[user.ci]
                        ? 'fa-xmark text-[#052e66]'
                        : 'fa-envelope text-white'
                    } transition-all duration-300`}></i>
                  {agregados[user.ci] ? 'Cancelar' : 'Enviar'}
                </button>
              </div>

              <div className="hidden md:flex w-full items-center text-gray-700">
                <div className="basis-1/4 lg:basis-1/5">{user.name}</div>
                <div className="basis-1/4 lg:basis-1/5">{user.lastName}</div>
                <div className="basis-1/3 lg:basis-2/5 break-all pr-2">
                  {user.mail}
                </div>

                <div className="basis-1/5 flex justify-start">
                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={() =>
                      !isLoading &&
                      setAgregados((prev) => ({
                        ...prev,
                        [user.ci]: !prev[user.ci],
                      }))
                    }
                    className={`px-4 cursor-pointer border border-[#052e66] py-2 rounded-xl transition-all duration-300 text-sm shadow-md flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed ${
                      agregados[user.ci]
                        ? 'bg-white text-[#052e66]'
                        : 'bg-[#052e66] text-white hover:bg-[#073c88]'
                    }`}>
                    <i
                      className={`fa-solid ${
                        agregados[user.ci]
                          ? 'fa-xmark text-[#052e66]'
                          : 'fa-envelope text-white'
                      } transition-all duration-300`}></i>
                    {agregados[user.ci] ? 'Cancelar' : 'Enviar'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col mt-3 sm:flex-row sm:justify-end">
          <button
            className="sm:w-1/4 w-full sm:mt-0 sm:mx-5 py-3 cursor-pointer text-white bg-[#052e66] rounded-xl font-semibold shadow-md hover:bg-[#073c88] transition disabled:opacity-60 disabled:cursor-not-allowed"
            onClick={handleCreateGroup}
            disabled={isLoading}>
            {isLoading ? 'Creando...' : 'Crear grupo'}
          </button>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="sm:w-1/2 sm:hidden mt-3 sm:mt-0 inline w-full sm:mx-5 py-3 cursor-pointer text-white bg-[#052e66] rounded-xl font-semibold shadow-md hover:bg-[#073c88] transition disabled:opacity-60 disabled:cursor-not-allowed">
            Cancelar
          </button>
        </div>
      </div>
    </Modal>
  )
}
