const API_URL = "http://localhost:5000";

export default async function createGroup(studyGroupName) {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/createGroup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ studyGroupName })
    });

    return await response.json();
}
