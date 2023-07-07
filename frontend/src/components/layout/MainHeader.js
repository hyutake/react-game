// import classes from './MainHeader.module.css';
import { Link } from "react-router-dom";
import { useAuthContext } from "../../store/auth-context";

function MainHeader() {
	const { user, logout } = useAuthContext();

	function logoutHandler() {
		const proceed = window.confirm("Logout?");
		if(proceed)	logout();
	}

	const authBtnDisplay = user ? (
		<li>
			<button onClick={logoutHandler} className="p-1">Logout</button>
		</li>
	) : (
		<li>
			<Link to="/login/?mode=login">
				<button className="p-1">Login</button>
			</Link>
		</li>
	);
	return (
		<header className="max-w-7xl mx-auto p-8 flex justify-between border rounded-xl border-gray-300">
			<h1 className="text-4xl font-bold">
				<Link to="/">リアクト ゲイム</Link>
			</h1>
			<nav>
				<ul className="flex gap-4">
					<li>
						<Link to="/test">
							<button className="p-1">Test Page</button>
						</Link>
					</li>
					{authBtnDisplay}
				</ul>
			</nav>
		</header>
	);
}

export default MainHeader;
