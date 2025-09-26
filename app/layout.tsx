import './globals.css'
export const metadata = {
  title: 'RBI Nerdio Presentation',
  description: 'Executive Financial Analysis',
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
