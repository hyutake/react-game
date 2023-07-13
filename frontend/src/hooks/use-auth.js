import axios from "axios";
import { useCallback, useState } from "react";
import useLocalStorage from "./use-local-storage";

const useAuth = () => {
	const [user, setUser] = useLocalStorage("user", null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	// data: {username, password}
	const login = async (data) => {
		try {
			setLoading(true);
            const response = await axios.post(
				"http://localhost:4000/auth/login",
				data,
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			setUser({
				...response.data,
			}); // will be {token, alias, id} from backend
			console.log("Login successful!");
		} catch (err) {
			setError(err.response.data);
            throw err;  // pass the error to the caller function
		} finally {
            setLoading(false);
        }
	};

	// data: {username, password, alias}
	const signup = async (data) => {
		try {
			setLoading(true);
            const response = await axios.post(
				"http://localhost:4000/auth/signup",
				data,
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
            console.log(response.data);
		} catch (err) {
			setError(err.response.data);
            throw err;
		} finally {
            setLoading(false);
        }
	};

	const logout = useCallback(() => {
		setUser(null);
        console.log("Logged out!");
	}, [setUser]);

	return {
		user,
		error,
		loading,
		login,
		signup,
		logout,
	};
};

export default useAuth;
