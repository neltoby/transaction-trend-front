import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';

import AppBar from '../appbar';
import { useGlobalStore } from '../../util/store';
import { actionCreator, ALL_USERS } from '../../util/action';

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100vh',
		width: '100vw',
		backgroundColor: '#fff',
	},
	flexContainer: {
		display: 'flex',
		height: 'calc(100vh - 2.5rem)',
	},
}));

const Basic = ({ children }) => {
	const cs = useStyles();
	return (
		<Typography component="div" className={cs.root}>
			<CssBaseline />
			<AppBar />
			<Typography component="div" className={cs.flexContainer}>
				{children}
			</Typography>
		</Typography>
	);
};

const IndexHome = (props) => {
	const cs = useStyles();
	const { sideBar, right } = props;
	const { dispatch } = useGlobalStore();

	const { isLoading, error } = useQuery('allUserData', () =>
		fetch(`${process.env.URL}users`)
			.then((res) => res.json())
			.then((response) => dispatch(actionCreator(ALL_USERS, response)))
	);

	if (isLoading) {
		return (
			<Basic>
				<Typography className={cs.loading}>Loading</Typography>
			</Basic>
		);
	}
	// if (error) {
	// 	return (
	// 		<Basic>
	// 			<Typography className={cs.loading}>An error has occurred: {error.message}</Typography>
	// 		</Basic>
	// 	);
	// }
	return (
		<Basic>
			{sideBar}
			{right}
		</Basic>
	);
};

IndexHome.propTypes = {
	sideBar: PropTypes.elementType.isRequired,
	right: PropTypes.elementType.isRequired,
};

export default IndexHome;
