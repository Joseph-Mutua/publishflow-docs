export const DEFAULT_CHECKLIST_ITEMS = [
	{ id: 'title-reviewed', label: 'Title reviewed', checked: false },
	{ id: 'seo-reviewed', label: 'SEO reviewed', checked: false },
	{ id: 'links-checked', label: 'Links checked', checked: false },
	{ id: 'images-added', label: 'Images added', checked: false },
	{ id: 'compliance-check', label: 'Legal/compliance check', checked: false },
	{ id: 'final-approval', label: 'Final approval', checked: false },
];

export const createChecklistItem = ( label = 'New checklist item' ) => ( {
	id: `checklist-${ Date.now().toString( 36 ) }-${ Math.random()
		.toString( 36 )
		.slice( 2, 8 ) }`,
	label,
	checked: false,
} );
