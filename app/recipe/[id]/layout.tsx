import '../../globals.css'
import { Raleway } from 'next/font/google'

const font = Raleway({ subsets: ['latin'] })

export const metadata = {
  title: 'Grocery List',
  description: 'Recipe Details Page',
}

export default function RecipeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  )
}