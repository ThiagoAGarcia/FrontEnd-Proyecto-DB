import { useState, useEffect } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { useGroups } from '../../context/useGroup.jsx'
import getGroupDataService from '../../service/getGroupDataService.jsx'
import ModalReservation from '../UserView/components/modalReservation.jsx'
import ModalGroup from '../UserView/components/modalGroup.jsx'
import ModalInfo from '../UserView/components/modalInfo.jsx'

export default function Groups() {
  const [open, setOpen] = useState(false)
  const [deleting, setDeleting] = useState(true)
  const [infoOpen, setInfoOpen] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState('')
  const [selectedGroupData, setSelectedGroupData] = useState(null)
  const [reservaOpen, setReservaOpen] = useState(false)
  const { grupos, refreshGroups } = useGroups()

  useEffect(() => {
    refreshGroups()
  }, [])

  const error = '';

  const hayGrupos = Array.isArray(grupos) && grupos.length > 0

  const selectGroup = (open, groupId) => {
    console.log(groupId)
    setInfoOpen(open)
    setSelectedGroup(groupId)
  }

  useEffect(() => {
    const getGroupData = async () => {
      if (selectedGroup === '') {
        return
      } else {
        const groupData = await getGroupDataService(selectedGroup)
        if (groupData.success) {
          setSelectedGroupData(groupData.grupo)
          console.log(selectedGroup)
        }
      }
    }

    getGroupData();
  }, [selectedGroup, deleting])

  return (
    <>
      <div className="flex justify-between items-end pb-3">
        <h2 className="ml-1 font-semibold text-gray-800 text-2xl">Grupos</h2>
        {hayGrupos && (
          <button
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm hover:bg-[#e9f0fd] transition cursor-pointer"
            onClick={() => setOpen(true)}>
            <span className="font-medium text-[#052e66]">
              <i className="fa-solid fa-plus text-green-600"></i> Crear nuevo
              grupo
            </span>
          </button>
        )}
      </div>

      <div
        className={`w-full bg-white shadow-md rounded-2xl p-2 flex flex-col border border-gray-400 ${!hayGrupos ? 'justify-center items-center h-80' : ''
          }`}>
        {hayGrupos ? (
          <>
            <div className="hidden lg:flex w-full justify-between text-gray-700 font-semibold px-2 pb-1 border-b border-gray-300 text-lg">
              <div className="w-1/2 text-center">Nombre del grupo</div>
              <div className="w-1/4 text-center">Lider</div>
              <div className="w-1/3 text-center">Acciones</div>
            </div>

            <ul className="w-full overflow-auto scrollbar mt-1">
              {grupos.map((grupo, index) => (
                <div
                  key={index}
                  className="w-full rounded-md bg-[#f4f7fc] border border-gray-200 text-black p-3 my-2">
                  <div className="hidden lg:flex justify-between items-center text-xl">
                    <div className="w-1/2 text-center border-r-2 border-gray-300">
                      <h1>{grupo.groupName}</h1>
                    </div>
                    <div className="w-1/4 text-center border-r-2 border-gray-300">
                      <h1>
                        {grupo.leaderName} {grupo.leaderLastName}
                      </h1>
                    </div>
                    <div className="w-1/3 flex justify-center items-center gap-2">
                      <button
                        onClick={() => selectGroup(true, grupo.id)}
                        className="rounded-md px-3 py-1 cursor-pointer bg-[#e3edff] border border-[#bfd4ff] text-[#052e66] hover:bg-[#d5e4ff] transition-colors">
                        Info
                      </button>
                      <button
                        onClick={() => { setReservaOpen(true); setSelectedGroup(grupo.id); }}
                        className="rounded-md px-3 py-1 cursor-pointer bg-[#e6f9f0] border border-[#b8ebd6] text-[#052e66] hover:bg-[#d4f5e8] transition-colors">
                        Hacer reserva{' '}
                        <i className="fa-solid fa-plus text-[#0d9b64]"></i>
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col lg:hidden gap-2">
                    <span className="font-semibold text-gray-800">
                      {grupo.groupName}
                    </span>

                    <span className="text-gray-600">
                      Líder: {grupo.leaderName} {grupo.leaderLastName}
                    </span>

                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => selectGroup(true, grupo.id)}
                        className="flex-1 rounded-xl px-4 py-2 cursor-pointer bg-[#e3edff] border border-[#bfd4ff] text-[#052e66] shadow-md hover:bg-[#d5e4ff] transition">
                        Info
                      </button>

                      <button
                        onClick={() => { setReservaOpen(true); setSelectedGroup(grupo.id); }}
                        className="flex-1 rounded-xl px-4 py-2 cursor-pointer bg-[#e6f9f0] border border-[#b8ebd6] text-[#052e66] shadow-md hover:bg-[#d4f5e8] transition">
                        Hacer reserva{' '}
                        <i className="fa-solid !hidden lg:!inline fa-plus text-[#0d9b64]"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </ul>
          </>
        ) : (
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm hover:bg-[#e9f0fd] transition cursor-pointer" onClick={() => setOpen(true)}>
            <span className="font-medium text-[#052e66]">
              <i className="fa-solid fa-plus text-green-600"></i> Crear nuevo
              grupo
            </span>
          </button>
        )}
      </div>

      <ModalInfo open={infoOpen} onClose={() => setInfoOpen(false)} selectedGroupData={selectedGroupData} setDeleting={setDeleting} deleting={deleting} />

      <ModalReservation open={reservaOpen} selectedGroup={selectedGroup} onClose={() => { setReservaOpen(false) }} />

      <ModalGroup open={open} onClose={() => setOpen(false)} refreshGroups={refreshGroups} />

    </>
  )
}
