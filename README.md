# PublishFlow Blocks

PublishFlow Blocks is a production-minded Gutenberg plugin focused on serious publishing workflows rather than decorative layout blocks.

The plugin ships four editorially useful blocks:

- Editorial Checklist
- Callout / Insight
- Resource Library
- Footnotes / References

## Why This Plugin Exists

Automattic's publishing products reward engineers who understand the block editor as a product surface, not just a React sandbox.

This plugin is intentionally built to demonstrate:

- `block.json`-driven registration
- custom editor UX with React and Gutenberg components
- server-rendered blocks where markup stability matters
- the Interactivity API for lightweight frontend behavior
- namespaced, service-oriented PHP code
- accessibility, i18n, and defensive data handling
- testable shared logic instead of opaque inline behavior

## Block Overview

### Editorial Checklist

A publishing gate for content teams.

Features:

- editable checklist items with reorder and remove actions
- progress tracking
- private or public visibility mode
- server-rendered frontend for stable public markup

### Callout / Insight

A polished editorial emphasis block.

Features:

- tone variants: insight, warning, success
- icon variants
- stacked or split layout
- optional CTA link

### Resource Library

A related-content block for ongoing reader engagement.

Features:

- query or manual curation mode
- category and tag filtering
- frontend search and live filtering via the Interactivity API
- transient-backed query service for repeated renders

### Footnotes / References

A structured source list for serious publishing workflows.

Features:

- ordered references with editorial controls
- optional source URLs
- semantic frontend ordered-list render
- compact or detailed presentation

## Architecture

Core runtime pieces:

- `publishflow-blocks.php`
  WordPress plugin bootstrap and constant setup.
- `src/php/Plugin.php`
  Wires the block registry and shared services.
- `src/php/Infrastructure/BlockRegistry.php`
  Registers compiled block metadata from `build/blocks/*`.
- `src/php/Blocks/*`
  One class per block, with dynamic rendering where appropriate.
- `src/php/Support/ResourceLibraryQueryService.php`
  Query/caching layer for related-content resources.
- `src/blocks/*`
  Block-specific editor UI, styles, and metadata.
- `src/shared/*`
  Shared icons, defaults, utilities, and testable behavior helpers.

More detailed notes live in [docs/architecture.md](./docs/architecture.md).

## Key Tradeoffs

### Block attributes vs post meta

The plugin stores block state in block attributes instead of post meta.

Why:

- each block instance remains portable with post content
- blocks can be duplicated without extra synchronization work
- the plugin avoids hidden global state for editorial widgets

Tradeoff:

- checklist and footnote state is instance-scoped, not globally reusable

### Server render vs static save

The checklist, resource library, and footnotes blocks are dynamic.

Why:

- the checklist can cleanly hide itself when marked private
- the resource library needs query-backed data and controlled markup
- footnotes benefit from normalized frontend semantics

Tradeoff:

- more PHP rendering logic to maintain

The callout block remains static because its value is presentation rather than runtime querying.

### Interactivity API vs custom frontend bundle

The resource library uses the Interactivity API instead of ad hoc DOM code.

Why:

- smaller behavior surface
- Gutenberg-native directives and script module support
- easier state reasoning for search/filter interactions

Tradeoff:

- requires module-aware build configuration and stricter markup conventions

## Development

From the standalone plugin root:

```powershell
npm install
npm run lint:publishflow
npm run test:publishflow
npm run build:publishflow
```

## Build Output

Compiled assets are committed in `build/blocks/*` because WordPress block registration points at built metadata rather than raw source files.

## Local Run And Publishing

- Local setup instructions: [docs/local-development.md](./docs/local-development.md)
- WordPress.org release guide: [docs/wordpress-org-release.md](./docs/wordpress-org-release.md)
- Architecture notes: [docs/architecture.md](./docs/architecture.md)

## Notes

- The plugin expects a WordPress environment at runtime, but the JS build and tests run entirely from this repo.
- PHP linting was not run locally in this environment because `php` is not installed on the machine.
