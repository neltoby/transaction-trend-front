import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		height: '100vh',
		width: '100vw',
		backgroundColor: '#fff',
	},
}));

const LoadingUser = (props) => {
	const cs = useStyles();
	const { name } = props;
	return (
		<Typography component="div" className={cs.loading}>
			Loading {name} data
		</Typography>
	);
};

export default LoadingUser;
