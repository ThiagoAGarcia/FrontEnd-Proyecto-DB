import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'

import Login from './views/LoginView/Login.jsx'
import Protected from './navigation/Protected'
import Admin from './views/AdminView/Admin.jsx'
import Register from './views/LoginView/Register.jsx'
import Main from './views/UserView/Main.jsx'
import MainLibrarian from './views/LibrarianView/Main.jsx'
import ProfileUser from './views/ProfileUser.jsx'
import SinToken from './components/SinToken.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Login />} path="/" />
        <Route element={<Register />} path="/Register" />
        <Route element={<Protected allowedRoles={'admin'} />}>
          <Route element={<Admin />} path="/admin" />
        </Route>
        <Route element={<Protected allowedRoles={'student'} />}>
          <Route element={<Main />} path="/main" />
        </Route>
        <Route element={<Protected allowedRoles={'librarian'} />}>
          <Route element={<MainLibrarian />} path="/main-librarian" />
        </Route>

        <Route
          element={
            <Protected
              allowedRoles={['admin', 'student', 'librarian', 'professor']}
            />
          }>
          <Route element={<ProfileUser />} path="/profile" />
        </Route>
        <Route element={<SinToken />} path="/sin-token" />
      </Routes>
    </BrowserRouter>
  )
}

export default App
