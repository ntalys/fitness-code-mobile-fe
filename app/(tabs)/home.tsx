import { ChevronRight, User } from "lucide-react-native";
import React from "react";
import { useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { YStack, Button, Text } from "tamagui";
export default function HomeScreen() {
  const colorScheme = useColorScheme(); // "light" | "dark"

  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor:
            colorScheme === "dark" ? "$hsla(0, 20%, 1%, 1)" : "white",
        }}>
        {/* <YStack flex={1} ai="center" jc="center" bg="red"> */}
        <Text fontSize="$13" color="$color">
          Home
        </Text>
        <YStack ai="center" jc={"center"}>
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
        {/* </YStack> */}
      </SafeAreaView>
    </>
  );
}
