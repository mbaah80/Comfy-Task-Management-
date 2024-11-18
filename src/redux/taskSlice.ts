import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import {RootState} from "./store";

// AuthState interface to manage JWT token and authentication status
interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
    status: 'idle' | 'loading' | 'failed';
}

// Task interface representing the task object structure
interface Task {
    id: string;
    name: string;
    description: string;
    dueDate: string;
    priority: 'Low' | 'Medium' | 'High';
    completed: boolean;
}

// TaskState interface representing the state for tasks and filter
interface TaskState {
    tasks: Task[];
    filter: {
        status: 'All' | 'Pending' | 'Completed';
        priority: 'All' | 'Low' | 'Medium' | 'High';
    };
    status: 'idle' | 'loading' | 'failed';
}

// Helper functions for LocalStorage
const loadTasksFromLocalStorage = (): Task[] => {
    try {
        const storedTasks = localStorage.getItem('tasks');
        return storedTasks ? JSON.parse(storedTasks) : [];
    } catch (error) {
        alert('Failed to load tasks from localStorage');
        return [];
    }
};

const saveTasksToLocalStorage = (tasks: Task[]) => {
    try {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
        alert('Failed to save tasks to localStorage');
    }
};

// Async Thunks for fetching and saving tasks from/to API
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (_, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (!token) {
        throw new Error('Unauthorized');
    }

    const response = await axios.get('/api/tasks', {
        headers: {
            Authorization: `Bearer ${token}`,  // Include token in the request header
        },
    });
    return response.data;
});

export const saveTasks = createAsyncThunk('tasks/saveTasks', async (tasks: Task[], { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (!token) {
        throw new Error('Unauthorized');
    }

    await axios.post('/api/tasks', { tasks }, {
        headers: {
            Authorization: `Bearer ${token}`,  // Include token in the request header
        },
    });
});

// Initial state: load tasks from LocalStorage
const initialState: TaskState = {
    tasks: loadTasksFromLocalStorage(),
    filter: { status: 'All', priority: 'All' },
    status: 'idle',
};

// Redux Slice
const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<Task>) => {
            state.tasks.push(action.payload);
            saveTasksToLocalStorage(state.tasks);
        },
        updateTask: (state, action: PayloadAction<Task>) => {
            const index = state.tasks.findIndex(task => task.id === action.payload.id);
            if (index >= 0) {
                state.tasks[index] = action.payload;
                saveTasksToLocalStorage(state.tasks);
            }
        },
        deleteTask: (state, action: PayloadAction<string>) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
            saveTasksToLocalStorage(state.tasks);
        },
        toggleTaskCompletion: (state, action: PayloadAction<string>) => {
            const task = state.tasks.find(task => task.id === action.payload);
            if (task) {
                task.completed = !task.completed;
                saveTasksToLocalStorage(state.tasks);
            }
        },
        setFilter: (state, action: PayloadAction<TaskState['filter']>) => {
            state.filter = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // Handle fetching tasks from the API
            .addCase(fetchTasks.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.status = 'idle';
                state.tasks = action.payload;
                // After fetching tasks from API, save them to localStorage
                saveTasksToLocalStorage(state.tasks);
            })
            .addCase(fetchTasks.rejected, (state) => {
                state.status = 'failed';
            })
            // Handle saving tasks to the API
            .addCase(saveTasks.fulfilled, (state) => {
                // handle save success if needed, no state change needed here
            });
    },
});

export const { addTask, updateTask, deleteTask, toggleTaskCompletion, setFilter } = taskSlice.actions;
export default taskSlice.reducer;
