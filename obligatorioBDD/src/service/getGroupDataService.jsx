const API = "http://localhost:5000";
// PATH = "/myGroup/<groupId>"

export default async function getGroupDataService(PATH) {
    try {
        const res = await fetch(`${API}${PATH}`);
        if (!res.ok) throw new Error(`GET ${PATH} -> ${res.status}`);
        const groupData = res.json();
        return groupData;
    } catch(error) {
        console.log(error.message);
    }
}
