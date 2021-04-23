import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';

import { useGlobalStore } from '../../util/store';
import { actionCreator, CLOSE } from '../../util/action';
import DrawerComponent from '../drawer-component';

const useStyles = makeStyles((theme) => ({
	drawerList: {
		width: 400,
	},
	drawer: {
		backgroundColor: '#fff',
		[theme.breakpoints.up('md')]: {
			width: '25%',
		},
	},
}));

const ResponsiveSideBar = () => {
	const cs = useStyles();
	const {
		state: { drawerOpen },
		dispatch,
	} = useGlobalStore();

	return (
		<nav data-testid="nav-id" className={cs.drawer} aria-label="sidebar">
			<Hidden smDown implementation="js">
				{/* hide when its sm to xs */}
				<DrawerComponent modal={false} />
			</Hidden>
			<Hidden mdUp implementation="js">
				<Drawer
					open={drawerOpen}
					onClose={() => dispatch(actionCreator(CLOSE))}
					PaperProps={{ className: cs.drawerList }}
				>
					<DrawerComponent modal={true} />
				</Drawer>
			</Hidden>
		</nav>
	);
};

export default ResponsiveSideBar;
