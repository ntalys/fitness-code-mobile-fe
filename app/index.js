import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { TamaguiProvider, Theme } from "tamagui";
import config from "../tamagui.config";

export default function Page() {
  // const [themeMode, setThemeMode] = (useState < "light") | ("dark" > "light");

  const router = useRouter();

  return (
    <SafeAreaProvider>
      <TamaguiProvider config={config} defaultTheme={"light"}>
        <View style={styles.container}>
          <View style={styles.main}>
            <Text style={styles.title}>Hello World</Text>
            <Text style={styles.subtitle}>
              This is the first page of your app.
            </Text>
            <Text onPress={() => router.navigate("/home")}>Go Home</Text>
          </View>
        </View>
      </TamaguiProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
