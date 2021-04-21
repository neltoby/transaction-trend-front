import {
	ALL_USERS,
	CURRENT_USER,
	USERS_LIKE_CURRENT_USER,
	CLOSE,
	OPEN,
} from '../action';

export const reducer = (state, action) => {
	const { type } = action;

	switch (type) {
		case ALL_USERS:
			const { payload } = action;
			return {
				...state,
				allUSers: payload,
			};
		case CURRENT_USER:
			return {
				...state,
				currentUser: payload,
			};
		case USERS_LIKE_CURRENT_USER:
			return {
				...state,
				usersLikeCurrentUser: payload,
			};
		case CLOSE:
			return {
				...state,
				drawerOpen: false,
			};
		case OPEN:
			return {
				...state,
				drawerOpen: true,
			};
		default:
			return {
				...state,
			};
	}
};
