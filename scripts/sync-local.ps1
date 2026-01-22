param(
	[string]$DestinationPath = "C:\Users\user\Local Sites\publishflow-test\app\public\wp-content\plugins\publishflow-blocks",
	[switch]$Build
)

$ErrorActionPreference = 'Stop'

$scriptDirectory = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectRoot     = Split-Path -Parent $scriptDirectory
$sourcePath      = $projectRoot

Write-Host "PublishFlow local sync helper" -ForegroundColor Cyan
Write-Host "Source:      $sourcePath"
Write-Host "Destination: $DestinationPath"
Write-Host ""
Write-Host "Reminder: this is a local-only development helper. Remove or exclude it before publishing the plugin to WordPress.org." -ForegroundColor Yellow

if ( -not ( Test-Path $DestinationPath ) ) {
	New-Item -ItemType Directory -Path $DestinationPath -Force | Out-Null
}

if ( $Build ) {
	Write-Host ""
	Write-Host "Building plugin assets..." -ForegroundColor Cyan
	Push-Location $projectRoot
	try {
		npm run build:publishflow
		if ( $LASTEXITCODE -ne 0 ) {
			throw "Build failed with exit code $LASTEXITCODE."
		}
	} finally {
		Pop-Location
	}
}

Write-Host ""
Write-Host "Syncing files with robocopy..." -ForegroundColor Cyan

robocopy `
	$sourcePath `
	$DestinationPath `
	/MIR `
	/XD ".git" "node_modules" ".wordpress-org" "scripts" `
	/XF ".gitignore" ".gitattributes" ".editorconfig" "publishflow-blocks.zip"

$robocopyExitCode = $LASTEXITCODE

if ( $robocopyExitCode -ge 8 ) {
	throw "robocopy failed with exit code $robocopyExitCode."
}

Write-Host ""
Write-Host "Sync complete." -ForegroundColor Green
Write-Host "robocopy exit code: $robocopyExitCode"
Write-Host "Refresh the WordPress editor to load the updated blocks."
