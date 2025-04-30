import axios from 'axios';
const API_URL = 'http://localhost:5000/api';

const TaskService = {
  getTasks: () => axios.get(`${API_URL}/tasks`),
  createTask: (data) => axios.post(`${API_URL}/task`, data),
  updateTask: (id, data) => axios.put(`${API_URL}/task/${id}`, data),
  deleteTask: (id) => axios.delete(`${API_URL}/task/${id}`)
};

export default TaskService;
