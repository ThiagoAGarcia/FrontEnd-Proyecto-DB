const API = "http://localhost:5000";
const PATH = "/sendGroupRequest";

export default async function postGroupRequestService(BODY) {
    try {
        const res = await fetch(`${API}${PATH}`, {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(BODY)
        });
    if (!res.ok) throw new Error(`POST ${PATH} -> ${res.status}`);
    const postGroupRequest = await res.json();
    return postGroupRequest;
    } catch(error) {
        console.log(error.message);
    }
}
