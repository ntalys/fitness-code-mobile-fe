import { useColorScheme } from "react-native";
import React, { useEffect } from "react";
import { Tabs, useRouter } from "expo-router";
import { TabItem } from "../../components/Tabs/TabItem";
import uuid from "react-native-uuid";
import { useAuth } from "../../context/AuthContext";

const TabLayout = () => {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const { token } = useAuth();

  useEffect(() => {
    if (!token) {
      router.replace("(auth)/");
    }
  }, [token]);

  return (
    <>
      <Tabs
        key={uuid.v4()}
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
                key={uuid.v4()}
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
                key={uuid.v4()}
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
                key={uuid.v4()}
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
                key={uuid.v4()}
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
                key={uuid.v4()}
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
