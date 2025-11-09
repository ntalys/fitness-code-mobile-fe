import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const _layout = () => {
  return (
    <Stack>
      <StatusBar style={"light"} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="register"
        options={{ headerShown: true, title: "", headerBackTitle: "back" }}
      />
      <Stack.Screen
        name="policies"
        options={{ headerShown: true, title: "" }}
      />
      <Stack.Screen
        name="forgot-password"
        options={{ headerShown: true, title: "" }}
      />
    </Stack>
  );
};

export default _layout;
