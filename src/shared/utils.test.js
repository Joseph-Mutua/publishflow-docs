import { moveListItem } from './utils';

describe( 'moveListItem', () => {
	it( 'moves an item forward in the array', () => {
		expect( moveListItem( [ 'a', 'b', 'c' ], 0, 2 ) ).toEqual( [
			'b',
			'c',
			'a',
		] );
	} );

	it( 'returns the original array when the move is invalid', () => {
		const original = [ 'a', 'b', 'c' ];

		expect( moveListItem( original, -1, 2 ) ).toEqual( original );
	} );
} );
