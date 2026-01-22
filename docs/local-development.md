# Local Development

This plugin can be developed on any local WordPress site. The simplest path is:

1. install the JavaScript dependencies
2. build or watch the block assets
3. link the plugin into `wp-content/plugins`
4. activate it in WordPress

## Prerequisites

- Node.js 20 or newer
- npm 10 or newer
- a local WordPress site
- PHP 7.4 or newer in the WordPress runtime

As of March 21, 2026, the latest stable WordPress release is 6.9.4, and this plugin is prepared for the 6.9 release line.

## Recommended Local Setup

Use one of these:

- LocalWP
- WordPress Studio
- a manual WordPress install
- a Docker-based WordPress environment you already trust

The plugin does not require a custom database schema or background service, so a standard local WordPress install is enough.

## Install Dependencies

From the plugin root:

```powershell
npm install
```

## Build Assets

For a one-off production build:

```powershell
npm run build:publishflow
```

For active block development with rebuilds on file changes:

```powershell
npm run start
```

## Validate Before Testing in WordPress

```powershell
npm run lint:publishflow
npm run test:publishflow
npm run build:publishflow
```

## Link the Plugin Into WordPress

### Option 1: Copy the folder

Copy this folder:

`D:\WORK\FOLDER2\publishflow-blocks`

to:

`C:\path\to\wordpress\wp-content\plugins\publishflow-blocks`

### Option 2: Use a symbolic link on Windows

```powershell
New-Item -ItemType SymbolicLink `
  -Path "C:\path\to\wordpress\wp-content\plugins\publishflow-blocks" `
  -Target "D:\path\to\publishflow-blocks"
```

## Activate the Plugin

In WordPress Admin:

1. go to `Plugins`
2. activate `PublishFlow Blocks`
3. create a new post in the block editor

## Manual Test Pass

Create a post that includes all four blocks and verify:

- Editorial Checklist
  - add, edit, reorder, and remove checklist items
  - switch visibility between public and private
  - confirm frontend output hides correctly when private
- Callout / Insight
  - switch between tone variants
  - change icons and layout
  - add and remove the CTA
- Resource Library
  - test both manual and query-based curation
  - confirm category and tag filtering
  - verify live search on the frontend
- Footnotes / References
  - add multiple citations
  - test compact and detailed presentation
  - confirm source links and ordered output

## Packaging for a Release Candidate

Create a distributable zip:

```powershell
npm run release:zip
```

That command runs linting, tests, a production build, and then creates a plugin zip using `wp-scripts plugin-zip`.
