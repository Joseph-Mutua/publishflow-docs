export const DEFAULT_FOOTNOTES = [
	{
		id: 'source-1',
		label: 'Source 1',
		citation: 'Primary reference or supporting source.',
		url: '',
	},
	{
		id: 'source-2',
		label: 'Source 2',
		citation: 'Follow-up context, dataset, or related documentation.',
		url: '',
	},
];

export const createFootnoteItem = ( label = 'New source' ) => ( {
	id: `footnote-${ Date.now().toString( 36 ) }-${ Math.random()
		.toString( 36 )
		.slice( 2, 8 ) }`,
	label,
	citation: '',
	url: '',
} );
