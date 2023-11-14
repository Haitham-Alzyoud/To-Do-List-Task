import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTask } from '../Redux/TaskSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const UpateTask = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('low');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = {
      title,
      description,
      dueDate,
      priority,
      completed: false,
    };
    try {
      const response = await dispatch(updateTask({task: newTask, id: id}));
      setTitle('');
      setDescription('');
      setDueDate('');
      setPriority('low');
      navigate('/');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <div className='my-16'>
    <form onSubmit={handleSubmit} className="max-w-xs mx-auto p-4 border border-gray-300 rounded-lg shadow-md">
  <h2 className="text-2xl mb-4">Add Task</h2>
  <div className="mb-5">
    <label className="block text-sm font-semibold" htmlFor="title">
      Title:
    </label>
    <input
      type="text"
      id="title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className="w-full p-2 border border-gray-300 rounded-md"
    />
  </div>
  <div className="mb-5">
    <label className="block text-sm font-semibold" htmlFor="description">
      Description:
    </label>
    <textarea
      id="description"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      className="w-full p-2 border border-gray-300 rounded-md"
    />
  </div>
  <div className="mb-5">
    <label className="block text-sm font-semibold" htmlFor="dueDate">
      Due Date:
    </label>
    <input
      type="date"
      id="dueDate"
      value={dueDate}
      onChange={(e) => setDueDate(e.target.value)}
      className="w-full p-2 border border-gray-300 rounded-md"
    />
  </div>
  <div className="mb-5">
    <label className="block text-sm font-semibold" htmlFor="priority">
      Priority:
    </label>
    <select
      id="priority"
      value={priority}
      onChange={(e) => setPriority(e.target.value)}
      className="w-full p-2 border border-gray-300 rounded-md"
    >
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>
  </div>
  <div className='flex gap-5'>
  <button
    type="submit"
    className="bg-slate-400 px-4 py-2 border border-slate-400 rounded-md cursor-pointer block mt-5 hover:bg-slate-600 hover:text-white"
  >
    Update Task
  </button>
  <Link
    to="/"
    className="bg-slate-400 px-4 py-2 border border-slate-400 rounded-md cursor-pointer block mt-5 hover:bg-slate-600 hover:text-white"
  >
    Cancel
  </Link>
  </div>
</form>
</div>

  );
}

export default UpateTask