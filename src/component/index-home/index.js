import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';

import AppBar from '../appbar';
import { useGlobalStore } from '../../util/store';
import { actionCreator, ALL_USERS } from '../../util/action';
import isJson from '../../util/isjson';

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
	loading: {
		width: '100vw',
		height: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
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
	const { state, dispatch } = useGlobalStore();

	const { data, isLoading, error } = useQuery('allUserData', () => {
		if (state.allUsers.length) {
			return Promise.resolve(state.allUsers);
		}
		fetch(`${process.env.REACT_APP_URL}user`)
			.then((res) => res.json())
			.then((response) => {
				console.log(response);
				const {
					data: { all_user },
				} = response;

				dispatch(actionCreator(ALL_USERS, isJson(all_user)));
				return all_user;
			});
	});

	if (isLoading || !state.allUsers.length) {
		return (
			<Basic>
				<Typography className={cs.loading}>Loading</Typography>
			</Basic>
		);
	}
	if (error) {
		return (
			<Basic>
				<Typography className={cs.loading}>
					An error has occurred: {error.message}
				</Typography>
			</Basic>
		);
	}
	return (
		<Basic>
			<>
				{sideBar}
				{right}
			</>
		</Basic>
	);
};

IndexHome.propTypes = {
	sideBar: PropTypes.element.isRequired,
	right: PropTypes.element.isRequired,
};

export default IndexHome;
