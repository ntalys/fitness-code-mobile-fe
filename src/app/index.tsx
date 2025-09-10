import ProgressBar from "components/setup-progress/ProgressBar";
import React from "react";
import { Text, View } from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function Page() {
  return (
    <SafeAreaProvider>
      <View className="flex flex-1 bg-white">
        <Header />
        <Content />
        <Footer />
      </View>
    </SafeAreaProvider>
  );
}

function Content() {
  return (
    <View className="flex-1">
      <ProgressBar />
    </View>
  );
}

function Header() {
  const { top } = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: top }} className="ml-6 mt-6">
      <Text
        role="heading"
        className="text-xl text-start native:text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
        Setup Your Project
      </Text>
    </View>
  );
}

function Footer() {
  const { bottom } = useSafeAreaInsets();
  return (
    <View className="flex" style={{ paddingBottom: bottom }}>
      <View className="py-6 items-center px-4 md:px-6 ">
        <Text className={"text-center text-gray-700"}>
          © 2026 Fitness Code.
        </Text>
      </View>
    </View>
  );
}
