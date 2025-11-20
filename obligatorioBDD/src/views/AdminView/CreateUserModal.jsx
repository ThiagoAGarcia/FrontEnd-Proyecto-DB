import {useEffect, useState} from 'react'
import Modal from '../../components/modal'
import getCarrersService from '../../service/getCareers'
import getCampusService from '../../service/getCampus'
import getBuildingsService from '../../service/getBuildingsService'
import registerAdminService from '../../service/registerAdminService'
import {toast} from 'react-toastify'
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

const CreateUserModal = ({open, onClose, onCreated}) => {
  const [ci, setCi] = useState('')
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [roles, setRoles] = useState([])
  const [careerId, setCareerId] = useState('')
  const [secondCareer, setSecondCareer] = useState('')
  const [campus, setCampus] = useState('')
  const [buildingName, setBuildingName] = useState('')
  const [careers, setCareers] = useState([])
  const [campusList, setCampusList] = useState([])
  const [buildings, setBuildings] = useState([])
  const [errores, setErrores] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [showSecondCareer, setShowSecondCareer] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const resetForm = () => {
    setCi('')
    setName('')
    setLastName('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setRoles([])
    setCareerId('')
    setSecondCareer('')
    setCampus('')
    setBuildingName('')
    setErrores({})
    setShowSecondCareer(false)
  }

  useEffect(() => {
    if (!open) return
    resetForm()
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

  const toggleRole = (rol) => {
    setRoles((prev) =>
      prev.includes(rol) ? prev.filter((r) => r !== rol) : [...prev, rol]
    )
  }

  const validarFormulario = async () => {
    const e = {}
    const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!ci.trim() || ci.trim().length !== 8 || !/^\d+$/.test(ci.trim()))
      e.ci = 'CI inválida (8 dígitos)'

    if (!name.trim() || !regexNombre.test(name) || name.trim().length < 3)
      e.name = 'Nombre inválido'

    if (
      !lastName.trim() ||
      !regexNombre.test(lastName) ||
      lastName.trim().length < 3
    )
      e.lastName = 'Apellido inválido'

    if (!email.trim() || !regexEmail.test(email.trim()))
      e.email = 'Correo inválido'

    if (!password || password.length <= 8) e.password = 'Mínimo 9 caracteres'

    if (password !== confirmPassword)
      e.confirmPassword = 'Las contraseñas deben coincidir'

    if (roles.length === 0) e.roles = 'Debe seleccionar al menos un rol'

    if (roles.includes('student')) {
      if (!careerId) e.careerId = 'Seleccione la carrera'
      if (!campus) e.campus = 'Seleccione el campus'
    }

    if (roles.includes('professor') && !campus)
      e.campus = 'Seleccione el campus'

    if (roles.includes('librarian') && !buildingName)
      e.buildingName = 'Seleccione un edificio'

    setErrores(e)
    if (Object.keys(e).length > 0) return

    const body = {
      ci: ci.trim(),
      name: name.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      password,
      confirmPassword,
      roles,
      careerId: roles.includes('student') ? careerId : null,
      secondCareer:
        roles.includes('student') && secondCareer ? secondCareer : null,
      campus:
        roles.includes('student') || roles.includes('professor')
          ? campus
          : null,
      buildingName: roles.includes('librarian') ? buildingName : null,
    }

    try {
      setIsLoading(true)
      const resp = await registerAdminService(body)

      if (resp.success) {
        toast.success(resp.description || 'Usuario creado correctamente')
        resetForm()

        if (onCreated) onCreated()
      } else {
        console.log(resp)
        toast.error(resp.description || 'Error al crear usuario')
      }
    } catch (err) {
      toast.error('Error de conexión con el servidor')
    } finally {
      setIsLoading(false)
    }
  }

  if (!open) return null

  return (
    <Modal open={open} onClose={onClose}>
      <div className="relative w-full p-4 sm:p-6 pr-8 rounded-xl">
        {isLoading && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-20 rounded-xl">
            <Oval height={40} width={40} color="#052e66" />
          </div>
        )}

        <h2 className="font-bold text-[#052e66] text-3xl mb-6">
          Crear usuario
        </h2>

        <section className="max-h-[80vh] overflow-y-auto scroll-ucu p-5">
          <div className="mb-3">
            <label className="font-medium">CI</label>
            <input
              value={ci}
              onChange={(e) => setCi(e.target.value)}
              className="bg-gray-50 border rounded-xl p-2 w-full"
            />
            {errores.ci && <p className="text-red-600 text-xs">{errores.ci}</p>}
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

          <div className="mb-3">
            <label className="font-medium">Correo institucional</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-50 border rounded-xl p-2 w-full"
            />
            {errores.email && (
              <p className="text-red-600 text-xs">{errores.email}</p>
            )}
          </div>

          <div className="mb-3">
            <label className="font-medium">Contraseña</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-50 border rounded-xl p-2 w-full pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute inset-y-0 right-2 flex items-center text-gray-500">
                {showPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
              </button>
            </div>
            {errores.password && (
              <p className="text-red-600 text-xs">{errores.password}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="font-medium">Confirmar contraseña</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-gray-50 border rounded-xl p-2 w-full pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((p) => !p)}
                className="absolute inset-y-0 right-2 flex items-center text-gray-500">
                {showConfirmPassword ? (
                  <IoEyeOff size={20} />
                ) : (
                  <IoEye size={20} />
                )}
              </button>
            </div>
            {errores.confirmPassword && (
              <p className="text-red-600 text-xs">{errores.confirmPassword}</p>
            )}
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
                  className="flex items-center gap-2 text-blue-900 mb-2 cursor-pointer mt-2">
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
                        value={secondCareer}
                        onChange={(e) => setSecondCareer(e.target.value)}
                        className="bg-gray-50 border rounded-xl p-2 w-full">
                        <option value="">Seleccione una segunda carrera</option>
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
              Crear usuario
            </button>

            <button
              onClick={() => {
                onClose()
                resetForm()
              }}
              disabled={isLoading}
              className="border border-[#052e66] text-[#052e66] w-full sm:w-1/3 py-3 rounded-xl shadow-md hover:bg-[#eef3fb] transition disabled:opacity-60">
              Cancelar
            </button>
          </div>
        </section>
      </div>
    </Modal>
  )
}

export default CreateUserModal
