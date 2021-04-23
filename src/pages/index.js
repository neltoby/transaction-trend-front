import { QueryClient, QueryClientProvider } from 'react-query';

import IndexHome from '../component/index-home';
import ResponsiveSideBar from '../component/responsive-side-bar';
import MainBody from '../component/main-body';
import ErrorBoundary from '../component/errorboundary';

const queryClient = new QueryClient();

const Home = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<IndexHome
				sideBar={
					<ErrorBoundary fallback={<h4>Could not load page</h4>}>
						<ResponsiveSideBar />
					</ErrorBoundary>
				}
				right={
					<ErrorBoundary fallback={<h4>Could not load page</h4>}>
						<MainBody />
					</ErrorBoundary>
				}
			/>
		</QueryClientProvider>
	);
};

export default Home;
