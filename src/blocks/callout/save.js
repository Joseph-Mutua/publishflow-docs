import { RichText, useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { body, ctaLabel, ctaUrl, eyebrow, title, tone } = attributes;
	const blockProps = useBlockProps.save( {
		className: `wp-block-publishflow-blocks-callout is-tone-${ tone }`,
	} );

	return (
		<aside { ...blockProps }>
			{ eyebrow ? (
				<RichText.Content
					tagName="p"
					className="publishflow-callout__eyebrow"
					value={ eyebrow }
				/>
			) : null }
			{ title ? (
				<RichText.Content
					tagName="h3"
					className="publishflow-callout__title"
					value={ title }
				/>
			) : null }
			{ body ? (
				<RichText.Content
					tagName="p"
					className="publishflow-callout__body"
					value={ body }
				/>
			) : null }
			{ ctaLabel && ctaUrl ? (
				<p className="publishflow-callout__cta">
					<a href={ ctaUrl }>{ ctaLabel }</a>
				</p>
			) : null }
		</aside>
	);
}
