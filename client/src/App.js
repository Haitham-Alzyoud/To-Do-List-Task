import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Component/Navbar";
import { Home } from "./Pages/Home";
import AddTask from "./Component/AddTask";
import UpateTask from "./Component/UpdateTask";
import CompletedTasks from "./Component/CompletedTasks";
import PendingTasks from "./Component/PendingTasks";
import Login from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/SignupPage" element={<SignupPage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/addTask" element={<AddTask />} />
          <Route path="/updateTask/:id" element={<UpateTask />} />
          <Route path="/completed" element={<CompletedTasks />} />
          <Route path="/pending" element={<PendingTasks />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
