# KIU Frontend

Frontend for the Kyrgyz Islamic University website and admin panel.

Built with:

- Next.js 16
- React 19
- TypeScript
- next-intl
- React Query
- React Hook Form
- Zod
- Zustand

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run typecheck
```

## Environment

The project uses `.env`.

Expected public variables:

```env
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_SITE_URL=
```

## Project Structure

```text
src/
  app/
  entities/
  features/
  shared/
  widgets/
  i18n/
```

## Architecture

The project follows a layered structure:

- `app` — routes, layouts, top-level composition
- `widgets` — page sections and large UI blocks
- `features` — user actions and workflows
- `entities` — domain models, API, forms, reusable entity UI
- `shared` — common helpers, hooks, UI, constants, stores

Dependency direction:

- `app -> widgets/features/entities/shared`
- `widgets -> features/entities/shared`
- `features -> entities/shared`
- `entities -> shared`

## Rendering

The app uses a hybrid rendering model.

- Public pages are mostly server-first and ISR-oriented.
- Admin pages are mostly client-driven and use React Query for interactive data flows.

## Main Areas

### Public site

The public website includes:

- landing page
- news
- rectorate
- departments
- documents
- pages for applicants and students

### Admin panel

The admin panel includes:

- authentication
- news management
- document management
- professor management

## Forms

Forms are built with:

- React Hook Form
- Zod

Domain-specific form logic is kept as low in the architecture as possible:

- shared form utilities in `shared`
- entity form logic in `entities`
- workflow-specific behavior in `features`

## Internationalization

Supported locales:

- `kg`
- `ru`
- `en`

Translations are stored in:

- `messages/kg.json`
- `messages/ru.json`
- `messages/en.json`

## Development Rules

- Keep dependencies going only downward through layers.
- Prefer explicit barrel exports.
- Avoid same-layer alias imports.
- Extract reusable logic only when it clearly improves readability and reuse.
- Use server fetch for public content when possible.
- Use client-side data flows for highly interactive admin screens.

## Documentation

Additional project notes:

- `docs/project-overview.md`
