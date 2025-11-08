import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'

import Login from './views/LoginView/Login.jsx'
import Protected from './navigation/Protected'
import Admin from './views/AdminView/Admin.jsx'
import User from './views/UserView/User.jsx'
import Register from './views/LoginView/Register.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Login />} path="/" />
        <Route element={<Register />} path="/Register" />
        <Route element={<Protected />}>
          <Route element={<Admin />} path="/admin" exact />
        </Route>
        <Route element={<User />} path="/user" />
      </Routes>
    </BrowserRouter>
  )
}

export default App
