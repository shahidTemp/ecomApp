import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import '../global.css';

export default function RootLayout() {
  const queryClient = new QueryClient();

  return <>
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          animation: "slide_from_right",
          headerShown: false,
        }}
      />
    </QueryClientProvider>
  </>
}
