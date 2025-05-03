"use client"

import { useState } from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import BarChartIcon from "@mui/icons-material/BarChart"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
  { name: "Top Users", path: "/top-users" },
  { name: "Trending Posts", path: "/trending-posts" },
  { name: "Feed", path: "/feed" },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <BarChartIcon sx={{ mr: 1 }} />
        Social Analytics
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <Link href={item.path} style={{ textDecoration: "none", width: "100%", color: "inherit" }}>
              <ListItemButton
                sx={{
                  textAlign: "center",
                  bgcolor: pathname === item.path ? "rgba(25, 118, 210, 0.08)" : "transparent",
                }}
              >
                <ListItemText primary={item.name} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
            }}
          >
            <BarChartIcon sx={{ mr: 1 }} />
            Social Analytics
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Link key={item.name} href={item.path} style={{ textDecoration: "none" }}>
                <Button
                  sx={{
                    color: "#fff",
                    backgroundColor: pathname === item.path ? "rgba(255, 255, 255, 0.15)" : "transparent",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.25)",
                    },
                    mx: 0.5,
                  }}
                >
                  {item.name}
                </Button>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  )
}
