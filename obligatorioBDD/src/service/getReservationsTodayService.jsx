const API = "http://localhost:5000";
const PATH = "/reservationsToday"

export default async function getReservationsTodayService() {
    try {
        const res = await fetch(`${API}${PATH}`);
        if (!res.ok) throw new Error(`GET ${PATH} -> ${res.status}`);
        const reservationData = res.json();
        return reservationData;
    } catch(error) {
        console.log(error.message);
    }
}