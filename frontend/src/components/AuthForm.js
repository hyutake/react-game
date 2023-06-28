import {
	Form,
	Link,
	useSearchParams,
	useActionData,
	useNavigation,
} from "react-router-dom";

import classes from "./AuthForm.module.css";

function AuthForm() {
	const [searchParams] = useSearchParams();
	const actionData = useActionData();		// receives error responses of status 422 & 401 from backend (if any)
	const navigation = useNavigation();
	// retrieving the set query parameter (assume that its either login or signup only)
	const isLogin = searchParams.get("mode") === "login";
	
	const btnText = isLogin ? "Login" : 'Create account';

	const isSubmitting = navigation.state === "submitting";

	return (
		<>
			<Form method="post" className={classes.form}>
				<h1>{isLogin ? "Log in" : "Create a new user"}</h1>
				{actionData && actionData.errors && (
					<ul>
						{Object.values(actionData.errors).map((err) => {
							return <li key={err}>{err}</li>;
						})}
					</ul>
				)}
				{actionData && actionData.message && (
					<p>{actionData.message}</p>
				)}
				{!isLogin && <p>
					<label htmlFor="alias">Alias</label>
					<input id="alias" type="text" name="alias" />
				</p>}
				<p>
					<label htmlFor="username">Username</label>
					<input id="username" type="text" name="username" required />
				</p>
				<p>
					<label htmlFor="password">Password</label>
					<input
						id="password"
						type="password"
						name="password"
						required
					/>
				</p>
				<div className={classes.actions}>
					<Link to={`?mode=${isLogin ? "signup" : "login"}`}>
						{isLogin ? "Create new user" : "Cancel"}
					</Link>
					<button disabled={isSubmitting}>
						{isSubmitting ? "Submitting..." : btnText}
					</button>
				</div>
			</Form>
		</>
	);
}

export default AuthForm;
