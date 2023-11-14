import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Component/Navbar";
import RegistrationPage from "./Pages/RegistrationPage";
import { Home } from "./Pages/Home";
import AddTask from "./Component/AddTask";
import UpateTask from "./Component/UpdateTask";
import CompletedTasks from "./Component/CompletedTasks";
import PendingTasks from "./Component/PendingTasks";
import Sidebar from "./Component/Sidebar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Sidebar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/RegistrationPage" element={<RegistrationPage />} />
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
