import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { useGlobalStore } from '../../util/store';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		justifyContent: 'center',
	},
	container: {
		display: 'flex',
		width: '60%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	paper: {
		textTransform: 'uppercase',
	},
	del: {
		textDecorationStyle: 'double',
	},
}));

const PaperComponent = (props) => {
	const cs = useStyles();
	const { top, amount } = props;

	return (
		<Paper elevation={2} className={cs.paper}>
			<p>{top}</p>
			<p>
				<del className={cs.del}>N</del>
				<span>{amount}</span>
			</p>
		</Paper>
	);
};

PaperComponent.propTypes = {
	top: PropTypes.string.isRequired,
	amount: PropTypes.number.isRequired,
};

const Transaction = () => {
	const cs = useStyles();
	const {
		state: { currentUser },
	} = useGlobalStore();
	const { spent, income, transaction } = currentUser;

	return (
		<Typography component="div" className={cs.root}>
			<Typography component="div" className={cs.container}>
				<PaperComponent top="total spent" amount={spent} />
				<PaperComponent top="total income" amount={income} />
				<PaperComponent top="transactions" amount={transaction} />
			</Typography>
		</Typography>
	);
};

export default Transaction;
