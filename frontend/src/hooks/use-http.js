import { useCallback, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../store/auth-context";

const useHttp = () => {
	/*
        requestConfig: to configure the request that's being sent
        {
            url: '<backend_url>'
			method: '<http_req_method>'
            data: {<data>}
            token: <token>
        }
        applyData: callback function to work with the response data 
    */
	const [error, setError] = useState(null);
	const {logout} = useAuthContext();
	const sendRequest = useCallback((requestConfig, applyData) => {
		if (requestConfig.method === "GET") {
			axios
				.get(requestConfig.url, {
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${requestConfig.token}`
					}
				})
				.then((response) => {
					// console.log(response.data);
					applyData(response.data);
				})
				.catch((err) => {
					console.error(err);
					setError(
						err.response.data || "Error occured in GET request"
					);
				});
		} else if (requestConfig.method === "POST") {
			axios
				.post(requestConfig.url, requestConfig.data, {
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${requestConfig.token}`
					}
				})
				.then((response) => {
					// console.log(response.data);
					applyData(response.data);
				})
				.catch((err) => {
					console.error(err);
					setError(
						err.response.data || "Error occured in POST request"
					);
					// TESTING TOKEN EXPIRATION!!!
					console.log('Token expired!');
					logout();
				});
		}
	}, [logout]);

	return {
		error,
		sendRequest,
	};
};

export default useHttp;
