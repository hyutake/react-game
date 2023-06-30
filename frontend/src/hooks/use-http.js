import { useCallback, useState } from "react";
import axios from "axios";

const useHttp = () => {
	/*
        requestConfig: to configure the request that's being sent
        {
            url: '<backend_url>'
			method: '<http_req_method>'
            data: {<data>}
            headers: {<request_headers>}
        }
        applyData: callback function to work with the response data
    */
	const [error, setError] = useState(null);
	const sendRequest = useCallback((requestConfig, applyData) => {
		// console.log(requestConfig);
		// console.log(applyData);
		if (requestConfig.method === "GET") {
			axios
				.get(requestConfig.url, {
                    headers: requestConfig.headers
                })
				.then((response) => {
					console.log(response.data);
                    applyData(response.data);
				})
				.catch((err) => {
                    console.error(err);
					setError(err.response.data || "Error occured in GET request");
				});
		} else if (requestConfig.method === "POST") {
			axios.post(requestConfig.url, requestConfig.data, {
				headers: requestConfig.headers
			}).then(response => {
                console.log(response.data);
                applyData(response.data);
            }).catch(err => {
                console.error(err);
                setError(err.response.data || 'Error occured in POST request')
            })
		} else if (requestConfig.method === "PATCH") {
			axios.patch(requestConfig.url, requestConfig.data, {
				headers: requestConfig.headers
			}).then(response => {
                console.log(response.data);
                applyData(response.data);
            }).catch(err => {
                console.error(err);
                setError(err.response.data || 'Error occured in PATCH request')
            })
		}
	}, []);

	return {
		error,
		sendRequest,
	};
};

export default useHttp;
