import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect } from "react";

import { ThemeProvider, useTheme } from "@/lib/theme";

import '../global.css';

SplashScreen.preventAutoHideAsync();

function AppContent() {
  const { isReady } = useTheme();

  useEffect(() => {
    if (isReady) SplashScreen.hideAsync();
  }, [isReady]);

  if (!isReady) return null;

  return (
    <Stack
      screenOptions={{
        animation: "slide_from_right",
        headerShown: false,
      }}
    />
  );
}

export default function RootLayout() {
  const queryClient = new QueryClient();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
