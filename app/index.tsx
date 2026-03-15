import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../context/AuthContext";

export default function Index() {
  const { token, loading } = useAuth();

  const [onboardingChecked, setOnboardingChecked] = useState(false);
  const [firstTime, setFirstTime] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("onboarded").then((v) => {
      setFirstTime(!v);
      setOnboardingChecked(true);
    });
  }, []);

  if (loading || !onboardingChecked) return null;

  if (firstTime) {
    return <Redirect href="(onboarding)/" />;
  }

  if (!token) {
    return <Redirect href="(auth)/" withAnchor={true} />;
  }

  return <Redirect href="/home" withAnchor={true} />;
}
