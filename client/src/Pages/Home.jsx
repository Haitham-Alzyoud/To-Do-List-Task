import React from "react";

import TaskList from "../Component/TaskList";
import Sidebar from "../Component/Sidebar";

export const Home = () => {
  return (
    <div>
      <Sidebar/>
      <TaskList />
    </div>
  );
};
