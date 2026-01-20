export const clamp = ( value, minimum, maximum ) =>
	Math.min( Math.max( value, minimum ), maximum );

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
