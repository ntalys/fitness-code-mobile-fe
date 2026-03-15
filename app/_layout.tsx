import { Stack } from "expo-router";
import React from "react";
import { TamaguiProvider, Theme } from "tamagui";

import config from "../tamagui.config";
import { AuthProvider } from "../context/AuthContext";
import { ThemeProvider, useTheme } from "../context/ThemeContext";

const RootLayoutNav = () => {
  const { resolvedTheme } = useTheme();

  return (
    <TamaguiProvider config={config}>
      <Theme name={resolvedTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="+not-found" />
        </Stack>
      </Theme>
    </TamaguiProvider>
  );
};

export default function Layout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RootLayoutNav />
      </AuthProvider>
    </ThemeProvider>
  );
}
