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

  AsyncStorage.getAllKeys((err, keys) => {
    AsyncStorage.multiGet(keys, (error, stores) => {
      stores.map((result, i, store) => {
        console.log({ [store[i][0]]: store[i][1] });
        return true;
      });
      AsyncStorage.clear();
    });
  });

  if (!loaded) return null;

  if (!firstTime) return <Redirect href="(auth)/" />;

  return <Redirect href="(onboarding)/" />;
}
