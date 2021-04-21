import { useEffect } from 'react';

import { actionCreator, CURRENT_USER } from '../../util/action';
import { useGlobalStore } from '../../util/store';
import UserInfo from '../user-info';

const GetUser = () => {
	const {
		state: { allUsers },
		dispatch,
	} = useGlobalStore();
	const currentUser = allUsers[0];

	useEffect(() => {
		dispatch(actionCreator(CURRENT_USER, currentUser));
		return () => {};
	}, []);

	return <UserInfo />;
};

export default GetUser;
