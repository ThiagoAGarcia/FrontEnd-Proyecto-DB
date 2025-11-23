const API = "http://localhost:5000";
const PATH = "/patchEmptyReservation";

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
        if (!res.ok) {
            const err = await res.json()
            throw new Error(`PATCH ${PATH} -> ${err.error}`);
        }
            
        const finishedData = await res.json();
        return finishedData;
    } catch(error) {
        console.log(error.message);
    }
}