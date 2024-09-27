import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PlusCircle, Edit2, Trash2, CheckCircle } from 'lucide-react';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("https://toodoss.onrender.com/get");
      setTodos(response.data);
    } catch (err) {
      setError('Failed to fetch todos');
      console.error(err);
    }
  };

  const addTodo = async () => {
    if (!newTask.trim()) return;
    try {
      await axios.post("https://toodoss.onrender.com/addtask", { task: newTask });
      setNewTask('');
      fetchTodos();
    } catch (err) {
      setError('Failed to add todo');
      console.error(err);
    }
  };

  const updateTodo = async (id, task) => {
    try {
      await axios.put(`https://toodoss.onrender.com/update/${id}`, { task });
      setEditingId(null);
      fetchTodos();
    } catch (err) {
      setError('Failed to update todo');
      console.error(err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`https://toodoss.onrender.com/del/${id}`);
      fetchTodos();
    } catch (err) {
      setError('Failed to delete todo');
      console.error(err);
    }
  };

  const toggleDone = async (id, currentDone) => {
    try {
      await axios.put(`https://toodoss.onrender.com/update/${id}`, { done: !currentDone });
      fetchTodos();
    } catch (err) {
      setError('Failed to update todo status');
      console.error(err);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-body">
              <h1 className="card-title text-center mb-4">Todo List</h1>
              
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Add new task"
                />
                <button
                  className="btn btn-primary"
                  onClick={addTodo}
                >
                  <PlusCircle size={20} />
                </button>
              </div>

              <ul className="list-group">
                {todos.map((todo) => (
                  <li key={todo._id} className="list-group-item d-flex justify-content-between align-items-center">
                    {editingId === todo._id ? (
                      <input
                        type="text"
                        className="form-control me-2"
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                      />
                    ) : (
                      <span className={todo.done ? 'text-decoration-line-through text-muted' : ''}>
                        {todo.task}
                      </span>
                    )}
                    <div>
                      {editingId === todo._id ? (
                        <button
                          className="btn btn-success btn-sm me-1"
                          onClick={() => updateTodo(todo._id, editingText)}
                        >
                          <CheckCircle size={18} />
                        </button>
                      ) : (
                        <button
                          className="btn btn-primary btn-sm me-1"
                          onClick={() => {
                            setEditingId(todo._id);
                            setEditingText(todo.task);
                          }}
                        >
                          <Edit2 size={18} />
                        </button>
                      )}
                      <button
                        className="btn btn-danger btn-sm me-1"
                        onClick={() => deleteTodo(todo._id)}
                      >
                        <Trash2 size={18} />
                      </button>
                      <button
                        className={`btn btn-sm ${todo.done ? 'btn-success' : 'btn-outline-secondary'}`}
                        onClick={() => toggleDone(todo._id, todo.done)}
                      >
                        <CheckCircle size={18} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
