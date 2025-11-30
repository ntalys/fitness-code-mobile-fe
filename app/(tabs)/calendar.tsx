import { useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "tamagui";

const CalendarScreen = () => {
  const colorScheme = useColorScheme(); // "light" | "dark"

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          colorScheme === "dark" ? "$hsla(0, 20%, 1%, 1)" : "white",
      }}>
      <Text fontSize="$13" color="$color">
        Calendar
      </Text>
    </SafeAreaView>
  );
};

export default CalendarScreen;
