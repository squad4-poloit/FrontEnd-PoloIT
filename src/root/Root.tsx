import { Footer } from '@components/organisms/footer/Footer';
import { Header } from '@components/organisms/header/Header';
import { Outlet } from 'react-router-dom';

export const Root = () => {
	return (
		<>
			<Header />
			<main>
				<Outlet />
			</main>
			<Footer />
		</>
	);
};
