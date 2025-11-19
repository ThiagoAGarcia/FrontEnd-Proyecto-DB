import { useState, useEffect } from 'react';
import Modal from '../../../components/modal';
import deleteGroupMemberService from '../../../service/deleteGroupMemberService.jsx'
import deleteGroupByIdService from '../../../service/deleteGroupByIdService.jsx'

export default function SelectedGroupInfoModal({ selectedGroupData, open, onClose, setDeleting, deleting }) {
    const [isLeader, setIsLeader] = useState(false)

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
            setDeleting(!deleting);
            // quiero agregarle un mensaje de toast pero no puedo
        } else {
            error = 'Algo salió mal.'
        }
    }

    const handleDeleteStudyGroup = async (studyGroupId) => {
        const deletedGroup = await deleteGroupByIdService(studyGroupId);
        console.log(deletedGroup)
        if (deletedGroup.success) {
            setDeleting(!deleting);
            console.log(deleting)
            console.log(deletedGroup.description)
        } else {
            console.log('hola')
        }
    }

    const handleLeaveStudyGroup = (studyGroupId) => {
        return
    }

    return (
        <Modal open={open} onClose={onClose}>
            <div className="p-6">
                {selectedGroupData && (
                    <>
                        <div className="flex flex-row justify-between">
                            <h2 className="font-semibold text-2xl">
                                {selectedGroupData.studyGroupName}
                            </h2>
                            {isLeader ? (
                                <button
                                    onClick={() =>
                                        handleDeleteStudyGroup(selectedGroupData.id)
                                    }
                                    className="bg-red-500 text-white text-sm rounded-md p-1.5 cursor-pointer">
                                    Eliminar grupo
                                </button>
                            ) : (
                                <button
                                    onClick={() =>
                                        handleLeaveStudyGroup(selectedGroupData.id)
                                    }
                                    className="bg-red-500 text-white text-sm rounded-md p-1.5">
                                    Salir del grupo
                                </button>
                            )}
                        </div>
                        {selectedGroupData.status === 'Activo' ? (
                            <p className="text-green-500 font-semibold">
                                {selectedGroupData.status}
                            </p>
                        ) : (
                            <p className="text-red-500 font-semibold">
                                {selectedGroupData.status}
                            </p>
                        )}
                        <div className="flex flex-row justify-between items-baseline">
                            <p>
                                <span className="text-blue-900 font-semibold">
                                    Líder:
                                </span>{' '}
                                {selectedGroupData.leader.name}{' '}
                                {selectedGroupData.leader.lastName}
                            </p>
                            <p className="text-sm">
                                {selectedGroupData.leader.mail}
                            </p>
                        </div>
                        <p className="text-blue-900 font-semibold">
                            Miembros
                        </p>
                        <div className="border-gray-200 border-2 rounded-xl p-2 mt-2">
                            <div className="flex flex-row justify-between">
                                <div>Nombre</div>
                                <div>Correo</div>
                                <div>Acciones</div>
                            </div>
                            {selectedGroupData &&
                                selectedGroupData.members.map((member) => (
                                    <div
                                        key={member.ci}
                                        className="flex flex-row justify-between m-2">
                                        <p>
                                            {member.name} {member.lastName}
                                        </p>
                                        <p>{member.mail}</p>
                                        {isLeader && (
                                            <button
                                                onClick={() =>
                                                    handleDeleteGroupMember(member.ci)
                                                }
                                                className="bg-red-500 text-white text-sm rounded-md p-1.5">
                                                Eliminar
                                            </button>
                                        )}
                                    </div>
                                ))}
                        </div>
                    </>
                )}
            </div>
        </Modal>
    )
}