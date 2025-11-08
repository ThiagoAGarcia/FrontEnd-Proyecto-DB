const API = "http://localhost:5000";
const PATH = "/users"

export default async function getUsersService() {
    try {
        const res = await fetch(`${API}${PATH}`);
        if (!res.ok) throw new Error(`GET ${PATH} -> ${res.status}`);
        const users = await res.json();
        console.log(users);
        return users;
    } catch(error) {
        console.log(error.message);
    }
}
