import { makeStyles } from '@material-ui/core/styles';
import { Switch, Route } from 'react-router-dom';

import UserContainer from '../user-container';
import NoUser from '../no-user';

const useStyles = makeStyles((theme) => ({
	content: {
		padding: theme.spacing(3),
		backgroundColor: '#fff',
		[theme.breakpoints.down('md')]: {
			width: '100vw',
		},
		[theme.breakpoints.up('md')]: {
			width: '75%',
		},
	},
}));

const MainBody = () => {
	const cs = useStyles();

	return (
		<main className={cs.content}>
			<Switch>
				<Route
					path="/:id/:name"
					render={({ match }) => {
						const { id, name } = match.params;

						return <UserContainer id={parseInt(id, 10)} name={name} />;
					}}
				/>
				<Route
					path="/"
					exact={true}
					render={({ match }) => {
						return <UserContainer />;
					}}
				/>
				<Route
					path="/*"
					render={({ match }) => {
						return <NoUser />;
					}}
				/>
			</Switch>
		</main>
	);
};

export default MainBody;
