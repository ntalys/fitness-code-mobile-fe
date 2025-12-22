import React from "react";
import { useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Text, XStack } from "tamagui";
import { useAuth } from "../../context/AuthContext";
import ProfileCard from "../../components/user/ProfileCard";
import { LinearGradient } from "tamagui/linear-gradient";

const ProfileScreen = () => {
  const colorScheme = useColorScheme(); // "light" | "dark"

  const { user } = useAuth();

  console.log("user: ", user);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          colorScheme === "dark" ? "$hsla(0, 20%, 1%, 1)" : "white",
      }}>
      <LinearGradient
        gap={10}
        width={"100%"}
        height={"100%"}
        rounded="$2"
        colors={["$background", "$color3"]}
        start={[1, 1]}
        end={[0, 1]}>
        <XStack pl={20} mt={10} position="relative">
          <Text fontSize="$10" color="$color">
            Profile
          </Text>
        </XStack>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            mt: 10,
          }}
          keyboardShouldPersistTaps="handled">
          <ProfileCard user={user} />
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default ProfileScreen;
