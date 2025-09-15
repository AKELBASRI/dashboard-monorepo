# dashboard-monorepo

hey there! this is my dashboard project built with nextjs and turborepo.

## what is this?

its a dashboard app with filters on the side. i wanted to learn how monorepos work so i built this using turborepo. the filters are in a separate package so they can be reused in other apps if needed.

## setup

```bash
npm install
npm run dev
```

thats it. opens on localhost:3000

## how its organized

```
apps/
  dashboard/     <- the actual nextjs app
packages/
  filters/       <- filter sidebar component
  ui/           <- buttons, cards, etc
```

## main features

- sidebar with filters that actually work
- you can filter by status, categories, and date
- the sidebar collapses if you need more space
- built with tailwind so it looks decent
- everything is in javascript (no typescript yet)

## tech used

nextjs 14, react 18, turborepo, tailwind

## running it

dev mode: `npm run dev`

build: `npm run build`

production: `npm run build` then `npm start`

## the packages

**@repo/filters** - has the FilterSidebar component. you pass it config and it handles all the filter logic

**@repo/ui** - basic ui stuff like buttons and cards. nothing fancy

## notes

- using the new app router in nextjs
- data is just mock data for now
- filters work on client side
- might add typescript later
- want to add tests at some point

## todo

- [ ] add real api
- [ ] typescript
- [ ] tests
- [ ] dark mode maybe
- [ ] better mobile view

## license

MIT - do whatever you want with it