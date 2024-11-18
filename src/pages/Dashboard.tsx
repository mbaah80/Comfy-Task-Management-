import React, { useState, useCallback, Suspense, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {logout} from "../redux/authSlice";

// Lazy loading components
const TaskForm = lazy(() => import('../components/TaskForm'));
const TaskList = lazy(() => import('../components/TaskList'));
const TaskFilter = lazy(() => import('../components/TaskFilter'));

const Dashboard: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const dispatch = useDispatch();

    // Memoize modal open/close functions to avoid re-creations on each render
    const openModal = useCallback(() => setIsModalOpen(true), []);
    const closeModal = useCallback(() => setIsModalOpen(false), []);

    const handleLogout = () => {
        dispatch(logout());
        window.location.href = '/'; // Redirect to login page after
    };

    const toggleTheme = () => setIsDarkMode((prev) => !prev);

    return (
        <div className={`${isDarkMode ? 'dark' : ''}`}>
            <div
                className="container mx-auto px-4 py-8 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen">
                {/* Header Section */}
                <header className="flex flex-col sm:flex-row justify-between items-start mb-6">
                    <h1 className="text-2xl font-bold">Task Management Dashboard</h1>
                    <div className="flex flex-col sm:flex-row items-start space-y-2 sm:space-y-0 sm:space-x-4">
                        <button
                            onClick={toggleTheme}
                            className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded focus:outline-none"
                        >
                            {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                        </button>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
                        >
                            Logout
                        </button>
                    </div>
                </header>


                {/* Main Content */}
                <main>
                    {/* Filters and Add Task Section */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                        {/* Task Filters */}
                        <section className="w-full md:w-auto">
                            <h2 className="text-xl font-semibold mb-2">Filter Tasks</h2>
                            <Suspense fallback={<div>Loading Task Filter...</div>}>
                                <TaskFilter/>
                            </Suspense>
                        </section>

                        {/* Add Task Button */}
                        <section>
                            <button
                                onClick={openModal}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
                            >
                                Add New Task
                            </button>
                        </section>
                    </div>

                    {/* Task List */}
                    <section>
                        <h2 className="text-xl font-semibold mb-4">Your Tasks</h2>
                        <Suspense fallback={<div>Loading Tasks...</div>}>
                            <TaskList/>
                        </Suspense>
                    </section>
                </main>

                {/* Modal for Adding a Task */}
                {isModalOpen && (
                    <div
                        role="dialog"
                        aria-labelledby="add-task-title"
                        aria-modal="true"
                        className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50"
                    >
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md relative">
                            <h2 id="add-task-title" className="text-xl font-semibold mb-4">
                                Add a New Task
                            </h2>
                            <Suspense fallback={<div>Loading Task Form...</div>}>
                                <TaskForm/>
                            </Suspense>
                            <button
                                onClick={closeModal}
                                aria-label="Close Add Task Modal"
                                className="absolute top-2 right-2 text-gray-800 dark:text-gray-200 font-bold"
                            >
                                ×
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
