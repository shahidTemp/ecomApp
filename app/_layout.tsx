import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { ThemeProvider } from "@/lib/theme";

import '../global.css';

export default function RootLayout() {
  const queryClient = new QueryClient();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <Stack
            screenOptions={{
              animation: "slide_from_right",
              headerShown: false,
            }}
          />
        </ThemeProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
