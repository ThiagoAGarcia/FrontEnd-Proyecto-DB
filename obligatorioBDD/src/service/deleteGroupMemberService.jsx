const API = "http://localhost:5000";
const PATH = "/deleteUser";

export default async function deleteGroupMemberService(GROUPID, USERID) {
    try {
        const res = await fetch(`${API}${PATH}/${GROUPID}/${USERID}`, { 
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${
                    (localStorage.getItem('token') || '').replace(/"/g, '')
                }`,
            },
        });

        const data = await res.json().catch(() => null);


        return data;

    } catch (error) {
        console.log("Service error:", error.message);

        return {
            success: false,
            description: "Error de conexión con el servidor"
        };
    }
}

