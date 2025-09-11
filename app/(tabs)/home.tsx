import React from "react";
import { YStack, Button, Text } from "tamagui";
export default function HomeScreen() {
  return (
    <>
      <YStack f={1} ai="center" jc="center" bg="$background">
        <Text fontSize="$8" color="$color">
          Hello Tamagui 👋
        </Text>

        <Button theme="accent" mt="$4">
          Accent Button
        </Button>

        <Button theme="success" mt="$4">
          Success Button
        </Button>

        <Button theme="error" mt="$4">
          Error Button
        </Button>
      </YStack>
    </>
  );
}
