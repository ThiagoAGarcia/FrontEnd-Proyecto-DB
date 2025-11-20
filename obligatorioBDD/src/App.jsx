import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'

import Login from './views/LoginView/Login.jsx'
import Protected from './navigation/Protected'
import MainAdmin from './views/AdminView/Main.jsx'
import Register from './views/LoginView/Register.jsx'
import Main from './views/UserView/Main.jsx'
import MainLibrarian from './views/LibrarianView/Main.jsx'
import ProfileUser from './views/ProfileUser.jsx'
import SinToken from './components/SinToken.jsx'
import {GroupsProvider} from './context/useGroup.jsx'
import {ToastContainer} from 'react-toastify'

function App() {
  return (
    <GroupsProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Login />} path="/" />
          <Route element={<Register />} path="/Register" />

          <Route element={<Protected allowedRoles={'administrator'} />}>
            <Route element={<MainAdmin />} path="/main-admin" />
          </Route>

          <Route
            element={<Protected allowedRoles={['student', 'professor']} />}>
            <Route path="/main" element={<Main />} />
          </Route>

          <Route element={<Protected allowedRoles={'librarian'} />}>
            <Route element={<MainLibrarian />} path="/main-librarian" />
          </Route>

          <Route
            element={
              <Protected
                allowedRoles={[
                  'administrator',
                  'student',
                  'librarian',
                  'professor',
                ]}
              />
            }>
            <Route element={<ProfileUser />} path="/profile" />
          </Route>

          <Route element={<SinToken />} path="/sin-token" />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="bottom-left" style={{zIndex: 1000}} />
    </GroupsProvider>
  )
}

export default App
