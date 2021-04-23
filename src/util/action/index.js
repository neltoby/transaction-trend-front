export const actionCreator = (type, payload = null) => {
	console.log(type, payload);
	return payload === null
		? {
				type,
		  }
		: {
				type,
				payload,
		  };
};

export const OPEN = 'OPEN';
export const CLOSE = 'CLOSE';
export const TREND = 'TREND';
export const ALL_USERS = 'ALL_USERS';
export const CURRENT_USER = 'CURENT_USER';
export const USERS_LIKE_CURRENT_USER = 'USERS_LIKE_CURRENT_USER';
