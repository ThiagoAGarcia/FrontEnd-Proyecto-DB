const API = "http://localhost:5000";
// PATH = "/users/<name>&<lastName>&<mail>"

export default async function getUserBySearchService(PATH) {
    try {
        const res = await fetch(`${API}${PATH}`);
        if (!res.ok) throw new Error(`GET ${PATH} -> ${res.status}`);
        const users = res.json();
        return users;
    } catch(error) {
        console.log(error.message);
    }
}
