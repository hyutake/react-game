import { json, redirect } from "react-router-dom";
import AuthForm from "../components/AuthForm";

import axios from "axios";

function LoginPage() {
	return <AuthForm />;
}

export default LoginPage;

// To handle form submission
export async function action({ request }) {
	const searchParams = new URL(request.url).searchParams;
	const mode = searchParams.get("mode") || "login";

	if (mode !== "login" && mode !== "signup") {
		throw json({ message: "Unsupported mode!" }, { status: 422 });
	}

	const formData = await request.formData();
	const username = formData.get("username");
	const password = formData.get("password");
    const alias = formData.get("alias");    // will be null for Login

    try {
        const response = await axios.post(
            "http://localhost:4000/auth/" + mode,
            {username, password, alias},
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        // successful response received
        console.log(response);
        if(mode === 'login') {
            const {token, alias} = response.data;
    
            // store token, expiry & alias
            localStorage.setItem("token", token);
            const expiration = new Date();
            expiration.setHours(expiration.getHours() + 1); // 1 hr expiration time
            localStorage.setItem("expiration", expiration);
            localStorage.setItem('alias', alias)
        } else {    // mode === 'signup'
            console.log(response.data.message);
            return redirect('/login/?mode=login');
        }

    } catch(err) {
        if(err.response.status === 422 || err.response.status === 401) {
            return err.response.data;
        } else {
            throw json({message: 'Failed to authenticate user!'}, {status: 500})
        }
    }

	return redirect("/");
}
