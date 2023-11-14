import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from './Component/Navbar';
import RegistrationPage from './Pages/RegistrationPage';
import { Home } from './Pages/Home';

function App() {
  return (
 <>
 <BrowserRouter>
 <Navbar/>
 <Routes>
 <Route path="/" element={<Home />} />
 <Route path="/RegistrationPage" element={<RegistrationPage />} />

 </Routes>

 </BrowserRouter>
 </>
  );
}

export default App;
