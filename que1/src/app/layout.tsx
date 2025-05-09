
import type React from "react"
import "./globals.css"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import theme from "@/lib/theme"
import Navbar from "@/components/navbar"
import { Container } from "@mui/material"
import AppRouterProvider from "@/components/AppRouterProvider";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

export const metadata = {
  title: "Social Media Analytics",
  description: "Real-time social media analytics platform",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
        
              {children}
      
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
