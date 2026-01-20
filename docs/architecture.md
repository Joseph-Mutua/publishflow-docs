# Architecture Notes

## Design Goals

The plugin is optimized around four principles:

1. Product realism over demo shortcuts.
2. Clear separation between editor behavior, frontend rendering, and data access.
3. Safe extension points through namespaced PHP and filtered registration args.
4. Boring, readable code over cleverness.

## Runtime Flow

1. `publishflow-blocks.php` boots the plugin and registers the PSR-4-style autoloader.
2. `PublishFlowBlocks\Plugin` builds the block list and shared services.
3. `BlockRegistry` registers block metadata from `build/blocks/*`.
4. Static blocks use saved markup from JS.
5. Dynamic blocks delegate frontend HTML generation to PHP block classes.

## Block Decisions

### Editorial Checklist

Chosen as a dynamic block so that a private checklist can render nothing on the public site while still existing in the editor.

### Callout / Insight

Chosen as a static block because all meaningful state is presentation-only and does not depend on runtime queries.

### Resource Library

Split into:

- editor configuration in `src/blocks/resource-library/edit.js`
- query/caching logic in `src/php/Support/ResourceLibraryQueryService.php`
- rendering in `src/php/Blocks/ResourceLibraryBlock.php`
- interaction behavior in `src/blocks/resource-library/view.js`

That split keeps Interactivity API logic thin and avoids burying query behavior in JavaScript.

### Footnotes / References

Uses editor-side structured entry management and frontend-side semantic rendering to keep authoring flexible while preserving output quality.

## Validation Strategy

The repo currently validates the plugin with:

- `wp-scripts lint-js`
- `wp-scripts test-unit-js`
- `wp-scripts build --experimental-modules`

Shared logic that can drift easily, such as list reordering and resource filtering, is extracted into `src/shared/*` helpers and tested directly.

## Extension Points

The plugin currently exposes two practical extension seams:

- `publishflow_blocks_registered_blocks`
- `publishflow_blocks_registration_args`

These allow additional block instances or registration argument overrides without editing core plugin files.