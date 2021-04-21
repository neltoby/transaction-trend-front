import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import Dot from '../dot';
import Time from '../timer';
import { useGlobalStore } from '../../util/store';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		justifyContent: 'space-between',
		width: '40%',
	},
	heading: {
		textTransform: 'uppercase',
		marginTop: theme.spacing(2),
		fontWeight: 'bold',
	},
}));

const UsersLike = () => {
	const cs = useStyles();
	const {
		state: {
			currentUser: { name, usersLike },
		},
	} = useGlobalStore;

	if (!usersLike.length) return null;

	return (
		<Typography component="div" className={cs.root}>
			<Typography component="div" className={cs.heading}>
				USERS LIKE "{name}"
			</Typography>
			<Typography compoent="div" className="list">
				<List className={cs.listRoot}>
					{usersLike.map((item, i) => {
						return (
							<ListItem alignItems="flex-start">
								<ListItemAvatar>
									<Avatar src={item.avatar} />
								</ListItemAvatar>
								<ListItemText
									primary={<span className={cs.name}>{item.name}</span>}
									secondary={
										<>
											<Typography
												component="span"
												className={cs.inline}
												color="textPrimary"
											>
												{item.transaction} Transactions
											</Typography>
											<Dot color="#ddd" />
											Joined <Time date={item.created_at} />
										</>
									}
								/>
							</ListItem>
						);
					})}
				</List>
			</Typography>
		</Typography>
	);
};

export default UsersLike;
