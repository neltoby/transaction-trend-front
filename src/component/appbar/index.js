import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	appbar: {
		width: '100vw',
		height: '2.5rem',
		backgroundColor: '#423c68',
	},
});

const AppBar = () => {
	const cs = useStyles();
	return <Typography data-testid="appbar" className={cs.appbar}></Typography>;
};

export default AppBar;
