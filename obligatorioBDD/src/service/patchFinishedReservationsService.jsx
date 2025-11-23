const API = "http://localhost:5000";
const PATH = "/patchFinishedReservations";

export default async function patchFinishedReservationsService(BODY) {
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
        const finishedData = await res.json();
        return finishedData;
    } catch(error) {
        console.log(error.message);
    }
}