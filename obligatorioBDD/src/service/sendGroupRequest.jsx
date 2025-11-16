const API = "http://localhost:5000";
const PATH = "/sendGroupRequest";

export default async function sendGroupRequest(studyGroupId, receiver) {
    const token = localStorage.getItem("token");

    try {
        const res = await fetch(`${API}${PATH}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ studyGroupId, receiver })
        });
        if (!res.ok) {
            const errorJson = await res.json().catch(() => ({}));
            throw new Error(errorJson.description || `POST ${PATH} -> ${res.status}`);
        }

        return await res.json();

    } catch (error) {
        console.log(error.message);
    }
}
