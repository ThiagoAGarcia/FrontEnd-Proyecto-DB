const API = "http://localhost:5000";
const PATH = "/manageReservation";

export default async function patchManageReservationService(BODY) {
    try {
        const res = await fetch(`${API}${PATH}`, {
            method: "PATCH",
            headers: {
                "Content-Type":"application/json",
                'Authorization': `Bearer ${(
                    localStorage.getItem('token') || ''
                ).replace(/"/g, '')}`,},
            body: JSON.stringify(BODY)
        });
        if (!res.ok) throw new Error(`PATCH ${PATH} -> ${res.status}`);
        const manageReservation = await res.json();
        return manageReservation;
    } catch(error) {
        console.log(error.message);
    }
}