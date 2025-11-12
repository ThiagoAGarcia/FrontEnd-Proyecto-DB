const API = "http://localhost:5000";
// PATH = "/deleteMyGroup/<groupId>"

export default async function deleteGroupByIdService(PATH) {
    try {
        const res = await fetch(`${API}${PATH}`, { method: "DELETE" });
        if (!res.ok) throw new Error(`DELETE ${PATH} -> ${res.status}`);
        return true;
    } catch(error) {
        console.log(error.message);
    }
}
