import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

import Login from './views/LoginView/Login.jsx'
import Protected from './navigation/Protected'
import Admin from './views/AdminView/Admin.jsx'
import Register from './views/LoginView/Register.jsx'
import Main from './views/UserView/Main.jsx'
import MainLibrarian from './views/LibrarianView/Main.jsx'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Login />} path="/" />
                <Route element={<Register />} path="/Register" />
                <Route element={<Protected />}>
                    <Route element={<Admin />} path="/admin" exact />
                </Route>
                <Route element={<Main />} path="/main" />
                <Route element={<MainLibrarian />} path="/main-librarian" />
            </Routes>
        </BrowserRouter>
    )
}

export default App
