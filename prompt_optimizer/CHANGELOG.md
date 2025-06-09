# Changelog

All notable changes to this project will be documented in this file.

## [0.1.0] - 2025-06-09

### Fixed
- Resolved multiple dependency conflicts by aligning versions for `eslint`, `react`, and `react-dom`.
- Upgraded `next` to `15.3.3` to patch a critical security vulnerability (GHSA-f82v-jwr5-mffw).

### Removed
- Removed unused `docs` directory.
- Deleted temporary `diagnosticMessages.generated.json` file.

### Changed
- Stabilized project dependencies to ensure a clean `npm install`. The project is now stable and ready for development. 