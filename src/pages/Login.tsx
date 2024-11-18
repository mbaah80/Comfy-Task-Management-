import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../redux/authSlice';
import { RootState } from '../redux/store';
import { v4 as uuid } from 'uuid';

const Login = () => {
    const dispatch = useDispatch();
    const token = useSelector((state: RootState) => state.auth.token);
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    const handleLogin = () => {
        dispatch(login(uuid())); // Generate a random token for demonstration
        window.location.href = '/dashboard'; // Redirect to dashboard after login
    };



    return (
        <div>
            {!isAuthenticated && (
                <div className="flex flex-col items-center justify-center h-screen">
                    <p>Please log in</p>
                    <button
                        className="border border-gray-300 rounded-md px-4 py-2 bg-blue-500 text-white"
                        onClick={handleLogin}>Login</button>
                </div>
            )}
        </div>
    );
};

export default Login;
