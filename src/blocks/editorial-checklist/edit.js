import {
	InspectorControls,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';
import { PanelBody, Placeholder, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import { DEFAULT_CHECKLIST_ITEMS } from '../../shared/editorial-defaults';
import { checklistIcon } from '../../shared/icons';

export default function Edit( { attributes, setAttributes } ) {
	const {
		description,
		heading,
		items = DEFAULT_CHECKLIST_ITEMS,
		showProgress,
		visibility,
	} = attributes;
	const completedItemCount = items.filter( ( item ) => item.checked ).length;
	const progressValue = items.length
		? Math.round( ( completedItemCount / items.length ) * 100 )
		: 0;
	const blockProps = useBlockProps( {
		className: 'wp-block-publishflow-blocks-editorial-checklist',
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Checklist settings', 'publishflow-blocks' ) }
					initialOpen
				>
					<ToggleControl
						label={ __(
							'Show progress indicator',
							'publishflow-blocks'
						) }
						checked={ showProgress }
						onChange={ ( nextValue ) =>
							setAttributes( { showProgress: nextValue } )
						}
					/>
					<ToggleControl
						label={ __(
							'Show on the public frontend',
							'publishflow-blocks'
						) }
						checked={ visibility === 'public' }
						onChange={ ( nextValue ) =>
							setAttributes( {
								visibility: nextValue ? 'public' : 'private',
							} )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<section { ...blockProps }>
				<Placeholder
					icon={ checklistIcon }
					label={ __( 'Editorial checklist', 'publishflow-blocks' ) }
					instructions={ __(
						'Track readiness items before you ship an article.',
						'publishflow-blocks'
					) }
				>
					<RichText
						tagName="h3"
						value={ heading }
						onChange={ ( nextValue ) =>
							setAttributes( { heading: nextValue } )
						}
						placeholder={ __(
							'Ready to publish?',
							'publishflow-blocks'
						) }
					/>
					<RichText
						tagName="p"
						value={ description }
						onChange={ ( nextValue ) =>
							setAttributes( { description: nextValue } )
						}
						placeholder={ __(
							'Describe the publishing gate for contributors.',
							'publishflow-blocks'
						) }
					/>
					<ul
						className="publishflow-checklist-preview"
						aria-label={ __(
							'Checklist preview',
							'publishflow-blocks'
						) }
					>
						{ items.map( ( item ) => (
							<li key={ item.id }>
								<span aria-hidden="true">[ ]</span>
								<span>{ item.label }</span>
							</li>
						) ) }
					</ul>
					{ showProgress && (
						<p>
							{ __( 'Progress', 'publishflow-blocks' ) }:{ ' ' }
							{ progressValue }%
						</p>
					) }
				</Placeholder>
			</section>
		</>
	);
}
