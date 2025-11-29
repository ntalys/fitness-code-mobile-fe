import { useColorScheme } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { TabItem } from "../../components/Tabs/TabItem";

const TabLayout = () => {
  const colorScheme = useColorScheme();
  return (
    <>
      <Tabs
        screenOptions={{
          animation: "fade",
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor:
              colorScheme === "dark" ? "$hsla(0, 20%, 1%, 1)" : "white",
            borderTopColor:
              colorScheme === "dark" ? "$hsla(0, 20%, 1%, 1)" : "white",
          },
        }}>
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ focused }) => (
              <TabItem
                iconName="House"
                label="Home"
                focused={focused}
                colorScheme={colorScheme}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="calendar"
          options={{
            title: "Calendar",
            tabBarIcon: ({ focused }) => (
              <TabItem
                iconName="Calendar"
                label="Calendar"
                focused={focused}
                colorScheme={colorScheme}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="workouts"
          options={{
            title: "Workouts",
            tabBarIcon: ({ focused }) => (
              <TabItem
                iconName="Dumbbell"
                label="Workouts"
                focused={focused}
                colorScheme={colorScheme}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: "Search",
            tabBarIcon: ({ focused }) => (
              <TabItem
                iconName="Search"
                label="Search"
                focused={focused}
                colorScheme={colorScheme}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ focused }) => (
              <TabItem
                iconName="User"
                label="Profile"
                focused={focused}
                colorScheme={colorScheme}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabLayout;
