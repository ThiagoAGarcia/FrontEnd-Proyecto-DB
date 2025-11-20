import { useState, useEffect } from 'react';
import Modal from '../../../components/modal';
import { toast } from 'react-toastify'
import deleteGroupMemberService from '../../../service/deleteGroupMemberService.jsx';
import deleteGroupByIdService from '../../../service/deleteGroupByIdService.jsx';
import getGroupDataService from '../../../service/getGroupDataService.jsx';
import deleteLeaveGroupService from '../../../service/deleteLeaveGroupService.jsx';

export default function SelectedGroupInfoModal({ selectedGroup, open, onClose, setDeletingGroupOrLeft }) {
    const [isLeader, setIsLeader] = useState(false)
    const [selectedGroupData, setSelectedGroupData] = useState(null)
    const [deletingMember, setDeletingMember] = useState(true)

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

        if (deletedMember?.success) {
            toast.success('Miembro eliminado', {
                position: 'bottom-left',
                autoClose: 2500,
            });
            setDeletingMember(!deletingMember);
        } else {
            const errorMsg = deletedMember?.description?.toLowerCase() || "";

            if (errorMsg.includes("no pertenece") || errorMsg.includes("no encontrado") || errorMsg.includes("no existe")) {
                toast.error('No se encontró el usuario, vuelva a intentar más tarde', {
                    position: 'bottom-left',
                    autoClose: 3000,
                });
            }
            else if (errorMsg.includes("no sos el lider")) {
                toast.error('No sos el líder del grupo, no podés eliminar usuarios', {
                    position: 'bottom-left',
                    autoClose: 3000,
                });
            }
            else {
                toast.error(deletedMember?.description || 'Error eliminando miembro', {
                    position: 'bottom-left',
                    autoClose: 3000,
                });
            }
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

                                            <div className="basis-1/3 md:basis-2/4 break-all pr-3">
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