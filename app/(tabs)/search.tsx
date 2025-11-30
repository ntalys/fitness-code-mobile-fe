import { useColorScheme } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "tamagui";

const SearchScreen = () => {
  const colorScheme = useColorScheme(); // "light" | "dark"

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          colorScheme === "dark" ? "$hsla(0, 20%, 1%, 1)" : "white",
      }}>
      <Text fontSize="$13" color="$color">
        Search
      </Text>
    </SafeAreaView>
  );
};

export default SearchScreen;
