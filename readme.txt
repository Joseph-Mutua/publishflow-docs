=== PublishFlow Blocks ===
Contributors: your-wordpress-org-username
Tags: gutenberg, block editor, editorial workflow, related content, footnotes
Requires at least: 6.6
Tested up to: 6.9
Stable tag: 0.1.0
Requires PHP: 7.4
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Editorial workflow blocks for Gutenberg: checklist, callouts, related resources, and footnotes for modern publishing teams.

== Description ==

PublishFlow Blocks is a focused Gutenberg plugin for serious publishing workflows.

Instead of shipping a generic block pack, the plugin adds four high-signal blocks that help editorial teams publish clearer, better-structured content:

* Editorial Checklist
* Callout / Insight
* Resource Library
* Footnotes / References

Key features:

* block.json-based registration for all blocks
* polished editor controls built with Gutenberg components
* dynamic frontend rendering where markup stability matters
* Interactivity API support for live filtering in the Resource Library block
* accessibility-minded markup and keyboard-friendly controls
* i18n-ready strings and defensive data handling
* test coverage for shared behavior helpers

The plugin is designed for teams who care about publishing quality, not just decorative layout.

== Installation ==

1. Upload the `publishflow-blocks` folder to the `/wp-content/plugins/` directory, or install the plugin through the WordPress plugins screen.
2. Activate the plugin through the `Plugins` screen in WordPress.
3. Open the block editor and insert any PublishFlow block:
4. Use `Editorial Checklist` for pre-publish review.
5. Use `Callout / Insight` for key takeaways and optional calls to action.
6. Use `Resource Library` to surface related posts with manual or query-based curation.
7. Use `Footnotes / References` for structured citations and sources.

== Frequently Asked Questions ==

= Does this plugin work with the Classic Editor? =

No. PublishFlow Blocks is built for the block editor.

= Does the plugin send data to external services? =

No. The plugin does not depend on third-party APIs and does not track users.

= Which blocks are dynamic? =

Editorial Checklist, Resource Library, and Footnotes / References use server-side rendering. Callout / Insight is saved statically.

= Does the Resource Library support live filtering? =

Yes. The frontend search experience uses the WordPress Interactivity API.

= Does the plugin store data in post meta? =

No. Block state is stored in block attributes so each block instance stays portable with post content.

== Screenshots ==

1. Editorial Checklist block in the editor with progress tracking and visibility controls.
2. Callout / Insight block with tone variants, icon choices, and an optional call to action.
3. Resource Library block with curated content, taxonomy filters, and live frontend search.
4. Footnotes / References block with structured citations and accessible ordered output.

== Changelog ==

= 0.1.0 =

* Initial release of the PublishFlow Blocks plugin.
* Added Editorial Checklist, Callout / Insight, Resource Library, and Footnotes / References blocks.
* Added Interactivity API behavior for resource filtering.
* Added JavaScript unit tests and release documentation.

== Upgrade Notice ==

= 0.1.0 =

Initial public release.
