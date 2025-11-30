import { User } from "lucide-react-native";
import React from "react";
import { useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Text, YStack } from "tamagui";

const ProfileScreen = () => {
  const colorScheme = useColorScheme(); // "light" | "dark"

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          colorScheme === "dark" ? "$hsla(0, 20%, 1%, 1)" : "white",
      }}>
      <Text fontSize="$13" color="$color">
        Profile
      </Text>
    </SafeAreaView>
  );
};

export default ProfileScreen;
