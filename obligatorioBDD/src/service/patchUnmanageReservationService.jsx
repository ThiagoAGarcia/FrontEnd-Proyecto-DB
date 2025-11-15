const API = "http://localhost:5000";
const PATH = "/unmanageReservation";

export default async function patchManageReservationService(BODY) {
    try {
        const res = await fetch(`${API}${PATH}`, {
            method: "PATCH",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(BODY)
        });
        if (!res.ok) throw new Error(`PATCH ${PATH} -> ${res.status}`);
        const unmanageReservation = await res.json();
        return unmanageReservation;
    } catch(error) {
        console.log(error.message);
    }
}