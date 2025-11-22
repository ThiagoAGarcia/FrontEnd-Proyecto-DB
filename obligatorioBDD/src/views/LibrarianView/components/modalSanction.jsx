import { useEffect, useState } from 'react';
import Modal from '../../../components/modal';
import postSanctionService from '../../../service/postSanctionService';
import { toast } from "react-toastify";

export default function ModalSanction({ open, onClose, groupMembers }) {
    const date = new Date(); let startDay = date.getDate(); let startMonth = date.getMonth() + 1; let startYear = date.getFullYear();
    let currentDate = `${startYear}-${startMonth}-${startDay}`;

    const [selectedMembers, setSelectedMembers] = useState([]);
    const [selectedDescription, setSelectedDescription] = useState('');
    const [selectedEndDate, setSelectedEndDate] = useState('');
    const [trigger, setTrigger] = useState(false);

    useEffect(() => {
        const getEndDate = () => {
            if (selectedDescription === '') return;

            let end = new Date();

            if (selectedDescription === 'Comer') {
                end.setDate(end.getDate() + 15);
            } else if (selectedDescription === 'Ruidoso') {
                end.setMonth(end.getMonth() + 1);
            } else {
                end.setMonth(end.getMonth() + 2);
            }

            const year = end.getFullYear();
            const month = String(end.getMonth() + 1).padStart(2, '0');
            const day = String(end.getDate()).padStart(2, '0');

            const endDate = `${year}-${month}-${day}`;
            setSelectedEndDate(endDate);
        };

        getEndDate();
    }, [selectedDescription]);

    const handleCheckboxes = (event) => {
        const member = event.target.value;
        const checked = event.target.checked;

        if (checked) {
            setSelectedMembers((prev) => [...prev, member]);
        } else {
            setSelectedMembers((prev) =>
                prev.filter((onMember) => onMember !== member)
            );
        }
    }

    const sendSanctions = async () => {
        const BODY = {
            "members": selectedMembers,
            "librarianCi": localStorage.getItem('ci'),
            "description": selectedDescription,
            "startDate": currentDate,
            "endDate": selectedEndDate
        }

        try {
            const sanctions = await postSanctionService(BODY);

            if (sanctions.success) {
                toast.success('Sanción enviada', {
                    position: 'bottom-left',
                    autoClose: 2500,
                })
            } else {
                toast.warning(sanctions.error, {
                    position: 'bottom-left',
                    autoClose: 2500,
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    console.log(selectedMembers)

    return (
        <Modal open={open} onClose={onClose}>
            <div className='flex flex-col items-center p-6'>
                <form id='members'>
                    <div className='w-full border-2 rounded-lg border-gray-200 p-4'>
                        {groupMembers && groupMembers.map((member) => (
                            <div key={member.ci}>
                                <input onChange={(e) => handleCheckboxes(e)} checked={selectedMembers.includes(String(member.ci))} type='checkbox' id={member.ci} value={member.ci} />
                                <label htmlFor={member.ci}> <span className='p-1'>{member.name} {member.lastName}</span></label>
                            </div>
                        ))}
                    </div>
                </form>

                <select id='description' onChange={(e) => setSelectedDescription(e.target.value)}>
                    <option value='Comer'>Comer</option>
                    <option value='Ruidoso'>Ruidoso</option>
                    <option value='Vandalismo'>Vandalismo</option>
                    <option value='Imprudencia'>Imprudencia</option>
                    <option value='Ocupar'>Ocupar</option>
                </select>

                <div className='flex flex-row justify-between w-full p-10'>
                    <div className="w-1/2 flex flex-col items-center">
                        <label className="text-sm font-semibold text-blue-900 mb-1">Fecha de inicio</label>
                        <p className='text-xl'>{currentDate}</p>
                    </div>

                    <div className="w-1/2 flex flex-col items-center">
                        <label className="text-sm font-semibold text-blue-900 mb-1">Fecha de finalización</label>
                        <p>{selectedEndDate}</p>
                    </div>
                </div>

                <button onClick={() => sendSanctions()} className='bg-blue-800 hover:bg-blue-900 rounded-xl text-white font-xl p-2'>
                    Enviar sanciones
                </button>
            </div>
        </Modal>
    )
}