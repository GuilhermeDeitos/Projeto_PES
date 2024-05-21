import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login'
import { Register } from './pages/register';
import { Home } from './pages/Home';
import {UserPage} from './pages/Users';
import {EstoquePage} from './pages/Estoque';

//        <Route path="/storage" element={<EstoquePage />} />

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/users" element={<UserPage/>} />
        <Route path="/storage" element={<EstoquePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
