import React, { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../redux/taskSlice';
import { RootState } from '../redux/store';

const TaskFilter: React.FC = () => {
    const dispatch = useDispatch();
    const { filter } = useSelector((state: RootState) => state.tasks);

    // Use useCallback to memoize the change handlers to avoid re-creations on every render
    const handleStatusChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setFilter({ ...filter, status: e.target.value as 'All' | 'Pending' | 'Completed' }));
    }, [dispatch, filter]);

    const handlePriorityChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setFilter({ ...filter, priority: e.target.value as 'All' | 'Low' | 'Medium' | 'High' }));
    }, [dispatch, filter]);

    return (
        <div className="flex flex-wrap items-center gap-4 mb-4">
            <div>
                <label htmlFor="status" className="block mb-1">Filter by Status:</label>
                <select
                    id="status"
                    value={filter.status}
                    onChange={handleStatusChange}
                    className="border p-2 rounded"
                >
                    <option value="All">All</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>

            <div>
                <label htmlFor="priority" className="block mb-1">Filter by Priority:</label>
                <select
                    id="priority"
                    value={filter.priority}
                    onChange={handlePriorityChange}
                    className="border p-2 rounded"
                >
                    <option value="All">All</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </div>
        </div>
    );
};

// Wrap the component in React.memo to prevent unnecessary re-renders
export default memo(TaskFilter);
