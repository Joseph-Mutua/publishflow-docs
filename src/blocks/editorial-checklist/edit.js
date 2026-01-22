import {
	InspectorControls,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	Button,
	PanelBody,
	TextControl,
	ToggleControl,
} from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import {
	createChecklistItem,
	DEFAULT_CHECKLIST_ITEMS,
} from '../../shared/editorial-defaults';
import { moveDownIcon, moveUpIcon, removeIcon } from '../../shared/icons';
import { clamp, moveListItem } from '../../shared/utils';

export default function Edit( { attributes, setAttributes } ) {
	const {
		description,
		heading,
		items = DEFAULT_CHECKLIST_ITEMS,
		showProgress,
		visibility,
	} = attributes;
	const blockProps = useBlockProps( {
		className: 'wp-block-publishflow-blocks-editorial-checklist',
	} );
	const completedItemCount = items.filter( ( item ) => item.checked ).length;
	const progressValue = items.length
		? clamp(
				Math.round( ( completedItemCount / items.length ) * 100 ),
				0,
				100
		  )
		: 0;

	useEffect( () => {
		if ( items.length ) {
			return;
		}

		setAttributes( { items: DEFAULT_CHECKLIST_ITEMS } );
	}, [ items.length, setAttributes ] );

	const updateItems = ( nextItems ) => {
		setAttributes( { items: nextItems } );
	};

	const updateItem = ( itemId, nextPartial ) => {
		updateItems(
			items.map( ( item ) =>
				item.id === itemId ? { ...item, ...nextPartial } : item
			)
		);
	};

	const removeItem = ( itemId ) => {
		updateItems( items.filter( ( item ) => item.id !== itemId ) );
	};

	const moveItem = ( itemIndex, offset ) => {
		updateItems( moveListItem( items, itemIndex, itemIndex + offset ) );
	};

	const addItem = () => {
		updateItems( [ ...items, createChecklistItem() ] );
	};

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
						help={ __(
							'Private checklists stay visible only in the editor.',
							'publishflow-blocks'
						) }
					/>
				</PanelBody>
			</InspectorControls>
			<section { ...blockProps }>
				<div className="publishflow-editorial-checklist__header">
					<p className="publishflow-editorial-checklist__eyebrow">
						{ __( 'PublishFlow checklist', 'publishflow-blocks' ) }
					</p>
					<RichText
						tagName="h3"
						className="publishflow-editorial-checklist__title"
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
						className="publishflow-editorial-checklist__description"
						value={ description }
						onChange={ ( nextValue ) =>
							setAttributes( { description: nextValue } )
						}
						placeholder={ __(
							'Describe the quality gate for this article.',
							'publishflow-blocks'
						) }
					/>
				</div>
				{ showProgress && (
					<div
						className="publishflow-editorial-checklist__progress"
						aria-hidden="true"
					>
						<div className="publishflow-editorial-checklist__progress-copy">
							<span>
								{ completedItemCount } / { items.length }
							</span>
							<strong>{ progressValue }%</strong>
						</div>
						<div className="publishflow-editorial-checklist__progress-bar">
							<span style={ { width: `${ progressValue }%` } } />
						</div>
					</div>
				) }
				<div className="publishflow-editorial-checklist__items">
					{ items.map( ( item, index ) => (
						<div
							className="publishflow-editorial-checklist__item"
							key={ item.id }
						>
							<Button
								className="publishflow-editorial-checklist__status"
								variant={
									item.checked ? 'primary' : 'secondary'
								}
								onClick={ () =>
									updateItem( item.id, {
										checked: ! item.checked,
									} )
								}
							>
								{ item.checked
									? __( 'Done', 'publishflow-blocks' )
									: __( 'Open', 'publishflow-blocks' ) }
							</Button>
							<TextControl
								__next40pxDefaultSize
								label={ __(
									'Checklist item label',
									'publishflow-blocks'
								) }
								hideLabelFromVision
								value={ item.label }
								onChange={ ( nextValue ) =>
									updateItem( item.id, { label: nextValue } )
								}
							/>
							<div className="publishflow-editorial-checklist__item-actions">
								<Button
									className="publishflow-editorial-checklist__icon-button"
									variant="secondary"
									label={ __(
										'Move item up',
										'publishflow-blocks'
									) }
									showTooltip
									onClick={ () => moveItem( index, -1 ) }
									disabled={ index === 0 }
								>
									{ moveUpIcon }
								</Button>
								<Button
									className="publishflow-editorial-checklist__icon-button"
									variant="secondary"
									label={ __(
										'Move item down',
										'publishflow-blocks'
									) }
									showTooltip
									onClick={ () => moveItem( index, 1 ) }
									disabled={ index === items.length - 1 }
								>
									{ moveDownIcon }
								</Button>
								<Button
									className="publishflow-editorial-checklist__icon-button is-destructive"
									variant="secondary"
									label={ __(
										'Remove item',
										'publishflow-blocks'
									) }
									showTooltip
									onClick={ () => removeItem( item.id ) }
									disabled={ items.length === 1 }
								>
									{ removeIcon }
								</Button>
							</div>
						</div>
					) ) }
				</div>
				<div className="publishflow-editorial-checklist__footer">
					<Button variant="secondary" onClick={ addItem }>
						{ __( 'Add checklist item', 'publishflow-blocks' ) }
					</Button>
					<p>
						{ visibility === 'public'
							? __(
									'Readers will see checklist progress on the frontend.',
									'publishflow-blocks'
							  )
							: __(
									'Readers will not see this checklist on the frontend.',
									'publishflow-blocks'
							  ) }
					</p>
				</div>
			</section>
		</>
	);
}
