import './globals.css'

export const metadata = {
  title: 'Production Dashboard',
  description: 'Dashboard with filter sidebar',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}