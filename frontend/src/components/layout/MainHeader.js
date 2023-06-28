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
							<button>Test Page</button>
						</Link>
					</li>
					{!token && <li>
						<Link to="/login/?mode=login">
							<button>Login</button>
						</Link>
					</li>}
					{token && <li>
						<Form action="/logout" method="post">
							<button>Logout</button>
						</Form>
					</li>}
				</ul>
			</nav>
		</header>
	);
}

export default MainHeader;
