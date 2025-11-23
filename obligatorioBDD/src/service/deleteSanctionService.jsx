const API = "http://localhost:5000";
const PATH = "/deleteSanction";

export default async function deleteSanctionService(SANCTIONID) {
    try {
        const res = await fetch(`${API}${PATH}/${SANCTIONID}`, { 
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${
                    (localStorage.getItem('token') || '').replace(/"/g, '')
                }`,
            },
        });

        const data = await res.json().catch(() => null);

        if (!res.ok) {
            return data || {
                success: false,
                description: `Error ${res.status}`
            };
        }

        return data;

    } catch (error) {
        console.log("Service error:", error.message);

        return {
            success: false,
            description: "Error de conexión con el servidor"
        };
    }
}

