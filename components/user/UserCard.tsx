import React from "react";
import { Avatar, H4, H6, Separator, Text, XStack, YStack } from "tamagui";
import CustomIcon from "../custom/CustomIcon";

const UserCard = ({
  fname,
  lname,
  email,
  registerDate,
}: {
  fname: string;
  lname: string;
  email: string;
  registerDate: string;
}) => {
  return (
    <YStack
      mt={40}
      bg="$color3"
      rounded="$6"
      p="$4"
      borderWidth={"$0.25"}
      borderColor={"$borderColor"}
      width={360}
      height={350}
      position="relative">
      <Avatar
        circular
        size="$10"
        position="absolute"
        t={-50}
        r={"40%"}
        borderWidth={"$0.25"}
        borderColor={"$borderColor"}>
        <Avatar.Image
          accessibilityLabel="Cam"
          src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
        />
        <Avatar.Fallback bg="blue" />
      </Avatar>
      <YStack position="relative" t={50}>
        <YStack gap={8}>
          <XStack justify="center" width={"100%"}>
            <H4 fontWeight={700}>
              {fname} {lname}
            </H4>
          </XStack>
          <XStack justify="center" width={"100%"}>
            <H6 justify="center" color={"#888"}>
              {email}
            </H6>
          </XStack>
          <XStack justify="center" width={"100%"}>
            <XStack
              width={"60%"}
              rounded={"$4"}
              bg="$color10"
              px={10}
              py={5}
              justify="center">
              <Text color="$color1">member type</Text>
            </XStack>
          </XStack>
        </YStack>

        <Separator my={20} />

        <XStack justify="space-between">
          <YStack gap={10}>
            <XStack justify="center">
              <CustomIcon
                name="Calendar"
                color="hsla(0, 15%, 50%, 1)"
                size={24}
              />
            </XStack>
            <XStack justify="center">
              <Text>{registerDate.split("T")[0] ?? ""}</Text>
            </XStack>
            <XStack justify="center">
              <Text color="#888">Member Since</Text>
            </XStack>
          </YStack>

          <YStack gap={10}>
            <XStack justify="center">
              <CustomIcon
                name="Trophy"
                color="hsla(0, 15%, 50%, 1)"
                size={24}
              />
            </XStack>
            <XStack justify="center">
              <Text>175</Text>
            </XStack>
            <XStack justify="center">
              <Text color="#888">Total Workouts</Text>
            </XStack>
          </YStack>

          <YStack gap={10}>
            <XStack justify="center">
              <CustomIcon
                name="ChartSpline"
                color="hsla(0, 15%, 50%, 1)"
                size={24}
              />
            </XStack>
            <XStack justify="center">
              <Text>175 days</Text>
            </XStack>
            <XStack justify="center">
              <Text color="#888">Current Streak</Text>
            </XStack>
          </YStack>
        </XStack>
      </YStack>
    </YStack>
  );
};

export default UserCard;
