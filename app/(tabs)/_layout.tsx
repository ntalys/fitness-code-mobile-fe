import { Platform, useColorScheme } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import CustomIcon from "../../components/custom/CustomIcon";

const TabLayout = () => {
  const colorScheme = useColorScheme();
  return (
    <>
      <Tabs
        screenOptions={{
          animation: "fade",
          headerShown: false,
          tabBarStyle: {
            backgroundColor:
              colorScheme === "dark" ? "$hsla(0, 20%, 1%, 1)" : "white",
            borderTopColor:
              colorScheme === "dark" ? "$hsla(0, 20%, 1%, 1)" : "white",
          },
          // tabBarStyle: Platform.select({
          //   ios: {
          //     // Use a transparent background on iOS to show the blur effect
          //     // position: "absolute",
          //   },
          //   default: {},
          // }),
        }}>
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarActiveTintColor: "hsla(51, 100%, 54%, 1)",
            tabBarIcon: ({ color }) => (
              <CustomIcon name="House" color={color} size={28} />
            ),
          }}
        />
        <Tabs.Screen
          name="calendar"
          options={{
            title: "Calendar",
            tabBarActiveTintColor: "hsla(51, 100%, 54%, 1)",
            tabBarIcon: ({ color }) => (
              <CustomIcon name="Calendar" color={color} size={28} />
            ),
          }}
        />
        <Tabs.Screen
          name="workouts"
          options={{
            title: "Workouts",
            tabBarActiveTintColor: "hsla(51, 100%, 54%, 1)",
            tabBarIcon: ({ color }) => (
              <CustomIcon name="Dumbbell" color={color} size={28} />
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: "Search",
            tabBarActiveTintColor: "hsla(51, 100%, 54%, 1)",
            tabBarIcon: ({ color }) => (
              <CustomIcon name="Search" color={color} size={28} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarActiveTintColor: "hsla(51, 100%, 54%, 1)",
            tabBarIcon: ({ color }) => (
              <CustomIcon name="User" color={color} size={28} />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabLayout;
