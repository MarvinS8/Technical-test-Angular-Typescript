# WorldExplorer - Angular Technical Test

A Single Page Application built with Angular 21 that lets you explore country data from around the world.

## Project Description

WorldExplorer is a SPA that consumes the [REST Countries API](https://restcountries.com/) to display information about countries. It has 4 main sections: a home/dashboard, a countries list with search and pagination, a country detail view with an interactive map, and a contact form with validations.

## IDE Used

**Visual Studio Code** - I chose VS Code because it has excellent Angular support through the Angular Language Service extension, good TypeScript integration, built-in Git support, and it's free and lightweight. The Angular CLI also works great in the VS Code integrated terminal.

## Local Setup

- Node.js v22.x
- npm v11.x
- Angular CLI v21.2.8
- Windows 10

## Installation

```bash
# Clone the repository
git clone <repo-url>
cd Technical-test-Angular-Typescript

# Install dependencies
npm install
```

## Running the App

```bash
# Development server (runs on http://localhost:4200)
ng serve

# Or
npm start
```

## Building

```bash
# Production build
ng build

# Development build
ng build --configuration development
```

## Folder Structure

```
src/
├── app/
│   ├── components/          # Reusable components
│   │   └── navbar/          # Navigation bar
│   ├── models/              # TypeScript interfaces
│   │   └── country.model.ts
│   ├── pages/               # Route-level components
│   │   ├── home/            # Home/Dashboard page
│   │   ├── countries/       # Countries list with table and search
│   │   ├── country-detail/  # Single country view with Leaflet map
│   │   └── contact/         # Contact form
│   ├── services/            # HTTP services
│   │   └── countries.service.ts
│   ├── API-web/             # Initial API component (kept for history)
│   ├── Registro/            # Initial form component (kept for history)
│   ├── app.ts               # Root component
│   ├── app.routes.ts        # App routing
│   └── app.config.ts        # App configuration
└── styles.css               # Global styles (imports Bootstrap)
```

## What I Completed

- **Phase 1**: Angular 21 project with Bootstrap 5.3 configured via npm (not CDN), clean folder structure
- **Phase 2**: 4 views with Angular Router, shared Navbar, lazy-loaded routes
- **Phase 3**: Countries API integration via `CountriesService`, all countries in a table, single country view with Leaflet map
- **Phase 4**: Reactive form with all required validations (required, email format, 10-digit phone, message sanitization against HTML/script injection, min/max length)
- **Phase 5**: Loading spinners, error messages, search/filter in countries list, empty state when no results, pagination

**Extras implemented:**
- Pagination in the countries table
- Lazy-loaded feature routes (using `loadComponent`)
- Standalone components throughout
- `track` in `@for` loops (equivalent to `trackBy`)
- SSR (Server Side Rendering) compatible - Leaflet only initializes in the browser

## Assumptions Made

- Used `restcountries.com` as the public API since the internal API was not accessible
- The contact form simulates submission with a timeout (no real backend endpoint available)
- Phone validation is for 10-digit numbers (US format)
- Leaflet map shows country location using `latlng` coordinates from the API response

## What I Would Improve With More Time

- Add a debounced search to avoid too many re-renders while typing
- Add column sorting in the countries table
- Add a favorites feature using localStorage
- Add route guards
- Add dark mode toggle
- Write unit tests for the service and components
- Deploy to Vercel or Netlify
- Add a "not found" (404) page
- Better mobile responsiveness for the country detail page
