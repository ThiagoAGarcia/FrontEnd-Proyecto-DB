const API = "http://localhost:5000";
// PATH = "/group/<groupId>/acceptRequest"

export default async function patchAcceptRequestService(PATH, BODY) {
    try {
        const res = await fetch(`${API}${PATH}`, {
            method: "PATCH",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(BODY)
        });
        if (!res.ok) throw new Error(`PATCH ${PATH} -> ${res.status}`);
        const acceptRequest = await res.json();
        return acceptRequest;
    } catch(error) {
        console.log(error.message);
    }
}