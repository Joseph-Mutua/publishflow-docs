export const clamp = ( value, minimum, maximum ) =>
	Math.min( Math.max( value, minimum ), maximum );

export const moveListItem = ( items = [], fromIndex, toIndex ) => {
	if (
		fromIndex === toIndex ||
		fromIndex < 0 ||
		toIndex < 0 ||
		fromIndex >= items.length ||
		toIndex >= items.length
	) {
		return items;
	}

	const nextItems = [ ...items ];
	const [ movedItem ] = nextItems.splice( fromIndex, 1 );
	nextItems.splice( toIndex, 0, movedItem );

	return nextItems;
};

export const uniqueById = ( items = [] ) => {
	const seen = new Set();

	return items.filter( ( item ) => {
		if ( ! item?.id || seen.has( item.id ) ) {
			return false;
		}

		seen.add( item.id );
		return true;
	} );
};
