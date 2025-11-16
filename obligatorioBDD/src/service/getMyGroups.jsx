const API = "http://localhost:5000";
const PATH = "/myGroups";

export default async function getMyGroupsService() {
    try {
        const token = localStorage.getItem("token");

        const res = await fetch(`${API}${PATH}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!res.ok) throw new Error(`GET ${PATH} -> ${res.status}`);

        const grupos = await res.json();
        return grupos;

    } catch (error) {
        console.log(error.message);
    }
}
