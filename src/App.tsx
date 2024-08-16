import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import { Home } from '@pages/home/Home';
import { Root } from '@root/Root';

function App() {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <Root />,
			errorElement: <div>404 not found</div>,
			children: [
				{
					index: true,
					element: <Home />,
				},
			],
		},
	]);

	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

export default App;
