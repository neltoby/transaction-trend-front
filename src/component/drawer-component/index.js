import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { IoIosArrowForward } from 'react-icons/io';
import { IconContext } from 'react-icons';
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import Dot from '../dot';
import { Time } from '../timer';
import { useGlobalStore } from '../../util/store';
import { actionCreator, CURRENT_USER, CLOSE } from '../../util/action';

const drawerWidth = '100%';
const drawerHeight = 'calc(100vh - 2.5rem)';

const useStyles = makeStyles((theme) => ({
	drawerContainer: {
		height: drawerHeight,
		display: 'flex',
		width: drawerWidth,
		backgroundColor: '#fff',
		flexDirection: 'column',
		justifyContent: 'space-between',
		borderRight: '1px solid #ccc',
	},
	drawer: {
		backgroundColor: '#fff',
		[theme.breakpoints.up('md')]: {
			width: '20%',
		},
	},
	header: {
		textTransform: 'uppercase',
		fontWeight: 'bold',
	},
	list: {
		width: drawerWidth,
		// height: drawerHeight,
		color: '#637381',
		'& :hover': {
			borderRight: '4px solid #4d8ef4',
			'& .MuiListItemText-root': {
				borderRight: 'none',
				color: '#4d8ef4',
				'& :hover': {
					borderRight: 'none',
				},
				'& span': {
					fontWeight: 600,
				},
			},
			'& .MuiListItemIcon-root': {
				borderRight: 'none',
				color: '#4d8ef4',
				'& :hover': {
					borderRight: 'none',
				},
			},
		},
	},
	listText: {
		paddingLeft: 0,
		marginLeft: 0,
		'& span': {
			fontWeight: 500,
			fontSize: '0.8rem',
		},
	},
}));

const DrawerComponent = (props) => {
	const { modal } = props;
	const cs = useStyles();
	const {
		state: { allUsers },
		dispatch,
	} = useGlobalStore();
	const history = useHistory();
	const style = useMemo(() => ({ fontSize: '0.4rem' }), []);

	const currentUserFxn = (data) => {
		const { id, name } = data;
		dispatch(actionCreator(CURRENT_USER, data));
		history.push(`/${id}/${name}`);
		modal && dispatch(actionCreator(CLOSE));
	};

	return (
		<div data-testid="drawer" className={cs.drawerContainer}>
			<IconContext.Provider value={{ size: '1.8em', className: cs.icons }}>
				<List
					className={cs.list}
					aria-labelledby="nested-list-subheader"
					subheader={
						<ListSubheader
							className={cs.header}
							component="div"
							id="nested-list-subheader"
						>
							Users
						</ListSubheader>
					}
				>
					{allUsers.map((item, index) => (
						<ListItem
							button
							key={`${item.id}${index}`}
							onClick={() => currentUserFxn(item)}
						>
							<ListItemAvatar className={cs.listIcon}>
								<Avatar alt={item.name} src={'/static/images/avatar/2.jpg'} />
							</ListItemAvatar>
							<ListItemText
								className={cs.listText}
								primary={<span>{item.name}</span>}
								secondary={
									<>
										{item.transaction} <Dot color="#fff" /> Joined{' '}
										<Time date={item.created_at} style={style} />
									</>
								}
							></ListItemText>
							<ListItemSecondaryAction>
								<IoIosArrowForward />
							</ListItemSecondaryAction>
						</ListItem>
					))}
				</List>
			</IconContext.Provider>
		</div>
	);
};

DrawerComponent.propTypes = {
	modal: PropTypes.bool.isRequired,
};

export default DrawerComponent;
