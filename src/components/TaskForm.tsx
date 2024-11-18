import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/taskSlice';
import { v4 as uuid } from 'uuid';

const TaskForm: React.FC = () => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState<{
        name: string;
        description: string;
        dueDate: string;
        priority: 'Low' | 'Medium' | 'High';
    }>({
        name: '',
        description: '',
        dueDate: '',
        priority: 'Low',
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(
            addTask({
                ...formData,
                id: uuid(),
                completed: false,
            })
        );
        setFormData({ name: '', description: '', dueDate: '', priority: 'Low' });
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded">
            <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Task Name"
                required
                className="block w-full mb-2 p-2 border"
            />
            <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                className="block w-full mb-2 p-2 border"
            />
            <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="block w-full mb-2 p-2 border"
            />
            <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="block w-full mb-2 p-2 border"
            >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Add Task
            </button>
        </form>
    );
};

export default TaskForm;
