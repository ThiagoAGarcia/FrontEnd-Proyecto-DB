import Modal from '../components/modal'
import patchUserService from '../service/patchMyUserService'
import {useEffect, useState} from 'react'
import {toast} from 'react-toastify'
import {Oval} from 'react-loader-spinner'

export default function ModalEditProfile({open, onClose, user, onUpdated}) {
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')

  const [changePass, setChangePass] = useState(false)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [errores, setErrores] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (user) {
      setName(user.name || '')
      setLastName(user.lastName || '')
    }
  }, [user])

  const validarFormulario = async () => {
    if (isLoading) return

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

    if (changePass) {
      if (!oldPassword) e.oldPassword = 'Ingrese su contraseña actual'
      if (!newPassword) e.newPassword = 'Ingrese una nueva contraseña'
      else if (newPassword.length < 9) e.newPassword = 'Mínimo 9 caracteres'

      if (!confirmPassword)
        e.confirmPassword = 'Debe confirmar la nueva contraseña'
      else if (newPassword !== confirmPassword)
        e.confirmPassword = 'Las contraseñas no coinciden'
    }

    setErrores(e)
    if (Object.keys(e).length > 0) return

    const body = {
      ci: user.ci,
      name: name.trim(),
      lastName: lastName.trim(),
      oldPassword: changePass ? oldPassword : null,
      newPassword: changePass ? newPassword : null,
      confirmPassword: changePass ? confirmPassword : null,
    }

    try {
      setIsLoading(true)
      const resp = await patchUserService(body)

      if (resp.success) {
        const updatedUser = {
          ...user,
          name: name.trim(),
          lastName: lastName.trim(),
        }

        if (onUpdated) {
          onUpdated(updatedUser)
        }

        toast.success('Perfil actualizado correctamente', {
          position: 'bottom-left',
          autoClose: 2500,
        })

        setTimeout(() => onClose(), 1500)
      } else {
        toast.error(resp.description || 'Error al actualizar', {
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

  return (
    <Modal open={open} onClose={isLoading ? () => {} : onClose}>
      <div className="relative max-h-[90vh] w-full p-4 sm:p-6 pr-8 rounded-xl overflow-y-auto">
        {isLoading && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-20 rounded-xl">
            <Oval height={40} width={40} color="#052e66" />
          </div>
        )}

        <h2 className="font-bold text-[#052e66] text-3xl mb-6">
          Editar perfil
        </h2>

        <div className="w-full bg-white shadow-md rounded-2xl p-5 border border-gray-300">
          <section className="max-h-[60vh] overflow-y-auto scroll-ucu p-2">
            <div className="mb-3">
              <label className="font-medium text-[#052e66]">CI</label>
              <input
                disabled
                value={user?.ci || ''}
                className="bg-gray-100 border rounded-xl p-2 w-full"
              />
            </div>

            <div className="mb-3">
              <label className="font-medium text-[#052e66]">Nombre</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
                className="bg-gray-50 border rounded-xl p-2 w-full"
              />
              {errores.name && (
                <p className="text-red-600 text-xs">{errores.name}</p>
              )}
            </div>

            <div className="mb-3">
              <label className="font-medium text-[#052e66]">Apellido</label>
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                disabled={isLoading}
                className="bg-gray-50 border rounded-xl p-2 w-full"
              />
              {errores.lastName && (
                <p className="text-red-600 text-xs">{errores.lastName}</p>
              )}
            </div>

            <div className="flex items-center gap-3 mt-4 mb-2">
              <label className="font-medium text-[#052e66]">
                ¿Cambiar contraseña?
              </label>

              <button
                type="button"
                onClick={() => setChangePass(!changePass)}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
                  changePass ? 'bg-[#052e66]' : 'bg-gray-400'
                }`}>
                <div
                  className={`bg-white w-5 h-5 rounded-full shadow-md transform transition ${
                    changePass ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {changePass && (
              <div className="space-y-3 mt-3 bg-gray-50 p-4 rounded-xl border">
                <div>
                  <label className="font-medium text-[#052e66]">
                    Contraseña actual
                  </label>
                  <input
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="bg-white border rounded-xl p-2 w-full"
                  />
                  {errores.oldPassword && (
                    <p className="text-red-600 text-xs">
                      {errores.oldPassword}
                    </p>
                  )}
                </div>

                <div>
                  <label className="font-medium text-[#052e66]">
                    Nueva contraseña
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="bg-white border rounded-xl p-2 w-full"
                  />
                  {errores.newPassword && (
                    <p className="text-red-600 text-xs">
                      {errores.newPassword}
                    </p>
                  )}
                </div>

                <div>
                  <label className="font-medium text-[#052e66]">
                    Confirmar nueva contraseña
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-white border rounded-xl p-2 w-full"
                  />
                  {errores.confirmPassword && (
                    <p className="text-red-600 text-xs">
                      {errores.confirmPassword}
                    </p>
                  )}
                </div>
              </div>
            )}
          </section>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-5 justify-end">
          <button
            onClick={validarFormulario}
            disabled={isLoading}
            className="bg-[#052e66] cursor-pointer text-white w-full sm:w-1/3 py-3 rounded-xl shadow-md hover:bg-[#073c88] transition disabled:opacity-60">
            Guardar cambios
          </button>

          <button
            onClick={onClose}
            disabled={isLoading}
            className="border border-[#052e66] cursor-pointer text-[#052e66] w-full sm:w-1/3 py-3 rounded-xl shadow-md hover:bg-[#eef3fb] transition">
            Cancelar
          </button>
        </div>
      </div>
    </Modal>
  )
}
