const API_URL = "http://localhost:5000";
const PATH = "/searchUsersRequest"

export default async function SearchUsers(text) {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}${PATH}?text=${text}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    return await response.json();
}