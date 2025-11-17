const API = "http://localhost:5000";
const PATH = "/myGroup"

export default async function getGroupDataService(GROUPID) {
    try {
        const res = await fetch(`${API}${PATH}/${GROUPID}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${(
                localStorage.getItem('token') || ''
                ).replace(/"/g, '')}`,
            },
        });

        if (!res.ok) {
            const errorJson = await res.json().catch(() => ({}));
            console.log(errorJson.error)
            throw new Error(errorJson.description || `POST ${PATH} -> ${res.status}`);
        }

        const groupData = res.json();

        return groupData;

    } catch(error) {
        console.log(error.message);
    }
}
