// TaskForm.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setField, clearFormFields } from "../Redux/TaskFormSlice";
import { postTask, updateTask } from "../Redux/TaskListSlice";

const TaskForm = ({ task }) => {
  console.log(task);
  const dispatch = useDispatch();
  const taskForm = useSelector((state) => state.taskForm);
  console.log(taskForm);
  const [editMode, setEditMode] = useState(false);
  useEffect(() => {
    if (task) {
      dispatch(setField({ field: "title", value: task.title }));
      dispatch(setField({ field: "description", value: task.description }));
      dispatch(setField({ field: "dueDate", value: task.dueDate }));
      dispatch(setField({ field: "priority", value: task.priority }));
      dispatch(setField({ field: "id", value: task.id }));
      setEditMode(true);
    } else {
      dispatch(clearFormFields());
      setEditMode(false);
    }
  }, [dispatch, task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setField({ field: name, value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { id, ...taskData } = taskForm;
    console.log("osama", taskData);
    console.log(id);
    if (editMode) {
      dispatch(updateTask({ id, updatedTask: taskData }));
    } else {
      dispatch(postTask(taskData));
    }
    dispatch(clearFormFields());
    setEditMode(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow-md"
    >
      <h2 className="text-center text-2xl font-semibold mb-4">
        {taskForm.id ? "Edit Task" : "Add New Task"}
      </h2>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="title"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={taskForm.title}
          onChange={handleChange}
          placeholder="Enter title"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="description"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={taskForm.description}
          onChange={handleChange}
          placeholder="Enter description"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="dueDate"
        >
          Due Date
        </label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          value={taskForm.dueDate}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="priority"
        >
          Priority
        </label>
        <select
          id="priority"
          name="priority"
          value={taskForm.priority}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none"
      >
        {taskForm.id ? "Update Task" : "Add Task"}
      </button>
      <button type="submit">Save Task</button>
    </form>
  );
};

export default TaskForm;
