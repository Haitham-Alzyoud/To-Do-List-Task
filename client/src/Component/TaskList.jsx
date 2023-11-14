// TaskList.js
import React,{useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask, fetchTasks,  updateTaskStatus, selectFilteredTasks, setFilter,  setSearch, } from '../Redux/TaskListSlice';
import TaskForm from './TaskForm';

const TaskList = () => {
  const tasks = useSelector((state) => state.task.tasks);
  const dispatch = useDispatch();
  const [selectedTask, setSelectedTask] = useState('');
useEffect(()=>{
  dispatch(fetchTasks());
},[dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };
  const handleEdit = (task) => {
    console.log(task)
    setSelectedTask(task);
  };
  const handleStatusChange = (id, checked) => {
    const status = checked ? 'completed' : 'pending';
    dispatch(updateTaskStatus({ id, status }));
  };

  const handleFilterChange = (filter) => {
    dispatch(setFilter(filter));
  };

  const handleSearchChange = (e) => {
    dispatch(setSearch(e.target.value));
  };
  

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-center text-2xl font-semibold mb-8">Task List</h2>
      {selectedTask && <TaskForm task={selectedTask}/>}
      <div className="flex items-center mb-4">
        <select
          className="px-3 py-2 border rounded-md mr-4"
          onChange={(e) => handleFilterChange(e.target.value)}
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>

        <input
          type="text"
          placeholder="Search tasks..."
          className="px-3 py-2 border rounded-md"
          onChange={handleSearchChange}
        />
      </div>
      <ul className="list-none p-0">
        {tasks.map((task) => (
          <li key={task.id} className="border-2 mb-5 border-gray-300 py-4">
            <div className='m-4'>
              <h3 className="text-lg font-semibold mb-2 border-b">Title: {task.title}</h3>
              <p className="text-sm text-gray-600 mb-2 border-b">Description: {task.description}</p>
              <p className="text-xs text-gray-700 mb-2  border-b">Due Date: {task.dueDate}</p>
              <p className="text-xs text-gray-700 mb-2  border-b">Priority: {task.priority}</p>
              <p className={`text-xs ${task.status === 'completed' ? 'text-green-600' : 'text-red-600'}`}>
                Status: {task.status}
              </p>

              <div className='m-4 flex justify-between'>
              <button
                  onClick={() => handleEdit(task)}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
                >
                  Edit
                </button>
                <label>
                  <input
                    type="checkbox"
                    checked={task.status === 'completed'}
                    onChange={(e) => handleStatusChange(task.id, e.target.checked)}
                  />
                  Mark as Completed
                </label>
              <button
                onClick={() => handleDelete(task.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none"
              >
                Delete
              </button>
              </div>
              
            </div>
          </li>
        ))}
      </ul>
      
    </div>
  );
};

export default TaskList;

