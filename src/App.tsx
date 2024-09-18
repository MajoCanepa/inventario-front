import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import CustomNavbar from './components/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import ListEquipment from './pages/ListEquipment'
import CreataEquipment from './pages/CreateEquipment'
import EditEquipment from './pages/EditEquipment'
import './App.css'


const App: React.FC = () => {

  const isAuthenticated = !!localStorage.getItem('token')
  
  return (
    <Router>
      <CustomNavbar />
     <Routes>
       
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/equipment" element={isAuthenticated ? <ListEquipment /> : <Navigate to="/login" />} />
        <Route path="/create" element={isAuthenticated ? <CreataEquipment /> : <Navigate to="/equipment" />} />
        <Route path="/edit/:id" element={isAuthenticated ? <EditEquipment /> : <Navigate to="/equipment" />} />
        <Route path="/login" element={<Navigate to="/equipment" />} />

        {/* <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} /> */}

     </Routes>
      
    </Router>
  )
}

export default App
