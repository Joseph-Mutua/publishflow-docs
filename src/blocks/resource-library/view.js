import { getContext, getElement, store } from '@wordpress/interactivity';

import {
	isResourceVisible,
	normalizeSearchValue,
} from '../../shared/resource-matching';

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
			const terms = ( ref?.dataset?.resourceTerms || '' )
				.split( ' ' )
				.filter( Boolean );

			return ! isResourceVisible(
				{
					activeFilter: context.activeFilter,
					searchTerm: context.searchTerm,
				},
				{
					excerpt: ref?.dataset?.resourceExcerpt || '',
					terms,
					title: ref?.dataset?.resourceTitle || '',
				}
			);
		},
	},
	actions: {
		updateSearch( event ) {
			const context = getContext();
			context.searchTerm = normalizeSearchValue(
				event.target.value || ''
			);
		},
		setFilter( event ) {
			const context = getContext();
			context.activeFilter =
				event.currentTarget.dataset.filterValue || 'all';
		},
	},
} );
