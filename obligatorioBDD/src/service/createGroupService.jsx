const API_URL = "http://localhost:5000";
const PATH = "/createGroup";

export default async function createGroup() {
    const token = localStorage.getItem("token");

    try {
        const res = await fetch(`${API_URL}${PATH}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(BODY),
        })

        if (!res.ok) throw new Error(`POST ${PATH} -> ${res.status}`)
        const career = await res.json()
        return career
    } catch (error) {
        console.log(error.message)
    }
}
