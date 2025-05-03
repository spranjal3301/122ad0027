// filepath: /home/pranjalubuntu/Documents/ Inter/repo/122ad0027_Affordmed/socalmediaanalytics/que1/src/components/AppRouterProvider.tsx
"use client";

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

export default function AppRouterProvider({ children }: { children: React.ReactNode }) {
  return <AppRouterCacheProvider>{children}</AppRouterCacheProvider>;
}