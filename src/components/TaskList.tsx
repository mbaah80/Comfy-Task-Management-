import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { toggleTaskCompletion, deleteTask, updateTask } from '../redux/taskSlice';
import Table from "./Table";

const TaskList: React.FC = () => {
    const dispatch = useDispatch();
    const { tasks, filter } = useSelector((state: RootState) => state.tasks);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState<any>(null);

    // ARIA-compliant Modal handling
    const openEditModal = (task: any) => {
        setTaskToEdit(task);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTaskToEdit(null);
    };

    const handleUpdateTask = (updatedTask: any) => {
        dispatch(updateTask(updatedTask));
        closeModal();
    };

    const filteredTasks = tasks.filter((task) => {
        const statusMatch =
            filter.status === 'All' ||
            (filter.status === 'Completed' && task.completed) ||
            (filter.status === 'Pending' && !task.completed);
        const priorityMatch = filter.priority === 'All' || task.priority === filter.priority;
        return statusMatch && priorityMatch;
    });

    return (
        <div className="overflow-x-auto">
           <Table
                filteredTasks={filteredTasks}
                getPriorityColor={getPriorityColor}
                getStatusColor={getStatusColor}
                dispatch={dispatch}
                openEditModal={openEditModal}
           />

            {/* Modal for editing task */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50"
                    role="dialog"
                    aria-labelledby="edit-task-title"
                    aria-modal="true"
                    aria-describedby="edit-task-desc"
                >
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md" role="document">
                        <h2 id="edit-task-title" className="text-xl font-semibold mb-4">
                            Edit Task
                        </h2>
                        <p id="edit-task-desc" className="sr-only">Edit the details of the selected task.</p>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleUpdateTask(taskToEdit);
                            }}
                        >
                            <div className="mb-4">
                                <label
                                    className="block text-sm font-semibold"
                                    htmlFor="task-name"
                                >
                                    Name
                                </label>
                                <input
                                    id="task-name"
                                    type="text"
                                    className="w-full p-2 border border-gray-300 rounded"
                                    value={taskToEdit?.name || ''}
                                    onChange={(e) =>
                                        setTaskToEdit({ ...taskToEdit, name: e.target.value })
                                    }
                                    aria-describedby="task-name"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold" htmlFor="task-desc">
                                    Description
                                </label>
                                <input
                                    id="task-desc"
                                    type="text"
                                    className="w-full p-2 border border-gray-300 rounded"
                                    value={taskToEdit?.description || ''}
                                    onChange={(e) =>
                                        setTaskToEdit({
                                            ...taskToEdit,
                                            description: e.target.value,
                                        })
                                    }
                                    aria-describedby="task-desc"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold" htmlFor="task-priority">
                                    Priority
                                </label>
                                <select
                                    id="task-priority"
                                    className="w-full p-2 border border-gray-300 rounded"
                                    value={taskToEdit?.priority || ''}
                                    onChange={(e) =>
                                        setTaskToEdit({ ...taskToEdit, priority: e.target.value })
                                    }
                                    aria-describedby="task-priority"
                                >
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold" htmlFor="task-due-date">
                                    Due Date
                                </label>
                                <input
                                    id="task-due-date"
                                    type="date"
                                    className="w-full p-2 border border-gray-300 rounded"
                                    value={taskToEdit?.dueDate || ''}
                                    onChange={(e) =>
                                        setTaskToEdit({ ...taskToEdit, dueDate: e.target.value })
                                    }
                                    aria-describedby="task-due-date"
                                />
                            </div>
                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="border border-gray-400 text-gray-700 px-4 py-2 rounded"
                                    aria-label="Cancel editing task"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded"
                                    aria-label="Save changes to the task"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

// Helpers for priority and status colors
const getPriorityColor = (priority: string) => {
    switch (priority) {
        case 'High':
            return 'red-500';
        case 'Medium':
            return 'yellow-500';
        case 'Low':
            return 'green-500';
        default:
            return 'gray-500';
    }
};

const getStatusColor = (isCompleted: boolean) => {
    return isCompleted ? 'bg-green-500' : 'bg-yellow-500';
};

export default TaskList;
