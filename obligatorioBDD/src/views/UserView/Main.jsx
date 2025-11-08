import { useState } from "react";
import NavBar from "../../components/navBar";
import getUsersService from '../../service/getUsersService.jsx';

export default function Main() {
    const [allUsers, setAllUsers] = useState([]);

    const getAllUsers = async () => {
        const res = await getUsersService();
        console.log(res);
        if (await res.success) {
            setAllUsers(res.users);
        }
    }

    return (
        <>
            <NavBar />
            <button onClick={() => getAllUsers()}>Get Users!</button>
            <ul>
                {allUsers && (
                    allUsers.map((user) => (
                        <li key={user.ci}>{user.name}</li>
                    ))
                )}
            </ul>
        </>
    );
}