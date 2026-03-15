import { Switch, useColorScheme } from "react-native";

import React, { useState } from "react";
import { Button, XStack, YStack } from "tamagui";
import UserCard from "./UserCard";
import { LogOut } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../context/AuthContext";
import { User } from "../../@types/auth";
import GroupButtons from "../custom/GroupButtons";
import CustomIcon from "../custom/CustomIcon";
import { useTheme } from "../../context/ThemeContext";

const ProfileCard = (props: { user: User }) => {
  const { theme, setTheme } = useTheme();

  const router = useRouter();
  const { logout } = useAuth();

  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleDarkMode = () => setIsDarkMode((previousState) => !previousState);

  const [isPushNotifications, setIsPushNotifications] = useState(false);
  const togglePushNotifications = () =>
    setIsPushNotifications((previousState) => !previousState);

  const onSignOut = async () => {
    const res = await logout();
    router.replace("(auth)/");
  };

  const personalButtons = [
    {
      leftIcon: (
        <CustomIcon name="User" color="hsla(0, 15%, 50%, 1)" size={24} />
      ),
      title: "Personal Information",
      rightIcon: (
        <CustomIcon
          name="ChevronRight"
          color="hsla(0, 15%, 50%, 1)"
          size={24}
        />
      ),
      onPress: () => console.log(""),
    },
    {
      leftIcon: (
        <CustomIcon name="Dumbbell" color="hsla(0, 15%, 50%, 1)" size={24} />
      ),
      title: "Workout History",
      rightIcon: (
        <CustomIcon
          name="ChevronRight"
          color="hsla(0, 15%, 50%, 1)"
          size={24}
        />
      ),
      onPress: () => console.log(""),
    },
    {
      leftIcon: (
        <CustomIcon name="TrendingUp" color="hsla(0, 15%, 50%, 1)" size={24} />
      ),
      title: "Progress Tracking",
      rightIcon: (
        <CustomIcon
          name="ChevronRight"
          color="hsla(0, 15%, 50%, 1)"
          size={24}
        />
      ),
      onPress: () => console.log(""),
    },
    {
      leftIcon: (
        <CustomIcon name="Bell" color="hsla(0, 15%, 50%, 1)" size={24} />
      ),
      title: "Notifications",
      rightIcon: (
        <CustomIcon
          name="ChevronRight"
          color="hsla(0, 15%, 50%, 1)"
          size={24}
        />
      ),
      onPress: () => console.log(""),
    },
  ];

  const generalButtons = [
    {
      leftIcon: (
        <CustomIcon name="Moon" color="hsla(0, 15%, 50%, 1)" size={24} />
      ),
      title: "Dark Mode",
      rightIcon: <Switch value={isDarkMode} onChange={toggleDarkMode}></Switch>,
      onPress: toggleDarkMode,
    },
    {
      leftIcon: (
        <CustomIcon name="Key" color="hsla(0, 15%, 50%, 1)" size={24} />
      ),
      title: "Privacy & Security",
      rightIcon: (
        <CustomIcon
          name="ChevronRight"
          color="hsla(0, 15%, 50%, 1)"
          size={24}
        />
      ),
      onPress: () => console.log(""),
    },
    {
      leftIcon: (
        <CustomIcon name="Bell" color="hsla(0, 15%, 50%, 1)" size={24} />
      ),
      title: "Push Notifications",
      rightIcon: (
        <Switch
          value={isPushNotifications}
          onChange={togglePushNotifications}></Switch>
      ),
      onPress: togglePushNotifications,
    },
  ];

  return (
    <YStack justify="center" gap={20}>
      <XStack justify="center">
        <UserCard
          fname={props.user.fname}
          lname={props.user.lname}
          email={props.user.email}
          registerDate={props.user.registerDate}
        />
      </XStack>

      <XStack justify="center">
        <GroupButtons buttons={personalButtons} />
      </XStack>

      <XStack justify="center">
        <GroupButtons buttons={generalButtons} />
      </XStack>

      {/* <Text color={"$color10"}>{JSON.stringify(props.user)}</Text> */}
      <XStack justify="center" mb={20}>
        <Button
          width={360}
          bg="$color3"
          borderWidth={"$0.25"}
          borderColor={"$borderColor"}
          fontWeight={"500"}
          color={"red"}
          onPress={onSignOut}
          iconAfter={<LogOut color={"red"} />}>
          Sign Out
        </Button>
      </XStack>
    </YStack>
  );
};

export default ProfileCard;
