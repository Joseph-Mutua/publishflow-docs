import { isResourceVisible, normalizeSearchValue } from './resource-matching';

describe( 'normalizeSearchValue', () => {
	it( 'normalizes casing and whitespace', () => {
		expect( normalizeSearchValue( '  Editorial Flow  ' ) ).toBe(
			'editorial flow'
		);
	} );
} );

describe( 'isResourceVisible', () => {
	const resource = {
		excerpt: 'Learn how to ship cleaner Gutenberg releases.',
		terms: [ 'gutenberg', 'workflow' ],
		title: 'Editorial release checklist',
	};

	it( 'matches against search text', () => {
		expect(
			isResourceVisible(
				{ activeFilter: 'all', searchTerm: 'release' },
				resource
			)
		).toBe( true );
	} );

	it( 'matches against a selected filter', () => {
		expect(
			isResourceVisible(
				{ activeFilter: 'workflow', searchTerm: '' },
				resource
			)
		).toBe( true );
	} );

	it( 'hides resources when the filter does not match', () => {
		expect(
			isResourceVisible(
				{ activeFilter: 'commerce', searchTerm: '' },
				resource
			)
		).toBe( false );
	} );
} );
