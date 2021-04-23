import { createContext, useContext } from 'react';

export const Store = createContext();

export const useGlobalStore = () => useContext(Store);

export const initialState = {
	allUsers: [],
	currentUser: {},
	usersLikeCurrentUser: [],
	drawerOpen: false,
	trend: [],
};
