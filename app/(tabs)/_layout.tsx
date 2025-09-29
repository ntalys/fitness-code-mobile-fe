import { View, Text, Platform } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import CustomIcon from "../../components/custom/CustomIcon";

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <CustomIcon name="House" color={color} size={28} />
            // <IconSymbol size={28} name={"homekit"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: "Calendar",
          tabBarIcon: ({ color }) => (
            <CustomIcon name="Calendar" color={color} size={28} />
          ),
        }}
      />
      <Tabs.Screen
        name="workouts"
        options={{
          title: "Workouts",
          tabBarIcon: ({ color }) => (
            <CustomIcon name="Dumbbell" color={color} size={28} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => (
            <CustomIcon name="Search" color={color} size={28} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <CustomIcon name="User" color={color} size={28} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
