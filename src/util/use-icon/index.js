import { useEffect } from 'react';
import { GiCommercialAirplane, GiForkKnifeSpoon } from 'react-icons/gi';
import { AiFillGift } from 'react-icons/ai';
import { IoHome } from 'react-icons/io5';

import { useGlobalStore } from '../store';

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

function useIcon(data) {
	const {
		state: { curentUser },
	} = useGlobalStore();

	const icons = data.map((item, i) => {
		return selectIcon(item);
	});

	return icons;
}

export default useIcon;
