import {
	Form,
	Link,
	useSearchParams,
	useActionData,
	useNavigation,
} from "react-router-dom";

// import classes from "./AuthForm.module.css";

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
			<Form method="post" className="w-full max-w-2xl my-8 mx-auto">
				<h1 className="text-4xl font-bold p-4">{isLogin ? "Log in" : "Sign up"}</h1>
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
				{!isLogin && <p className="mb-2">
					<label htmlFor="alias" className="w-full block">Alias</label>
					<input className="w-full block p-1 rounded" id="alias" type="text" name="alias" />
				</p>}
				<p className="mb-2">
					<label className="w-full block" htmlFor="username">Username</label>
					<input className="w-full block p-1 rounded" id="username" type="text" name="username" required />
				</p>
				<p className="mb-2">
					<label className="w-full block" htmlFor="password">Password</label>
					<input
						className="w-full block p-1 rounded"
						id="password"
						type="password"
						name="password"
						required
					/>
				</p>
				<div className="flex items-center justify-end gap-4">
					<Link className=" hover:text-amber-300" to={`?mode=${isLogin ? "signup" : "login"}`}>
						{isLogin ? "Create new user" : "Cancel"}
					</Link>
					<button className="py-2 px-6 rounded bg-zinc-200 text-zinc-900" disabled={isSubmitting}>
						{isSubmitting ? "Submitting..." : btnText}
					</button>
				</div>
			</Form>
		</>
	);
}

export default AuthForm;
