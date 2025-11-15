import { Redirect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export default function Index() {
  console.log("inside");

  const [loaded, setLoaded] = useState(false);
  const [firstTime, setFirstTime] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("onboarded").then((v) => {
      if (!v) setFirstTime(true);
      setLoaded(true);
    });
  }, []);

  if (!loaded) return null;

  if (!firstTime) return <Redirect href="(auth)/login" />;

  return <Redirect href="(onboarding)/" />;
}
