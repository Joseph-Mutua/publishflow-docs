# WordPress.org Release Guide

This repo is now structured so you can prepare a real WordPress.org release, but you still need your own WordPress.org plugin review approval and SVN credentials to publish.

## Before You Submit

Update these project-specific placeholders first:

- `publishflow-blocks.php`
  - `Plugin URI`
  - `Author`
- `readme.txt`
  - `Contributors`
- `README.md`
  - any repository or homepage links you want to expose publicly

Also make sure the version matches in both places:

- `publishflow-blocks.php` `Version`
- `readme.txt` `Stable tag`

## Repository Files That Matter For WordPress.org

- `publishflow-blocks.php`
  - plugin header metadata
- `readme.txt`
  - controls the public plugin directory page
- `.wordpress-org/*`
  - starter assets for banner, icon, and screenshots
- `build/`
  - compiled block assets used by WordPress at runtime
- `src/`
  - human-readable source, helpful for review and guideline compliance

## Validate The Release Candidate

From the plugin root:

```powershell
npm install
npm run release:check
npm run plugin-zip
```

Recommended final checks:

- activate the plugin on a clean WordPress site
- verify there are no PHP warnings with `WP_DEBUG` enabled
- verify all four blocks insert and render correctly
- confirm screenshots and readme text match the shipped behavior
- confirm the version number has been bumped

## WordPress.org Assets

The `.wordpress-org` directory in this repo contains starter assets named to match WordPress.org expectations:

- `banner-772x250.png`
- `banner-1544x500.png`
- `icon-128x128.png`
- `icon-256x256.png`
- `icon.svg`
- `screenshot-1.png`
- `screenshot-2.png`
- `screenshot-3.png`
- `screenshot-4.png`

These are suitable as starter assets for review and repo organization, but you should replace the screenshot files with fresh captures from your real local WordPress instance before first submission.

## Submit The Plugin For Review

1. Log in to your WordPress.org account.
2. Go to the plugin submission form.
3. Upload a zip created from `npm run plugin-zip`.
4. Wait for plugin review and slug approval.
5. Once approved, WordPress.org will give you an SVN URL like:

```text
https://plugins.svn.wordpress.org/your-plugin-slug
```

## Publish Through SVN

Check out the repository:

```powershell
svn checkout https://plugins.svn.wordpress.org/your-plugin-slug wporg-svn
```

Expected top-level folders:

- `/trunk`
- `/tags`
- `/assets`

Copy plugin code into `trunk`:

- everything needed to run the plugin goes in `/trunk`
- keep the main plugin file at `/trunk/publishflow-blocks.php`

Copy WordPress.org display assets into `/assets`:

- banner files
- icon files
- screenshot files

Set image mime types if needed:

```powershell
svn propset svn:mime-type image/png *.png
svn propset svn:mime-type image/jpeg *.jpg
```

Then add and commit:

```powershell
svn add trunk --force
svn add assets --force
svn commit -m "Release version 0.1.0"
```

Tag the release:

```powershell
svn copy ^
  https://plugins.svn.wordpress.org/your-plugin-slug/trunk ^
  https://plugins.svn.wordpress.org/your-plugin-slug/tags/0.1.0 ^
  -m "Tag version 0.1.0"
```

## Ongoing Release Discipline

For every WordPress.org update:

1. bump the plugin version in `publishflow-blocks.php`
2. bump the `Stable tag` in `readme.txt`
3. update the changelog
4. rerun `npm run release:check`
5. commit to `trunk`
6. copy `trunk` to a matching `tags/x.y.z` folder

## WordPress.org Guideline Notes

This plugin is intentionally aligned to the official plugin directory expectations:

- GPL-compatible licensing
- no external tracking or remote code loading
- human-readable source included in the repo
- release versioning discipline
- documentation for the build and release process

Official references:

- Plugin Directory overview: https://developer.wordpress.org/plugins/wordpress-org/
- Detailed plugin guidelines: https://developer.wordpress.org/plugins/wordpress-org/detailed-plugin-guidelines/
- Plugin assets: https://developer.wordpress.org/plugins/wordpress-org/plugin-assets/
- Readme specification: https://developer.wordpress.org/plugins/wordpress-org/how-your-readme-txt-works/
- SVN workflow: https://developer.wordpress.org/plugins/wordpress-org/how-to-use-subversion/
