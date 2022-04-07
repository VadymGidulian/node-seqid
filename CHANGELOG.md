# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.0.0] &ndash; 2022-04-07

### Added
- `getLastId` and `setLastId` methods
- `close` method to close DB connection

### Changed
- `connect` and `create` functions return methods instead of a function
- `generate` method became synchronous and returns `number` instead of result object
- Used `better-sqlite3` instead of `sqlite3`

## [1.0.0] &ndash; 2021-09-07
