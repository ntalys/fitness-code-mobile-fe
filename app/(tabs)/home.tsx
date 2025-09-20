import { ChevronRight, User } from "lucide-react-native";
import React from "react";
import { YStack, Button, Text } from "tamagui";
export default function HomeScreen() {
  return (
    <>
      <YStack f={1} ai="center" jc="center" bg="$background">
        <Text fontSize="$13" color="$color">
          Home
        </Text>

        <YStack f={1} ai="center" jc={"center"}>
          <Button
            theme="accent"
            mt="$4"
            icon={User}
            iconAfter={ChevronRight}
            style={{ width: 265 }}>
            Accent Button
          </Button>
        </YStack>

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
