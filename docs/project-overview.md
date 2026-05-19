# Project Overview

## Purpose

This project contains both:

- a public university website
- an internal admin interface

The public side focuses on content delivery and localized pages.
The admin side focuses on content management workflows.

## Technical Direction

The codebase is organized around a layered frontend architecture:

- `app`
- `widgets`
- `features`
- `entities`
- `shared`

This keeps routing, page composition, domain logic, and shared utilities separated.

## Public Side

The public website is mostly server-first.

It includes sections such as:

- home
- news
- rectorate
- departments
- documents
- applicants
- students

Localized public content is rendered through the `app/[locale]` routes.

## Admin Side

The admin area is focused on interactive CRUD flows.

It includes management for:

- news
- documents
- professors

The admin experience relies on client-side state, mutations, form handling, and query invalidation.

## Data and Forms

The project uses:

- React Query for client-side data workflows
- React Hook Form for forms
- Zod for validation

Public content fetching and admin interactions follow different patterns on purpose:

- public content is optimized for rendering and delivery
- admin content is optimized for editing workflows

## Internationalization

The application supports three locales:

- Kyrgyz
- Russian
- English

Translations are maintained in locale message files.

## Code Organization

### `app`

Routing, layouts, loading states, and top-level page composition.

### `widgets`

Large UI sections and route-level UI blocks.

### `features`

Action-oriented pieces such as add, edit, delete, archive, and authentication flows.

### `entities`

Domain-specific logic and reusable entity-level UI.

### `shared`

Generic building blocks used across the project.

## Component Placement Rules

### One component per file

Each file exports exactly one component. If a component needs a helper sub-component, that sub-component goes in its own folder as a sibling in `ui/` — never defined in the same file.

Constants and type definitions in the same file are fine (e.g. `const LINKS = [...]` above the component).

### Sub-components are siblings, not nested

Every component lives in its own named folder with `index.tsx`. When a component is split into smaller parts, those parts go as **siblings** in the same `ui/` directory — never nested inside the parent component's folder.

Example from `entities/professors/ui/`:

```
ui/
  professor-form/       ← parent
  photo-fieldset/       ← sub-component (sibling)
  full-name-fields/     ← sub-component (sibling)
  position-fields/      ← sub-component (sibling)
  sections-select/      ← sub-component (sibling)
```

Not like this:

```
ui/
  professor-form/
    index.tsx
    photo-fieldset/     ← wrong, nested inside parent
```

This applies to all layers: `widgets`, `features`, `entities`, `shared`.

## Development Approach

The project favors:

- explicit public APIs through barrel files
- predictable dependency direction
- separation between public rendering concerns and admin interactivity
- minimal abstraction when abstraction does not improve the code

## Who This Document Is For

This document is intended to help:

- the next AI assistant entering the repository
- a new developer onboarding into the project
- anyone who needs a quick mental model before changing the code
