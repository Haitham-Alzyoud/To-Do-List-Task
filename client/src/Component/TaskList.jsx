import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, deleteTask, updateTask } from "../Redux/TaskSlice";
import { Link, useNavigate } from "react-router-dom";
// import { fetchFilteredTasks } from "../redux/TaskSlice";

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
//   const filteredTasks = useSelector((state) => state.tasks.filteredTasks);
const [filteredTasks, setFilteredTasks] = useState([]);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleSearch = () => {
    // dispatch(fetchFilteredTasks({task: tasks, searchQuery: searchQuery}));
    setFilteredTasks(tasks.filter((task) => {
        return task.title.toLowerCase().includes(searchQuery.toLowerCase());
      }))
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setFilteredTasks([]);
    // dispatch(fetchFilteredTasks("")); // Fetch all tasks again to reset the filtered tasks
  };
  const handleDelete = (taskId) => {
    dispatch(deleteTask(taskId));
    dispatch(fetchTasks());
  };
  const handleState = (taskId) => {
    const updatedTask = tasks.find((task) => task.id === taskId);

  if (updatedTask) {
    const updatedTaskCopy = {
      ...updatedTask,
      completed: !updatedTask.completed,
    };

    dispatch(updateTask({ task: updatedTaskCopy, id: taskId }));
  }
  dispatch(fetchTasks());
  };

  const handleUpdate = (taskId) => {
    navigate(`/updateTask/${taskId}`);
  };

  console.log(filteredTasks);
  return (
    <>
    <div className="flex justify-center flex-wrap ">
      <input
        type="text"
        placeholder="Search tasks"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="px-3 py-2 border rounded-lg mx-3 my-4"
      />
      <button className="mx-3 px-3 py-2 rounded-lg bg-slate-400 my-4" onClick={handleSearch}>Search</button>
      <button className="mx-3 px-3 py-2 rounded-lg bg-slate-400 my-4" onClick={handleClearSearch}>Clear Search</button>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="flex justify-start w-auto items-center gap-3 mx-20 flex-wrap sm:pl-64">
          {filteredTasks.length===0
            ? tasks.map((task) => (
                <div
                  key={task.id}
                  className="card bg-gray-900 w-64 mx-4 my-3 p-7 h-72 rounded-lg"
                >
                  <div className="card-body text-start flex flex-col justify-between h-full">
                    <h5 className="card-title text-lg font-bold text-white">
                      {task.title}
                    </h5>
                    <p className="card-text text-white">{task.description}</p>
                    <p className="card-text text-white">Due Date: {task.dueDate}</p>
                    <p className="card-text text-white">Priority: {task.priority}</p>
                    <div className="flex gap-4">
                      <button
                        className={`px-3 py-2 rounded-full ${
                          task.status ? "bg-green-300" : "bg-red-300"
                        }`}
                        onClick={() => handleState(task.id)}
                      >
                        {task.completed ? "Completed" : "Pending"}
                      </button>
                      <button
                        className="px-3 py-2 border rounded-xl text-white"
                        onClick={() => handleUpdate(task.id)}
                      >
                        <svg
                          class="w-4 h-4"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          {" "}
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />{" "}
                        </svg>
                      </button>
                      <button
                        className="px-3 py-2 border rounded-xl text-white"
                        onClick={() => handleDelete(task.id)}
                      >
                        <svg
                          class="w-4 h-4"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          {" "}
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />{" "}
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            : filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className="card bg-gray-900 w-64 mx-4 my-3 p-7 h-72 rounded-lg"
                >
                  <div className="card-body text-start flex flex-col justify-between h-full">
                    <h5 className="card-title text-lg font-bold text-white">
                      {task.title}
                    </h5>
                    <p className="card-text text-white">{task.description}</p>
                    <p className="card-text text-white">Due Date: {task.dueDate}</p>
                    <p className="card-text text-white">Priority: {task.priority}</p>
                    <div className="flex gap-4">
                      <button
                        className={`px-3 py-2 rounded-full ${
                          task.completed ? "bg-green-300" : "bg-red-300"
                        }`}
                        onClick={() => handleState(task.id)}
                      >
                        {task.completed ? "Completed" : "Pending"}
                      </button>
                      <button
                        className="px-3 py-2 border rounded-xl text-white"
                        onClick={() => handleUpdate(task.id)}
                      >
                        <svg
                          class="w-4 h-4"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          {" "}
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />{" "}
                        </svg>
                      </button>
                      <button
                        className="px-3 py-2 border rounded-xl text-white"
                        onClick={() => handleDelete(task.id)}
                      >
                        <svg
                          class="w-4 h-4"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          {" "}
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />{" "}
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          <Link
            to="/addTask"
            className="card w-64 mx-4 my-3 p-7 cursor-pointer h-72 rounded-lg flex justify-center items-center border-dashed border-gray-500 border-2"
          >
            <svg
              class="text-gray-600 w-10 h-10"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />{" "}
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
};

export default TaskList;