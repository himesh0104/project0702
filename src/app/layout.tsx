import "./globals.css"
import type React from "react"

export const metadata = {
  title: "Birthday Celebration",
  description: "A special birthday celebration card",
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

