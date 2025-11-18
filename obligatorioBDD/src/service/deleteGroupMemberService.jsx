const API = "http://localhost:5000";
const PATH = "/deleteUser";

export default async function deleteGroupMemberService(GROUPID, USERID) {
    try {
        const res = await fetch(`${API}${PATH}/${GROUPID}/${USERID}`, { method: "DELETE", headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${(
                localStorage.getItem('token') || ''
                ).replace(/"/g, '')}`,
            },
        });
        if (!res.ok) throw new Error(`DELETE ${PATH} -> ${res.status}`);
        return true;
    } catch(error) {
        console.log(error.message);
    }
}
