export const normalizeSearchValue = ( value = '' ) =>
	value.toLowerCase().trim();

export const isResourceVisible = (
	{ activeFilter = 'all', searchTerm = '' },
	{ excerpt = '', terms = [], title = '' }
) => {
	const normalizedTitle = normalizeSearchValue( title );
	const normalizedExcerpt = normalizeSearchValue( excerpt );
	const normalizedSearch = normalizeSearchValue( searchTerm );
	const matchesSearch =
		! normalizedSearch ||
		normalizedTitle.includes( normalizedSearch ) ||
		normalizedExcerpt.includes( normalizedSearch );
	const matchesFilter =
		activeFilter === 'all' || terms.includes( activeFilter );

	return matchesSearch && matchesFilter;
};
