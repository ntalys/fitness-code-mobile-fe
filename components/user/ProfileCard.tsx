import { useColorScheme, View } from "react-native";

import React from "react";
import { Button, Text, XStack, YStack } from "tamagui";
import UserCard from "./UserCard";
import { LogOut } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../context/AuthContext";
import { User } from "../../@types/auth";

const ProfileCard = (props: { user: User }) => {
  console.log("props", props.user);
  const colorScheme = useColorScheme();
  const router = useRouter();
  const { logout } = useAuth();

  const onSignOut = async () => {
    const res = await logout();
    router.replace("(auth)/");
  };

  return (
    <YStack justify="center">
      <XStack justify="center">
        <UserCard
          fname={props.user.fname}
          lname={props.user.lname}
          email={props.user.email}
          registerDate={props.user.registerDate}
        />
      </XStack>
      <Text color={"$color10"}>{JSON.stringify(props.user)}</Text>
      <XStack justify="center" mb={20}>
        <Button
          disabledStyle={{ opacity: 0.5 }}
          width={320}
          theme="accent"
          fontWeight={"500"}
          color={"$color"}
          onPress={onSignOut}
          iconAfter={
            <LogOut color={colorScheme === "dark" ? "white" : "black"} />
          }>
          Sign Out
        </Button>
      </XStack>
    </YStack>
  );
};

export default ProfileCard;
