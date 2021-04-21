import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { IconContext } from 'react-icons';
import { GiCommercialAirplane, GiForkKnifeSpoon } from 'react-icons/gi';
import { AiFillGift } from 'react-icons/ai';
import { IoHome } from 'react-icons/io5';

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

const selectIcon = (type) => {
	switch (type) {
		case 'travel':
			return <GiCommercialAirplane />;
		case 'gift':
			return <AiFillGift />;
		case 'dinner':
			return <GiForkKnifeSpoon />;
		default:
			return <IoHome />;
	}
};

const Expenses = () => {
	const cs = useStyles();
	const {
		state: {
			currentUser: { expenses },
		},
	} = useGlobalStore();
	const icons = expenses.map((item, i) => {
		return selectIcon(item);
	});
	return (
		<Typography component="Typography" className={cs.root}>
			<Typography component="div" className={cs.heading}>
				Recurring expenses
			</Typography>
			<Typography compoent="div" className="div">
				<IconContext.Provider value={{ color: 'black', className: cs.icons }}>
					{icons.map((item, i) => {
						return <span className={cs.button}>{item}</span>;
					})}
				</IconContext.Provider>
			</Typography>
		</Typography>
	);
};

export default Expenses;
