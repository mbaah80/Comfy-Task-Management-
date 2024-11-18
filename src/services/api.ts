// api.ts - Mock API setup using Axios
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://mockapi.example.com/', // Replace with real API if needed
    headers: { 'Content-Type': 'application/json' }
});

// Task CRUD Operations
export const fetchTasks = async (token: string) => {
    try {
        const response = await api.get('/tasks', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return [];
    }
};

export const addTask = async (task: any, token: string) => {
    try {
        const response = await api.post('/tasks', task, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error adding task:', error);
    }
};

export const updateTask = async (task: any, token: string) => {
    try {
        const response = await api.put(`/tasks/${task.id}`, task, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating task:', error);
    }
};

export const deleteTask = async (taskId: string, token: string) => {
    try {
        await api.delete(`/tasks/${taskId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.error('Error deleting task:', error);
    }
};
