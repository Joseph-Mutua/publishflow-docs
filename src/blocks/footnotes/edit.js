import {
	InspectorControls,
	RichText,
	useBlockProps,
} from "@wordpress/block-editor";
import {
	Button,
	PanelBody,
	SelectControl,
	TextControl,
	TextareaControl,
} from "@wordpress/components";
import { useEffect } from "@wordpress/element";
import { __ } from "@wordpress/i18n";

import {
	createFootnoteItem,
	DEFAULT_FOOTNOTES,
} from "../../shared/footnote-defaults";
import { moveDownIcon, moveUpIcon, removeIcon } from "../../shared/icons";
import { moveListItem } from "../../shared/utils";

export default function Edit({ attributes, setAttributes }) {
	const { displayStyle, heading, items = DEFAULT_FOOTNOTES } = attributes;
	const blockProps = useBlockProps({
		className: `wp-block-publishflow-blocks-footnotes ${
			displayStyle === "compact" ? "is-style-compact" : "is-style-detailed"
		}`,
	});

	useEffect(() => {
		if (items.length) {
			return;
		}

		setAttributes({ items: DEFAULT_FOOTNOTES });
	}, [items.length, setAttributes]);

	const updateItems = (nextItems) => {
		setAttributes({ items: nextItems });
	};

	const updateItem = (itemId, nextPartial) => {
		updateItems(
			items.map((item) =>
				item.id === itemId ? { ...item, ...nextPartial } : item,
			),
		);
	};

	const moveItem = (index, offset) => {
		updateItems(moveListItem(items, index, index + offset));
	};

	const removeItem = (itemId) => {
		updateItems(items.filter((item) => item.id !== itemId));
	};

	const addItem = () => {
		updateItems([...items, createFootnoteItem()]);
	};

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__("Reference settings", "publishflow-blocks")}
					initialOpen
				>
					<SelectControl
						label={__("Display style", "publishflow-blocks")}
						value={displayStyle}
						options={[
							{
								label: __("Detailed", "publishflow-blocks"),
								value: "detailed",
							},
							{
								label: __("Compact", "publishflow-blocks"),
								value: "compact",
							},
						]}
						onChange={(nextValue) => setAttributes({ displayStyle: nextValue })}
					/>
				</PanelBody>
			</InspectorControls>
			<section {...blockProps}>
				<RichText
					tagName="h3"
					className="publishflow-footnotes__title"
					value={heading}
					onChange={(nextValue) => setAttributes({ heading: nextValue })}
					placeholder={__("References", "publishflow-blocks")}
				/>
				<div className="publishflow-footnotes__items">
					{items.map((item, index) => (
						<article className="publishflow-footnotes__item" key={item.id}>
							<div className="publishflow-footnotes__item-header">
								<strong>
									{__("Reference", "publishflow-blocks")} {index + 1}
								</strong>
								<div className="publishflow-footnotes__item-actions">
									<Button
										className="publishflow-footnotes__icon-button"
										variant="secondary"
										label={__("Move reference up", "publishflow-blocks")}
										onClick={() => moveItem(index, -1)}
										disabled={index === 0}
									>
										{moveUpIcon}
									</Button>
									<Button
										className="publishflow-footnotes__icon-button"
										variant="secondary"
										label={__("Move reference down", "publishflow-blocks")}
										onClick={() => moveItem(index, 1)}
										disabled={index === items.length - 1}
									>
										{moveDownIcon}
									</Button>
									<Button
										className="publishflow-footnotes__icon-button is-destructive"
										variant="secondary"
										label={__("Remove reference", "publishflow-blocks")}
										onClick={() => removeItem(item.id)}
										disabled={items.length === 1}
									>
										{removeIcon}
									</Button>
								</div>
							</div>
							<TextControl
								label={__("Label", "publishflow-blocks")}
								value={item.label}
								onChange={(nextValue) =>
									updateItem(item.id, { label: nextValue })
								}
							/>
							<TextareaControl
								label={__("Citation", "publishflow-blocks")}
								value={item.citation}
								onChange={(nextValue) =>
									updateItem(item.id, {
										citation: nextValue,
									})
								}
								help={__(
									"Use a full reference, summary, or evidence note.",
									"publishflow-blocks",
								)}
							/>
							<TextControl
								label={__("Optional URL", "publishflow-blocks")}
								value={item.url}
								onChange={(nextValue) =>
									updateItem(item.id, { url: nextValue })
								}
								placeholder="http://publishflow-test.local/source"
							/>
						</article>
					))}
				</div>
				<div className="publishflow-footnotes__footer">
					<Button variant="secondary" onClick={addItem}>
						{__("Add reference", "publishflow-blocks")}
					</Button>
					<p>
						{__(
							"The frontend will render a semantic ordered list with accessible link treatment.",
							"publishflow-blocks",
						)}
					</p>
				</div>
			</section>
		</>
	);
}
