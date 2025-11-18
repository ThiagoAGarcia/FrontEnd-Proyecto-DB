const API = "http://localhost:5000";
const PATH = "/searchUsersRequest"

export default async function SearchUsers(text) {
    const token = localStorage.getItem("token");

    try {
        const res = await fetch(`${API}${PATH}?text=${text}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        })
        if (!res.ok) throw new Error(`GET ${PATH} -> ${res.status}`)
        const users = await res.json()
        return users
    } catch (error) {
        console.log(error.message)
    }
}