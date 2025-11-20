import { useEffect, useState } from 'react';
import Modal from '../../../components/modal';
import postSanctionService from '../../../service/postSanctionService';

export default function ModalSanction({ open, onClose, selectedGroupMembers }) {
    const date = new Date(); let day = date.getDate(); let month = date.getMonth() + 1; let year = date.getFullYear();
    let currentDate = `${year}-${month}-${day}`; let maxEndDate = `${year}-${month + 2}-${day}`;

    const [selectedMembers, setSelectedMembers] = useState([]);
    const [selectedDescription, setSelectedDescription] = useState('');
    const [selectedEndDate, setSelectedEndDate] = useState('');
    const [trigger, setTrigger] = useState(false);

    const handleCheckboxes = () => {
        const checkedCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');
        const members = [];
        checkedCheckboxes.forEach(checkbox => {
            members.push(checkbox.value);
        });

        setSelectedMembers(members);
    }

    const getEndDate = () => {
        const descriptionSelect = document.getElementById('description').value.toString();
        setSelectedDescription(descriptionSelect);

        let endDate = new Date();

        if (descriptionSelect === 'Comer') {
            endDate.setUTCDate(endDate.getDay() + 15);
        } else if (descriptionSelect === 'Ruidoso') {
            endDate.setUTCMonth(endDate.getMonth() + 1);
        } else {
            endDate.setUTCMonth(endDate.getMonth() + 2);
        }

        let endDateDay = endDate.getDay(); let endDateMonth = endDate.getMonth(); let endDateYear = endDate.getFullYear();
        let endDateFormat = `${endDateYear}-${endDateMonth}-${endDateDay}`

        setSelectedEndDate(endDateFormat);
    }

    const handleFormSubmit = () => {
        handleCheckboxes();
        getEndDate();
        setTrigger(true);
    }

    useEffect(() => {
        const sendSanctions = async () => {
            if (!trigger) {
                return;
            } else {
                bodies = []
                selectedMembers.map((member) => {
                    bodies.push({
                        "groupParticipantCi": member,
                        "librarianCi": localStorage.getItem('ci'),
                        "description": selectedDescription,
                        "startDate": currentDate,
                        "endDate": selectedEndDate
                    })
                })

                const sanctionsSent = bodies.map(async (body) => {
                    const sanctionSent = await postSanctionService(body);
                    return sanctionSent;
                })

                try {
                    const sanctions = await Promise.all(sanctionsSent);
                    console.log(sanctions);
                    setTrigger(false);
                } catch (error) {
                    console.log(error);
                    setTrigger(false);
                }
            }
        }

        sendSanctions();
    }, [trigger])

    return (
        <Modal open={open} onClose={onClose}>
            <form onSubmit={() => handleFormSubmit()}>
                {selectedGroupMembers.length > 0 && selectedGroupMembers.map((member) => (
                    <div>
                        <input type='checkbox' id={member.ci} name={member.ci} />
                        <label htmlFor={member.ci}>{member.name} {member.lastName}</label>
                    </div>
                ))}
                <button type='submit'>Enviar sanciones</button>
            </form>

            <select id='description'>
                <option></option>
            </select>

            <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-600 mb-1">Fecha de inicio</label>
                <p>{currentDate}</p>
            </div>

            <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-600 mb-1">Fecha de finalización</label>
                <input id="endDate" type="date" min={currentDate} max={maxEndDate} className="bg-gray-100 border rounded-xl px-3 py-2 shadow-sm focus:outline-none border-gray-500 focus:ring-2 focus:ring-[#052e66]/50 transition-all" />
            </div>
        </Modal>
    )
}