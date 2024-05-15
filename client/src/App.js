import {Route, Routes} from "react-router-dom";
import './App.css';
import Layout from './Components/Layout';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Create from './Pages/Create';
import Logout from "./Pages/Logout";
import Profile from "./Pages/Profile";


function App() {
  return (
    <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path='/create' element={<Create /> } />
      <Route path="/logout" element={<Logout />} />
      <Route path="/profile/:username" element={<Profile />} />
      
    </Route>
  </Routes>
  );
}

export default App;
