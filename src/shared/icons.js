import { Path, SVG } from '@wordpress/primitives';

const createIcon = ( paths ) => (
	<SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
		{ paths }
	</SVG>
);

export const checklistIcon = createIcon(
	<>
		<Path d="M6 6.75h9v1.5H6z" />
		<Path d="M6 11.25h9v1.5H6z" />
		<Path d="M6 15.75h9v1.5H6z" />
		<Path d="M18.03 7.53l-.97-.97-1.56 1.56-.59-.59-.97.97 1.56 1.56z" />
		<Path d="M18.03 12.03l-.97-.97-1.56 1.56-.59-.59-.97.97 1.56 1.56z" />
		<Path d="M18.03 16.53l-.97-.97-1.56 1.56-.59-.59-.97.97 1.56 1.56z" />
	</>
);

export const calloutIcon = createIcon(
	<>
		<Path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8A2.5 2.5 0 0 1 17.5 16H11l-4 5v-5H6.5A2.5 2.5 0 0 1 4 13.5z" />
		<Path d="M11.25 7h1.5v4h-1.5z" />
		<Path d="M11.25 12.5h1.5V14h-1.5z" />
	</>
);

export const resourceLibraryIcon = createIcon(
	<>
		<Path d="M5 4.75A1.75 1.75 0 0 1 6.75 3h10.5A1.75 1.75 0 0 1 19 4.75v14.5H7A2 2 0 0 0 5 21z" />
		<Path d="M7 7h8.5v1.5H7z" />
		<Path d="M7 10.5h8.5V12H7z" />
		<Path d="M7 14h5.5v1.5H7z" />
	</>
);

export const footnotesIcon = createIcon(
	<>
		<Path d="M7 5.5h10v1.5H7z" />
		<Path d="M7 9h10v1.5H7z" />
		<Path d="M7 12.5h6v1.5H7z" />
		<Path d="M5 18h14v1.5H5z" />
		<Path d="M10.25 16.5h1.5V19h-1.5z" />
	</>
);
