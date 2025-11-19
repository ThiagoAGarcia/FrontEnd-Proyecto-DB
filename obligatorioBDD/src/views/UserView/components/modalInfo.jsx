import { useState, useEffect } from 'react';
import Modal from '../../../components/modal';
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
        if (deletedMember) {
            setDeletingMember(!deletingMember);
        }
    }

    const handleDeleteStudyGroup = async (studyGroupId) => {
        const deletedGroup = await deleteGroupByIdService(studyGroupId);
        if (deletedGroup.success) {
            onClose();
            setDeletingGroupOrLeft();
            console.log(deletedGroup.description)
        }
    }

    const handleLeaveStudyGroup = async (studyGroupId) => {
        const memberLeft = await deleteLeaveGroupService(studyGroupId);
        if (memberLeft.success) {
            onClose();
            setDeletingGroupOrLeft();
            console.log(memberLeft.description);
        }
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
                                    className="bg-red-500 text-white text-sm rounded-md p-1.5 cursor-pointer">
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
                            {selectedGroupData.members &&
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
                                                className="bg-red-500 text-white text-sm rounded-md p-1.5 cursor-pointer">
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