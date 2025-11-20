const API = "http://localhost:5000";
const PATH = "/newSanction"

export default async function postSanctionService(BODY) {
    try {
        const res = await fetch(`${API}${PATH}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${(
                    localStorage.getItem('token') || ''
                ).replace(/"/g, '')}`,
            },
            body: JSON.stringify(BODY)
        });
        if (!res.ok) throw new Error(`POST ${PATH} -> ${res.status}`);
        const postGroupRequest = await res.json();
        return postGroupRequest;
    } catch (error) {
        console.log(error.message);
    }
}