import {useEffect, useState} from 'react'
import Modal from '../../../components/modal'
import postSanctionService from '../../../service/postSanctionService'
import {toast} from 'react-toastify'

export default function ModalSanction({open, onClose, groupMembers}) {
  const date = new Date()
  let startDay = date.getDate()
  let startMonth = date.getMonth() + 1
  let startYear = date.getFullYear()
  let currentDate = `${startYear}-${startMonth}-${startDay}`

  const [selectedMembers, setSelectedMembers] = useState([])
  const [selectedDescription, setSelectedDescription] = useState(null)
  const [selectedEndDate, setSelectedEndDate] = useState('')
  const [trigger, setTrigger] = useState(false)

  useEffect(() => {
    const getEndDate = () => {
      if (selectedDescription === '') return

      let end = new Date()

      if (selectedDescription === 'Comer') {
        end.setDate(end.getDate() + 15)
      } else if (selectedDescription === 'Ruidoso') {
        end.setMonth(end.getMonth() + 1)
      } else {
        end.setMonth(end.getMonth() + 2)
      }

      const year = end.getFullYear()
      const month = String(end.getMonth() + 1).padStart(2, '0')
      const day = String(end.getDate()).padStart(2, '0')

      const endDate = `${year}-${month}-${day}`
      setSelectedEndDate(endDate)
    }

    getEndDate()
  }, [selectedDescription])

  const handleCheckboxes = (event) => {
    const member = event.target.value
    const checked = event.target.checked

    if (checked) {
      setSelectedMembers((prev) => [...prev, member])
    } else {
      setSelectedMembers((prev) =>
        prev.filter((onMember) => onMember !== member)
      )
    }
  }

  const sendSanctions = async () => {
    const BODY = {
      'members': selectedMembers,
      'librarianCi': localStorage.getItem('ci'),
      'description': selectedDescription,
      'startDate': currentDate,
      'endDate': selectedEndDate,
    }

    try {
      const sanctions = await postSanctionService(BODY)

      if (sanctions.success) {
        toast.success('Sanción enviada', {
          position: 'bottom-left',
          autoClose: 2500,
        })
        onClose()
      } else {
        toast.warning(sanctions.error, {
          position: 'bottom-left',
          autoClose: 2500,
        })
      }
    } catch (error) {
      toast.error(error)
    }
  }

  useEffect(() => {
    setSelectedDescription(0)
    setSelectedMembers([])
    setSelectedEndDate('')
  }, [open])

  return (
    <Modal open={open} onClose={onClose}>
      <div className="relative sm:max-h-[85vh] max-h-[100vh] w-full p-6 rounded-xl scroll-ucu overflow-y-auto">
        <h2 className="text-2xl font-bold text-[#052e66] text-center mb-4">
          Asignar Sanciones
        </h2>

        <p className="text-center text-gray-700 mb-6">
          Seleccione los miembros y el motivo de la sanción.
        </p>

        <div className="w-full bg-gray-100 shadow-xl border text-gray-500 border-gray-200 rounded-2xl p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {groupMembers &&
              groupMembers.map((member) => {
                const isChecked = selectedMembers.includes(String(member.ci))

                return (
                  <label
                    key={member.ci}
                    className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer shadow-md transition-all ${
                      isChecked
                        ? 'bg-gradient-to-t from-blue-100 to-blue-50 text-[#052e66] shadow-[#4379c5] scale-[1.01]'
                        : 'bg-white border border-gray-300 hover:shadow-lg'
                    }`}>
                    <input
                      type="checkbox"
                      id={member.ci}
                      value={member.ci}
                      checked={isChecked}
                      onChange={(e) => handleCheckboxes(e)}
                      className="hidden"
                    />

                    <span className="font-semibold ">
                      {member.name} {member.lastName}
                    </span>
                  </label>
                )
              })}
          </div>
        </div>

        <div className="mt-5 w-full">
          <label className="font-semibold text-blue-900 ml-1">Motivo</label>

          <select
            value={selectedDescription}
            id="description"
            onChange={(e) => setSelectedDescription(e.target.value)}
            className="w-full mt-2 p-3 border border-gray-300 rounded-xl shadow-sm bg-white text-black cursor-pointer hover:shadow-md transition">
            <option value={0} disabled selected>
              Seleccione un motivo
            </option>
            <option value="Comer">Comer</option>
            <option value="Ruidoso">Ruidoso</option>
            <option value="Vandalismo">Vandalismo</option>
            <option value="Imprudencia">Imprudencia</option>
            <option value="Ocupar">Ocupar</option>
          </select>
        </div>

        <div className="flex flex-col sm:flex-row justify-between w-full gap-4 mt-6">
          <div className="w-full sm:w-1/2 flex flex-col items-center bg-gray-100 p-4 rounded-2xl shadow-inner">
            <label className="text-sm font-semibold text-blue-900 mb-1">
              Fecha de inicio
            </label>
            <p className="text-xl text-gray-800 font-bold">{currentDate}</p>
          </div>

          <div className="w-full sm:w-1/2 flex flex-col items-center bg-gray-100 p-4 rounded-2xl shadow-inner">
            <label className="text-sm font-semibold text-blue-900 mb-1">
              Fecha de finalización
            </label>

            {selectedEndDate == '' ? (
              <p className="text-xl text-gray-800 font-bold">-</p>
            ) : (
              <p className="text-xl text-gray-800 font-bold">
                {selectedEndDate}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-5 justify-end">
          <button
            onClick={() => sendSanctions()}
            className="bg-[#052e66] cursor-pointer text-white w-full sm:w-1/2 lg:w-1/3 py-3 rounded-xl shadow-md hover:bg-[#073c88] transition disabled:opacity-60 disabled:cursor-not-allowed">
            Enviar sanciones
          </button>

          <button
            onClick={() => onClose()}
            className="sm:hidden inline border border-[#052e66] cursor-pointer text-[#052e66] w-full sm:w-1/3 py-3 rounded-xl shadow-md hover:bg-[#eef3fb] transition disabled:opacity-60 disabled:cursor-not-allowed">
            Cancelar
          </button>
        </div>
      </div>
    </Modal>
  )
}
