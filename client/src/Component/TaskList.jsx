// TaskList.js
import React,{useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask, fetchTasks } from '../Redux/TaskListSlice';
import TaskForm from './TaskForm';

const TaskList = () => {
  const tasks = useSelector((state) => state.task.tasks);
  const dispatch = useDispatch();
  const [selectedTask, setSelectedTask] = useState(null);
useEffect(()=>{
  dispatch(fetchTasks());
},[dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };
  const handleEdit = (task) => {
    setSelectedTask(task);
  };
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-center text-2xl font-semibold mb-8">Task List</h2>
      {selectedTask && <TaskForm task={selectedTask}/>}
      <ul className="list-none p-0">
        {tasks.map((task) => (
          <li key={task.id} className="border-b border-gray-300 py-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">{task.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{task.description}</p>
              <p className="text-xs text-gray-700">Due Date: {task.dueDate}</p>
              <button
                  onClick={() => handleEdit(task)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
                >
                  Edit
                </button>
              <button
                onClick={() => handleDelete(task.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      
    </div>
  );
};

export default TaskList;

