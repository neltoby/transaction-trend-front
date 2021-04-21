import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import Provider from '../provider';
import { initialState } from '../../util/store';
import ResponsiveSideBar from '../responsive-side-bar';
import MainBody from '../main-body';
const Home = lazy(() => import('../../pages'));
const NoPage = lazy(() => import('../../pages/nopage'));

const useStyles = makeStyles(() => ({
	root: {
		width: '100vw',
		height: '100vh',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#f4f5fa',
	},
	loading: {
		color: '#fff',
		backgroundColor: '#fff',
	},
}));

const LoadingComponent = () => {
	const cs = useStyles();
	return (
		<div className={cs.root}>
			<span>
				<CircularProgress className={cs.loading} /> Loading
			</span>
		</div>
	);
};

const App = () => {
	return (
		<Provider initialState={initialState}>
			<Router>
				<Suspense fallback={<LoadingComponent />}>
					<Switch>
						<Route path="/">
							<Home />
						</Route>
						<Route path="*">
							<NoPage />
						</Route>
					</Switch>
				</Suspense>
			</Router>
		</Provider>
	);
};

export default App;
