import React from "react";
import { deleteTask } from "../redux/taskSlice";
import { useDispatch } from "react-redux";

interface Task {
    id: string;  // Changed to string to match dispatch (if needed, you can change this to 'number')
    name: string;
    description: string;
    dueDate: string;
    priority: string;
    completed: boolean;
}

// Define the props type
interface TableProps {
    filteredTasks: Task[];
    getPriorityColor: (priority: string) => string;
    getStatusColor: (isCompleted: boolean) => string;
    dispatch: ReturnType<typeof useDispatch>;
    openEditModal: (task: Task) => void;
}

export const Table: React.FC<TableProps> = ({
                                                filteredTasks,
                                                getPriorityColor,
                                                getStatusColor,
                                                dispatch,
                                                openEditModal,
                                            }) => {
    return (
        <table
            className="table-auto w-full border-collapse border border-gray-300"
            aria-label="Task List"
            role="table"
        >
            <thead>
            <tr className="bg-gray-200">
                <th className="p-2 border text-[#000]" scope="col">
                    Name
                </th>
                <th className="p-2 border text-[#000]" scope="col">
                    Description
                </th>
                <th className="p-2 border text-[#000]" scope="col">
                    Due Date
                </th>
                <th className="p-2 border text-[#000]" scope="col">
                    Priority
                </th>
                <th className="p-2 border text-[#000]" scope="col">
                    Status
                </th>
                <th className="p-2 border text-[#000]" scope="col">
                    Actions
                </th>
            </tr>
            </thead>
            <tbody>
            {
                filteredTasks.length === 0 && (
                    <tr>
                        <td className="p-2 border text-center" colSpan={6}>
                            No tasks found.
                        </td>
                    </tr>
                )
            }
            {
                filteredTasks.map((task) => (
                <tr
                    key={task.id}
                    className="text-center"
                    tabIndex={0}
                    aria-label={`Task: ${task.name}`}
                    role="row"
                >
                    <td className="p-2 border">{task.name}</td>
                    <td className="p-2 border">{task.description}</td>
                    <td className="p-2 border">{task.dueDate}</td>
                    <td className={`p-2 border text-${getPriorityColor(task.priority)}`}>
                        {task.priority}
                    </td>
                    <td className="p-2 border">
                            <span
                                className={`px-3 py-1 rounded-[8px] text-white ${getStatusColor(
                                    task.completed
                                )}`}
                                role="status"
                                aria-live="polite"
                            >
                                {task.completed ? "Completed" : "Pending"}
                            </span>
                    </td>
                    <td className="p-2 border">
                        <button
                            onClick={() => dispatch(deleteTask(task.id))}  // Dispatch with task.id as a string
                            className="bg-red-500 text-white px-2 py-1 rounded focus:ring-2 focus:ring-offset-2 focus:ring-red-400"
                            aria-label={`Delete task: ${task.name}`}
                        >
                            Delete
                        </button>
                        <button
                            onClick={() => openEditModal(task)}
                            className="bg-yellow-500 text-white px-2 py-1 rounded ml-2 focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
                            aria-label={`Edit task: ${task.name}`}
                        >
                            Edit
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default Table;

export {} // This line ensures that the file is treated as a module.
