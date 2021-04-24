import { useMemo, useState } from 'react';
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
import { actionCreator, CLOSE } from '../../util/action';

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
		overflowY: 'scroll',
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
		position: 'relative !important',
	},
	list: {
		width: drawerWidth,
		color: '#637381',
	},
	listText: {
		paddingLeft: 0,
		marginLeft: 0,
		'& span': {
			fontWeight: 500,
			fontSize: '0.8rem',
		},
	},
	secondary: {
		fontSize: '0.5rem !important',
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
	const style = useMemo(() => ({ fontSize: '0.5rem' }), []);
	const [visibility, setVisibility] = useState(
		[].fill(false, 0, allUsers.length)
	);

	const currentUserFxn = (data) => {
		const { id, name } = data;
		history.push(`/${id}/${name}`);
		modal && dispatch(actionCreator(CLOSE));
	};

	const toggleVisibility = (id) => {
		const newVisibility = visibility.slice();
		newVisibility[id] = !newVisibility[id];
		setVisibility(newVisibility);
	};

	return (
		<div data-testid="drawer" className={cs.drawerContainer}>
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
						onMouseOver={() => toggleVisibility(index)}
						onMouseOut={() => toggleVisibility(index)}
					>
						<ListItemAvatar className={cs.listIcon}>
							<Avatar alt={item.name} src={item.avatar} />
						</ListItemAvatar>
						<ListItemText
							className={cs.listText}
							primary={<span>{item.name}</span>}
							secondary={
								<>
									<span className={cs.secondary}>
										{item.transactions} Transactions
										<Dot color="#aaa" /> Joined{' '}
										<Time date={item.created_at} style={style} />
									</span>
								</>
							}
						/>

						<ListItemSecondaryAction>
							{visibility[index] ? (
								<IconContext.Provider
									value={{ size: '0.7em', className: cs.icons }}
								>
									<IoIosArrowForward />
								</IconContext.Provider>
							) : null}
						</ListItemSecondaryAction>
					</ListItem>
				))}
			</List>
		</div>
	);
};

DrawerComponent.propTypes = {
	modal: PropTypes.bool.isRequired,
};

export default DrawerComponent;
