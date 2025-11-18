// src/components/ModalUpdate.jsx
import {useEffect, useState} from 'react'
import Modal from '../../components/modal'
import getCarrersService from '../../service/getCareers'
import getCampusService from '../../service/getCampus'
import getBuildingsService from '../../service/getBuildingsService'
import patchUserService from '../../service/patchUserService'
import {ToastContainer, toast} from 'react-toastify'
import {Oval} from 'react-loader-spinner'
import 'react-toastify/dist/ReactToastify.css'
import './Scroll.css'
import {
  IoEye,
  IoEyeOff,
  IoAddCircleOutline,
  IoRemoveCircleOutline,
} from 'react-icons/io5'

const ROLES_POSIBLES = ['student', 'professor', 'librarian', 'administrator']

const ModalUpdate = ({open, onClose, user, onUpdated}) => {
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [roles, setRoles] = useState([])
  const [careerId, setCareerId] = useState('')
  const [campus, setCampus] = useState('')
  const [buildingName, setBuildingName] = useState('')
  const [careers, setCareers] = useState([])
  const [campusList, setCampusList] = useState([])
  const [buildings, setBuildings] = useState([])
  const [errores, setErrores] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [showSecondCareer, setShowSecondCareer] = useState(false)

  useEffect(() => {
    if (!open) return
    async function fetchData() {
      const c = await getCarrersService()
      setCareers(c.careers || [])
      const cp = await getCampusService()
      setCampusList(cp.campus || [])
      const b = await getBuildingsService()
      setBuildings(b.buildings || [])
    }
    fetchData()
  }, [open])

  useEffect(() => {
    if (user && open) {
      setName(user.name || '')
      setLastName(user.lastName || '')
      setRoles(user.roles || [])

      if (user.roles.includes('student')) {
        setCareerId(user.careerId || '')
        setCampus(user.campus || '')
      }

      if (user.roles.includes('professor')) {
        setCampus(user.campus || '')
      }

      if (user.roles.includes('librarian')) {
        setBuildingName(user.buildingName || '')
      }

      setErrores({})
    }
  }, [user, open])

  const toggleRole = (rol) => {
    setRoles((prev) =>
      prev.includes(rol) ? prev.filter((r) => r !== rol) : [...prev, rol]
    )
  }

  const validarFormulario = async () => {
    const e = {}
    const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/

    if (!name.trim() || !regexNombre.test(name) || name.trim().length < 3)
      e.name = 'Nombre inválido'

    if (
      !lastName.trim() ||
      !regexNombre.test(lastName) ||
      lastName.trim().length < 3
    )
      e.lastName = 'Apellido inválido'

    if (roles.length === 0) e.roles = 'Debe seleccionar un rol'

    if (roles.includes('student')) {
      if (!careerId) e.careerId = 'Seleccione la carrera'
      if (!campus) e.campus = 'Seleccione el campus'
    }

    if (roles.includes('professor')) {
      if (!campus) e.campus = 'Seleccione el campus'
    }

    if (roles.includes('librarian')) {
      if (!buildingName) e.buildingName = 'Seleccione un edificio'
    }

    setErrores(e)
    if (Object.keys(e).length > 0) return

    const body = {
      ci: user.ci,
      roles,
      name: name.trim(),
      lastName: lastName.trim(),
      careerId: roles.includes('student') ? careerId : null,
      campus:
        roles.includes('student') || roles.includes('professor')
          ? campus
          : null,
      buildingName: roles.includes('librarian') ? buildingName : null,
    }

    try {
      setIsLoading(true)
      const resp = await patchUserService(body)
      if (resp.success) {
        toast.success('Usuario actualizado correctamente')
        if (onUpdated) onUpdated()
        setTimeout(() => onClose(), 1500)
      } else {
        toast.error(resp.description || 'Error al actualizar')
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) return null

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <div className="relative w-full p-4 sm:p-6 pr-8 rounded-xl">
          {isLoading && (
            <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-20 rounded-xl">
              <Oval height={40} width={40} color="#052e66" />
            </div>
          )}

          <h2 className="font-bold text-[#052e66] text-3xl mb-6">
            Actualizar usuario
          </h2>
          <section className="max-h-[80vh] overflow-y-auto scroll-ucu p-5">
            <div className="mb-3">
              <label className="font-medium">CI</label>
              <input
                disabled
                value={user.ci}
                className="bg-gray-100 border rounded-xl p-2 w-full"
              />
            </div>

            <div className="mb-4">
              <label className="font-medium text-[#052e66] text-lg mb-2 block">
                Roles del usuario
              </label>

              <div className="grid grid-cols-2 gap-3 bg-gray-50 p-4 rounded-xl border">
                {ROLES_POSIBLES.map((rol) => {
                  const checked = roles.includes(rol)
                  return (
                    <div
                      key={rol}
                      onClick={() => toggleRole(rol)}
                      className="flex items-center gap-3 cursor-pointer select-none">
                      <div
                        className={`w-6 h-6 flex items-center justify-center rounded-md border-2 transition-all duration-200 ${
                          checked
                            ? 'bg-[#052e66] border-[#052e66]'
                            : 'border-gray-400 bg-white'
                        }`}>
                        {checked && (
                          <svg
                            className="w-4 h-4 text-white pointer-events-none"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}>
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>

                      <span className="capitalize text-gray-700 text-sm">
                        {rol}
                      </span>

                      <input
                        type="checkbox"
                        checked={checked}
                        readOnly
                        className="hidden"
                      />
                    </div>
                  )
                })}
              </div>

              {errores.roles && (
                <p className="text-red-600 text-xs mt-1">{errores.roles}</p>
              )}
            </div>

            <div className="mb-3">
              <label className="font-medium">Nombre</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-gray-50 border rounded-xl p-2 w-full"
              />
              {errores.name && (
                <p className="text-red-600 text-xs">{errores.name}</p>
              )}
            </div>

            <div className="mb-3">
              <label className="font-medium">Apellido</label>
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="bg-gray-50 border rounded-xl p-2 w-full"
              />
              {errores.lastName && (
                <p className="text-red-600 text-xs">{errores.lastName}</p>
              )}
            </div>

            {roles.includes('student') && (
              <>
                <div className="mb-3">
                  <label className="font-medium">Carrera</label>
                  <select
                    value={careerId}
                    onChange={(e) => setCareerId(e.target.value)}
                    className="bg-gray-50 border rounded-xl p-2 w-full">
                    <option value="">Seleccione una carrera</option>
                    {careers.map((c) => (
                      <option key={c.careerId} value={c.careerId}>
                        {c.careerName}
                      </option>
                    ))}
                  </select>
                  {errores.careerId && (
                    <p className="text-red-600 text-xs">{errores.careerId}</p>
                  )}
                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={() => setShowSecondCareer((prev) => !prev)}
                    className="flex items-center gap-2 text-blue-900 mb-2 cursor-pointer">
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
                      <label
                        htmlFor="secondCareerInput"
                        className="p-2 font-medium">
                        Segunda carrera (opcional)
                      </label>
                      <div className="relative w-full mb-2">
                        <select
                          id="secondCareerInput"
                          disabled={isLoading}
                          className="bg-gray-50 border rounded-xl p-2 w-full">
                          <option value="">
                            Seleccione una segunda carrera
                          </option>
                          {careers.map((c) => (
                            <option key={c.careerId} value={c.careerId}>
                              {c.careerName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </>
                  )}
                </div>

                <div className="mb-3">
                  <label className="font-medium">Campus</label>
                  <select
                    value={campus}
                    onChange={(e) => setCampus(e.target.value)}
                    className="bg-gray-50 border rounded-xl p-2 w-full">
                    <option value="">Seleccione un campus</option>
                    {campusList.map((c) => (
                      <option key={c.campusName} value={c.campusName}>
                        {c.campusName}
                      </option>
                    ))}
                  </select>
                  {errores.campus && (
                    <p className="text-red-600 text-xs">{errores.campus}</p>
                  )}
                </div>
              </>
            )}

            {roles.includes('professor') && (
              <div className="mb-3">
                <label className="font-medium">Campus</label>
                <select
                  value={campus}
                  onChange={(e) => setCampus(e.target.value)}
                  className="bg-gray-50 border rounded-xl p-2 w-full">
                  <option value="">Seleccione un campus</option>
                  {campusList.map((c) => (
                    <option key={c.campusName} value={c.campusName}>
                      {c.campusName}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {roles.includes('librarian') && (
              <div className="mb-3">
                <label className="font-medium">Edificio</label>
                <select
                  value={buildingName}
                  onChange={(e) => setBuildingName(e.target.value)}
                  className="bg-gray-50 border rounded-xl p-2 w-full">
                  <option value="">Seleccione un edificio</option>
                  {buildings.map((b) => (
                    <option key={b.buildingName} value={b.buildingName}>
                      {b.buildingName} — {b.campus}
                    </option>
                  ))}
                </select>
                {errores.buildingName && (
                  <p className="text-red-600 text-xs">{errores.buildingName}</p>
                )}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 mt-5 justify-end">
              <button
                onClick={validarFormulario}
                disabled={isLoading}
                className="bg-[#052e66] text-white w-full sm:w-1/3 py-3 rounded-xl shadow-md hover:bg-[#073c88] transition disabled:opacity-60">
                Guardar cambios
              </button>

              <button
                onClick={onClose}
                disabled={isLoading}
                className="border border-[#052e66] text-[#052e66] w-full sm:w-1/3 py-3 rounded-xl shadow-md hover:bg-[#eef3fb] transition disabled:opacity-60">
                Cancelar
              </button>
            </div>
          </section>
        </div>
      </Modal>
    </>
  )
}

export default ModalUpdate
