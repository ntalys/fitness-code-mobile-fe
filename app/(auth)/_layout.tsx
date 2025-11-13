import React, { useMemo } from "react";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useRouteInfo } from "expo-router/build/hooks";
import { useColorScheme } from "react-native";

const _layout = () => {
  const routeInfo = useRouteInfo();
  const colorScheme = useColorScheme(); // "light" | "dark"

  const statusBarColorTheme = useMemo(() => {
    if (routeInfo.pathname === "/") return "light";
    return colorScheme === "dark" ? "light" : "dark";
  }, [routeInfo, colorScheme]);
  return (
    <Stack>
      <StatusBar />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="register"
        options={{ headerShown: true, title: "", headerBackTitle: "back" }}
      />
      <Stack.Screen
        name="policies"
        options={{ headerShown: true, title: "", headerBackTitle: "back" }}
      />
      <Stack.Screen
        name="forgot-password"
        options={{ headerShown: false, title: "" }}
      />
    </Stack>
  );
};

export default _layout;
