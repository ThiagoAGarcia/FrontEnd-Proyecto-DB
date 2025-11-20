import { useState, useEffect } from 'react';
import Modal from '../../../components/modal';
import { toast } from 'react-toastify'
import deleteGroupMemberService from '../../../service/deleteGroupMemberService.jsx';
import deleteGroupByIdService from '../../../service/deleteGroupByIdService.jsx';
import getGroupDataService from '../../../service/getGroupDataService.jsx';
import deleteLeaveGroupService from '../../../service/deleteLeaveGroupService.jsx';
import sendGroupRequest from '../../../service/sendGroupRequest.jsx'
import getSearchUsersRequest from '../../../service/getSearchUsersRequest.jsx';

export default function SelectedGroupInfoModal({ selectedGroup, open, onClose, setDeletingGroupOrLeft }) {
    const [isLeader, setIsLeader] = useState(false)
    const [selectedGroupData, setSelectedGroupData] = useState(null)
    const [deletingMember, setDeletingMember] = useState(true)
    const [usuarios, setUsuarios] = useState([])

    async function handleSearch(text) {
        const data = await getSearchUsersRequest(text, selectedGroupData?.id)
        if (data?.success) {
            setUsuarios(data.users)
        }
    }

    async function handleSendGroupRequest(ci) {
        try {
            const resp = await sendGroupRequest(selectedGroupData.id, ci);

            if (!resp.success) {
                toast.error(resp.description || 'No se pudo enviar la solicitud', {
                    position: 'bottom-left',
                    autoClose: 3000,
                });
                return;
            }

            toast.success('Solicitud enviada correctamente', {
                position: 'bottom-left',
                autoClose: 2500,
            });

            handleSearch("");

        } catch (err) {
            toast.error('Error enviando solicitud', {
                position: 'bottom-left',
                autoClose: 3000,
            });
        }
    }


    useEffect(() => {
        const getGroupData = async () => {
            if (selectedGroup === '') {
                console.log('holi')
                console.log(selectedGroup)
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
    }, [deletingMember, selectedGroup])

    useEffect(() => {
        const detectGroupLeader = () => {
            if (selectedGroupData === null) {
                return
            } else {
                const leaderCi = selectedGroupData.leader.ci
                const userCi = parseInt(localStorage.getItem('ci'))
                if (leaderCi === userCi) {
                    setIsLeader(true)
                } else {
                    setIsLeader(false)
                }
            }
        }

        detectGroupLeader()
    }, [selectedGroupData])

    const handleDeleteGroupMember = async (memberCi) => {
        const deletedMember = await deleteGroupMemberService(selectedGroupData.id, memberCi);

        if (deletedMember.success) {
            toast.success('Miembro eliminado', {
                position: 'bottom-left',
                autoClose: 2500,
            });
            setDeletingMember(!deletingMember);
        } else {
            toast.error(deletedMember?.description || 'Error eliminando el miembro', {
                position: 'bottom-left',
                autoClose: 3000,
            })
        }
    }


    const handleDeleteStudyGroup = async (studyGroupId) => {
        const deletedGroup = await deleteGroupByIdService(studyGroupId);
        if (deletedGroup.success) {
            toast.success('Grupo eliminado', {
                position: 'bottom-left',
                autoClose: 2500,
            });
            onClose();
            setDeletingGroupOrLeft();
        } else {
            toast.error(deletedGroup?.description || 'Error eliminando el grupo', {
                position: 'bottom-left',
                autoClose: 3000,
            });
        }

    }

    const handleLeaveStudyGroup = async (studyGroupId) => {
        const memberLeft = await deleteLeaveGroupService(studyGroupId);
        if (memberLeft.success) {
            toast.success('Saliste del grupo', {
                position: 'bottom-left',
                autoClose: 2500,
            });
            onClose();
            setDeletingGroupOrLeft();
        } else {
            toast.error(memberLeft?.description || 'Error al salir del grupo', {
                position: 'bottom-left',
                autoClose: 3000,
            });
        }

    }

    useEffect(() => {
        if (open && selectedGroupData) {
            handleSearch('')
        }
    }, [open, selectedGroupData])


    return (
        <Modal open={open} onClose={onClose}>
            <div className="text-left w-full p-4 sm:p-6 overflow-y-auto sm:max-h-[80vh] max-h-[100vh] scrollbar">
                {selectedGroupData && (
                    <>
                        <div className="text-left flex flex-row justify-between">
                            <h2 className="font-bold text-[#052e66] text-3xl"> {selectedGroupData.studyGroupName} </h2>
                            <div>
                                {isLeader ? (
                                    <button onClick={() => handleDeleteStudyGroup(selectedGroupData.id)} className="rounded-md px-3 py-2 cursor-pointer border-2 border-[#F53649] bg-[#F53649] duration-300 shadow-lg text-white hover:bg-[#f55565] transition-colors">
                                        <p className='md:inline hidden'>Eliminar grupo </p><p className='block md:hidden'><i className="fa-solid fa-trash "></i></p>
                                    </button>
                                ) : (
                                    <button onClick={() => handleLeaveStudyGroup(selectedGroupData.id)} className="sm:inline hidden rounded-md px-3 py-2 cursor-pointer border-2 border-[#F53649] bg-[#F53649] duration-300 shadow-lg text-white hover:bg-[#f55565] transition-colors">
                                        Salir del grupo
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className='sm:mt-3 mt-3'>
                            <div className="flex flex-col mb-6">
                                <label className="text-blue-900 font-semibold">Líder</label>
                                <label className="font-medium text-gray-700">
                                    {selectedGroupData.leader.name}{' '}
                                    {selectedGroupData.leader.lastName}
                                </label>
                                <p className="text-sm">
                                    {selectedGroupData.leader.mail}
                                </p>
                            </div>
                        </div>
                        <p className="text-blue-900 font-semibold">
                            Miembros
                        </p>

                        <div className="w-full bg-white shadow-md rounded-2xl p-4 flex flex-col border border-gray-300 mt-2">

                            <div className="hidden md:flex w-full text-gray-600 font-medium px-2 pb-2 border-b border-gray-300">
                                <div className="basis-1/3">Nombre</div>
                                <div className="basis-2/3">Correo</div>

                                {isLeader && (
                                    <div className="basis-1/5">Acciones</div>
                                )}
                            </div>


                            <ul className="w-full overflow-y-auto scrollbar mt-2 space-y-3 max-h-72">
                                {selectedGroupData.members && selectedGroupData.members.map((member) => (
                                    <div key={member.ci} className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:border-[#052e66]/40 hover:bg-gray-200 transition shadow-sm flex flex-col md:flex-row md:items-center gap-3">

                                        <div className="md:hidden flex flex-col">
                                            <span className="font-semibold text-gray-800">
                                                {member.name} {member.lastName}
                                            </span>

                                            <span className="text-sm text-gray-600 break-all">
                                                {member.mail}
                                            </span>

                                            {isLeader && (
                                                <button onClick={() => handleDeleteGroupMember(member.ci)} className="px-4 py-2 mt-3 rounded-xl border border-[#F53649] bg-[#F53649] text-white text-sm shadow-md hover:bg-[#f96977] transition flex items-center gap-2">
                                                    <i className="fa-solid fa-trash text-white"></i>
                                                    Eliminar
                                                </button>
                                            )}
                                        </div>

                                        <div className="hidden md:flex w-full items-center text-gray-700">
                                            <div className="basis-1/4 md:basis-1/3">
                                                {member.name} {member.lastName}
                                            </div>

                                            <div className="basis-1/3 md:basis-2/3 break-all pr-3">
                                                {member.mail}
                                            </div>
                                            {isLeader && (
                                                <div className="basis-1/5 flex justify-start">
                                                    <button onClick={() => handleDeleteGroupMember(member.ci)} className="px-4 py-2 cursor-pointer rounded-xl border-2 border-[#F53649] bg-[#F53649] text-white text-sm shadow-md hover:bg-[#f96977] transition flex items-center gap-2" >
                                                        <i className="fa-solid fa-trash text-white"></i>
                                                        Eliminar
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </ul>
                        </div>
                        {isLeader && (
                            <>
                                <div className="flex flex-col gap-2 mt-6 items-start ">
                                    <p className="text-blue-900 font-semibold">
                                        Enviar solicitudes
                                    </p>
                                    <input type="text" onChange={(e) => handleSearch(e.target.value)} className="bg-gray-50 h-12 px-5 w-full sm:w-1/2 rounded-xl text-sm focus:outline-none border border-gray-300 focus:ring-2 focus:ring-[#052e66]/30 transition" placeholder="Buscar usuarios" />
                                </div>
                                <div className="w-full scrollbar bg-white rounded-2xl p-4 shadow-md mt-2 border border-gray-300 max-h-72 overflow-y-auto space-y-3">
                                    <div className="hidden md:flex w-full text-gray-600 font-medium px-2 pb-2 border-b border-gray-300">
                                        <div className="basis-1/4 lg:basis-1/5 text-left">Nombre</div>
                                        <div className="basis-1/4 lg:basis-1/5 text-left">Apellido</div>
                                        <div className="basis-1/3 lg:basis-2/5 text-left">Correo</div>
                                        <div className="basis-1/5 text-left">Solicitud</div>
                                    </div>

                                    {usuarios.map((user) => (
                                        <div key={user.ci} className="bg-[#f4f7fc] rounded-xl p-4 border border-gray-200 hover:border-[#052e66]/40 hover:bg-[#eef3fb] transition shadow-sm flex flex-col md:flex-row md:items-center gap-3">
                                            <div className="md:hidden flex flex-col">
                                                <span className="font-semibold text-gray-800">
                                                    {user.name} {user.lastName}
                                                </span>
                                                <span className="text-sm text-gray-600 break-all">
                                                    {user.mail}
                                                </span>

                                                <button onClick={() => handleSendGroupRequest(user.ci)} className="px-4 cursor-pointer border-2 border-[#052e66] py-2 mt-3 rounded-xl transition-all duration-300 text-sm shadow-md flex items-center gap-2 bg-[#052e66] text-white hover:bg-[#073c88]" >
                                                    <i className="fa-solid fa-envelope text-white"></i>
                                                    Enviar solicitud
                                                </button>

                                            </div>

                                            <div className="hidden md:flex w-full items-center text-gray-700">
                                                <div className="basis-1/4 lg:basis-1/5">{user.name}</div>
                                                <div className="basis-1/4 lg:basis-1/5">{user.lastName}</div>
                                                <div className="basis-1/3 lg:basis-2/5 break-all pr-2"> {user.mail} </div>

                                                <div className="basis-1/5 flex justify-start">
                                                    <button onClick={() => handleSendGroupRequest(user.ci)} className="px-4 cursor-pointer border-2 border-[#052e66] py-2 rounded-xl transition-all duration-300 text-sm shadow-md flex items-center gap-2 bg-[#052e66] text-white hover:bg-[#074cad]" >
                                                        <i className="fa-solid fa-envelope text-white"></i>
                                                        Enviar solicitud
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>

                        )}

                        <div className="flex flex-col mt-3 sm:flex-row sm:justify-end">
                            {!isLeader ? (
                                <button onClick={() => handleLeaveStudyGroup(selectedGroupData.id)} className="sm:hidden inline w-full sm:mt-0 sm:mx-5 py-3 cursor-pointer text-white bg-[#F53649] rounded-xl font-semibold shadow-md hover:bg-[#f96977] transition">
                                    Salir del grupo
                                </button>
                            ) : (
                                <>
                                </>
                            )}
                            <button onClick={onClose} className="sm:w-1/2 sm:hidden mt-3 sm:mt-0 inline w-full sm:mx-5 py-3 cursor-pointer text-white bg-[#052e66] rounded-xl font-semibold shadow-md hover:bg-[#073c88] transition">
                                Cancelar
                            </button>
                        </div>
                    </>
                )}
            </div>
        </Modal>
    )
}