import { QueryClient, QueryClientProvider } from 'react-query';

import IndexHome from '../component/index-home';
import ResponsiveSideBar from '../component/responsive-side-bar';
import MainBody from '../component/main-body';

const queryClient = new QueryClient();

const Home = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<IndexHome sideBar={<ResponsiveSideBar />} right={<MainBody />} />
		</QueryClientProvider>
	);
};

export default Home;
