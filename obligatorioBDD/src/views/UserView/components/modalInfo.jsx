import { useState } from 'react';
import Modal from '../../../components/modal';

export default function SelectedGroupInfoModal({ selectedGroupData, open, onClose, handleDeleteGroupMember, handleDeleteStudyGroup, handleLeaveStudyGroup }) {
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
                                    className="bg-red-500 text-white text-sm rounded-md p-1.5">
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