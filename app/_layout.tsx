import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

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
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="+not-found" />
          </Stack>
        </Theme>
      </TamaguiProvider>
    </>
  );
};

export default _layout;
