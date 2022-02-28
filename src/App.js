import Home from './pages/Home/Home';
import OriginalHome from './pages/OriginalHome/OriginalHome'
import Admin from './pages/Admin/Admin'
import Profile from './pages/Profile/Profile'

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/originalHome" element={<OriginalHome/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
