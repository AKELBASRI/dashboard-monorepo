# Dashboard Monorepo

Production dashboard with advanced filtering capabilities built with Next.js and Turborepo.

## Installation

```bash
# Install dependencies
cd dashboard-monorepo
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## 📁 Project Structure

```
dashboard-monorepo/
├── apps/
│   └── dashboard/          # Next.js dashboard application
├── packages/
│   ├── filters/           # Reusable filter components (JIT package)
│   └── ui/                # Shared UI components
├── turbo.json             # Turborepo configuration
└── package.json           # Root package.json with workspaces
```

## Features

- Monorepo architecture with Turborepo
- Reusable component packages
- Multiple filter types (select, multi-select, date range)
- Production data visualization
- Responsive design with Tailwind CSS

## Packages

### @repo/filters
- `FilterSidebar` - Main sidebar component with collapsible UI
- Supports multiple filter types
- Apply/Reset functionality

### @repo/ui
- `Button` - Reusable button component
- `Card` - Card components for dashboard layout

## Tech Stack

- **Next.js 14** - React framework
- **Turborepo** - Monorepo management
- **React 18** - UI library
- **Tailwind CSS** - Styling
- **JavaScript** - Programming language

## Development

### Run in development mode:
```bash
npm run dev
```

### Build all packages:
```bash
npm run build
```

### Start production server:
```bash
npm run build
npm run start
```

## Filter Types

1. **Select Filter** - Single selection dropdown
2. **Multi-Select Filter** - Multiple checkboxes
3. **Date Range Filter** - Start and end date pickers

## Project Structure

- `apps/dashboard/app/page.js` - Main dashboard page
- `packages/filters/src/components/FilterSidebar.js` - Filter sidebar component
- `packages/ui/src/Button.js` - Reusable button
- `packages/ui/src/Card.js` - Card components

## Architecture

The project uses a monorepo structure to share code between applications efficiently. Components are organized into reusable packages that can be versioned and deployed independently.

## Scripts

```bash
# Install dependencies
npm install

# Run development
npm run dev

# Build production
npm run build

# Run linting
npm run lint

# Clean build artifacts
rm -rf apps/*/node_modules packages/*/node_modules
npm install
```

## License

MIT