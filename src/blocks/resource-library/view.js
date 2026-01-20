import { getContext, getElement, store } from '@wordpress/interactivity';

const normalize = ( value = '' ) => value.toLowerCase().trim();

store( 'publishflow/resource-library', {
	state: {
		get isCurrentFilter() {
			const context = getContext();
			const { ref } = getElement();
			const filterValue = ref?.dataset?.filterValue || 'all';

			return context.activeFilter === filterValue;
		},
		get isResourceHidden() {
			const context = getContext();
			const { ref } = getElement();
			const title = normalize( ref?.dataset?.resourceTitle || '' );
			const excerpt = normalize( ref?.dataset?.resourceExcerpt || '' );
			const searchValue = normalize( context.searchTerm );
			const terms = ( ref?.dataset?.resourceTerms || '' )
				.split( ' ' )
				.filter( Boolean );
			const matchesSearch =
				! searchValue ||
				title.includes( searchValue ) ||
				excerpt.includes( searchValue );
			const matchesFilter =
				context.activeFilter === 'all' ||
				terms.includes( context.activeFilter );

			return ! ( matchesSearch && matchesFilter );
		},
	},
	actions: {
		updateSearch( event ) {
			const context = getContext();
			context.searchTerm = event.target.value || '';
		},
		setFilter( event ) {
			const context = getContext();
			context.activeFilter =
				event.currentTarget.dataset.filterValue || 'all';
		},
	},
} );
