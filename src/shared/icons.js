import { Path, SVG } from '@wordpress/primitives';

const createIcon = ( paths ) => (
	<SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
		{ paths }
	</SVG>
);

const calloutGlyphs = {
	spark: (
		<>
			<Path d="M12 3l1.15 4.35L17.5 8.5l-4.35 1.15L12 14l-1.15-4.35L6.5 8.5l4.35-1.15z" />
			<Path d="M18 13.5l.67 2.33L21 16.5l-2.33.67L18 19.5l-.67-2.33L15 16.5l2.33-.67z" />
		</>
	),
	quote: (
		<>
			<Path d="M6.5 8A3.5 3.5 0 0 0 3 11.5V18h7v-6H6.75a1.75 1.75 0 0 1 1.75-1.75h.75V8z" />
			<Path d="M15.5 8A3.5 3.5 0 0 0 12 11.5V18h7v-6h-3.25a1.75 1.75 0 0 1 1.75-1.75h.75V8z" />
		</>
	),
	chart: (
		<>
			<Path d="M5 18.25h14v1.5H5z" />
			<Path d="M7 10.5h2v6H7z" />
			<Path d="M11 7.5h2v9h-2z" />
			<Path d="M15 4.5h2v12h-2z" />
		</>
	),
	megaphone: (
		<>
			<Path d="M4 10.5v3l9 3.5V7z" />
			<Path d="M13 8l5-2v12l-5-2z" />
			<Path d="M6.5 14.25l1.25 4.25h2l-1.4-4.72z" />
		</>
	),
};

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

export const moveUpIcon = createIcon(
	<Path d="M12 5.25l-5.5 5.5 1.06 1.06 3.69-3.68V18.75h1.5V8.13l3.69 3.68 1.06-1.06z" />
);

export const moveDownIcon = createIcon(
	<Path d="M12.75 15.87l3.69-3.68 1.06 1.06-5.5 5.5-5.5-5.5 1.06-1.06 3.69 3.68V5.25h1.5z" />
);

export const removeIcon = createIcon(
	<>
		<Path d="M9.5 4.75h5l.5 1.5H19v1.5H5v-1.5h4z" />
		<Path d="M7.25 9h1.5v8h-1.5z" />
		<Path d="M11.25 9h1.5v8h-1.5z" />
		<Path d="M15.25 9h1.5v8h-1.5z" />
		<Path d="M7 19.25h10l.75-11.5H6.25z" />
	</>
);

export const calloutIcon = createIcon(
	<>
		<Path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8A2.5 2.5 0 0 1 17.5 16H11l-4 5v-5H6.5A2.5 2.5 0 0 1 4 13.5z" />
		<Path d="M11.25 7h1.5v4h-1.5z" />
		<Path d="M11.25 12.5h1.5V14h-1.5z" />
	</>
);

export const getCalloutSymbol = ( iconName ) =>
	createIcon( calloutGlyphs[ iconName ] || calloutGlyphs.spark );

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
