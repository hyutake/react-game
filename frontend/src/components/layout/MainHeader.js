// import classes from './MainHeader.module.css';
import { Link, Form, useRouteLoaderData } from "react-router-dom";

function MainHeader() {
	const token = useRouteLoaderData('root');
	return (
		<header className="max-w-7xl mx-auto p-8 flex justify-between">
			<h1 className="text-4xl font-bold">
				<Link to="/">リアクト ゲイム</Link>
			</h1>
			<nav>
				<ul className="flex gap-4">
					<li>
						<Link to='/test'>
							<button className="p-1">Test Page</button>
						</Link>
					</li>
					{!token && <li>
						<Link to="/login/?mode=login">
							<button className="p-1">Login</button>
						</Link>
					</li>}
					{token && <li>
						<Form action="/logout" method="post">
							<button className="p-1">Logout</button>
						</Form>
					</li>}
				</ul>
			</nav>
		</header>
	);
}

export default MainHeader;
