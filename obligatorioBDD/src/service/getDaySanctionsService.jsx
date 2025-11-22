const API = "http://localhost:5000";
const PATH = "/getDaySanctions";

export default async function getDaySanctionsService() {
    try {
        const res = await fetch(`${API}${PATH}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${(
                localStorage.getItem('token') || ''
                ).replace(/"/g, '')}`,
            },
        });
        if (!res.ok) throw new Error(`GET ${PATH} -> ${res.status}`);
        const daySanctions = res.json();
        return daySanctions;
    } catch(error) {
        console.log(error.message);
    }
}