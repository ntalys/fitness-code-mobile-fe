import { View, Text } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import React from "react";

const _layout = () => {
  return (
    <>
      <Stack screenOptions={{ headerShown: true, title: "" }}>
        <SafeAreaProvider>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </SafeAreaProvider>
      </Stack>
      <StatusBar />
    </>
  );
};

export default _layout;
