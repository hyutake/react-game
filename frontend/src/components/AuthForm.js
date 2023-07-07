import {
	Link,
	useSearchParams,
	useNavigate,
} from "react-router-dom";
import { useAuthContext } from "../store/auth-context";

// import classes from "./AuthForm.module.css";

function AuthForm() {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const {error, loading, login, signup} = useAuthContext();
	// retrieving the set query parameter (assume that its either login or signup only)
	const isLogin = searchParams.get("mode") === "login";
	
	const btnText = isLogin ? "Login" : 'Create account';

	// Issue: errors in login still result in a navigation when I don't want it to happen :/
	async function submitHandler(event) {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const username = formData.get("username");
		const password = formData.get("password");
		if(isLogin) {
			login({ username, password }).then(() => {
				navigate('/');
			}).catch(err => {
				console.error(err);
			});
		} else {
			const alias = formData.get("alias");
			signup({ username, password, alias }).then(() => {
				navigate('/login?mode=login');
			}).catch(err => {
				console.error(err);
			});
		}		
	}

	return (
		<> 
			<form onSubmit={submitHandler} className="w-full max-w-2xl my-8 mx-auto">
				<h1 className="text-4xl font-bold p-4">{isLogin ? "Log in" : "Sign up"}</h1>
				{error && error.errors && (
					<ul>
						{Object.values(error.errors).map((err) => {
							return <li key={err}>{err}</li>;
						})}
					</ul>
				)}
				{error && error.message && (
					<p>{error.message}</p>
				)}
				{!isLogin && <p className="mb-2">
					<label htmlFor="alias" className="w-full block font-semibold">Alias</label>
					<input className="w-full block p-1 rounded" id="alias" type="text" name="alias" />
				</p>}
				<p className="mb-2">
					<label className="w-full block font-semibold" htmlFor="username">Username</label>
					<input className="w-full block p-1 rounded text-center" id="username" type="text" name="username" required />
				</p>
				<p className="mb-2">
					<label className="w-full block font-semibold" htmlFor="password">Password</label>
					<input
						className="w-full block p-1 rounded text-center"
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
					<button className="py-2 px-6 rounded bg-zinc-200 text-zinc-900" disabled={loading}>
						{loading ? "Submitting..." : btnText}
					</button>
				</div>
			</form>
		</>
	);
}

export default AuthForm;
