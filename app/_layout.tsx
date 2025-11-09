import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

import React from "react";
import { TamaguiProvider, Theme } from "tamagui";

import config from "../tamagui.config";
import { useColorScheme } from "react-native";

const _layout = () => {
  const colorScheme = useColorScheme(); // "light" | "dark"

  return (
    <>
      <TamaguiProvider config={config}>
        <Theme name={colorScheme === "dark" ? "dark" : "light"}>
          <Stack screenOptions={{ headerShown: false }}>
            <SafeAreaProvider>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </SafeAreaProvider>
          </Stack>
          <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
        </Theme>
      </TamaguiProvider>
    </>
  );
};

export default _layout;
