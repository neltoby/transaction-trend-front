import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles } from '@material-ui/core/styles';
import { IoMdMenu } from 'react-icons/io';
import { IconContext } from 'react-icons';

import { actionCreator, OPEN, CLOSE } from '../../util/action';
import { useGlobalStore } from '../../util/store';

const useStyles = makeStyles((theme) => ({
	appbar: {
		display: 'flex',
		justifyContent: 'flex-start',
		alignItems: 'center',
		width: '100vw',
		height: '2.5rem',
		backgroundColor: '#423c68',
	},
	icon: {
		marginLeft: theme.spacing(3),
	},
}));

const AppBar = () => {
	const cs = useStyles();
	const {
		state: { drawerOpen },
		dispatch,
	} = useGlobalStore();

	const dispatchFxn = () => {
		const val = drawerOpen ? CLOSE : OPEN;
		dispatch(actionCreator(val));
	};
	return (
		<Typography data-testid="appbar" className={cs.appbar}>
			<Hidden mdUp implementation="js">
				<span className={cs.icon} onClick={dispatchFxn}>
					<IconContext.Provider value={{ size: '1rem', color: '#fff' }}>
						<IoMdMenu />
					</IconContext.Provider>
				</span>
			</Hidden>
		</Typography>
	);
};

export default AppBar;
