import { useEffect, useState } from 'react';
import Modal from '../../../components/modal';
import postSanctionService from '../../../service/postSanctionService';
import { toast } from "react-toastify";

export default function ModalSanction({ open, onClose, selectedGroupMembers }) {
    const date = new Date(); let day = date.getDate(); let month = date.getMonth() + 1; let year = date.getFullYear();
    let currentDate = `${year}-${month}-${day}`;

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
            console.log(`Fecha fin comer: ${endDate}`)
        } else if (descriptionSelect === 'Ruidoso') {
            endDate.setUTCMonth(endDate.getMonth() + 1);
            console.log(`Fecha fin ruidoso: ${endDate}`)
        } else {
            endDate.setUTCMonth(endDate.getMonth() + 2);
            console.log(`Fecha fin otros: ${endDate}`)
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

                    if (sanctions.success) {
                        toast.success('Sanción enviada', {
                            position: 'bottom-left',
                            autoClose: 2500,
                        })
                    }
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
                <option value='Comer'>Comer</option>
                <option value='Ruidoso'>Ruidoso</option>
                <option value='Vandalismo'>Vandalismo</option>
                <option value='Imprudencia'>Imprudencia</option>
                <option value='Ocupar'>Ocupar</option>
            </select>

            <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-600 mb-1">Fecha de inicio</label>
                <p>{currentDate}</p>
            </div>

            <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-600 mb-1">Fecha de finalización</label>
                <p>{selectedEndDate}</p>
            </div>
        </Modal>
    )
}