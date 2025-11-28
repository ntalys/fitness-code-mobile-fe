import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { XStack, YStack, Button, Text } from "tamagui";
import OnBoardingSlider from "../../components/on-boarding/OnBoardingSlider";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "react-native";
import DotIndicator from "../../components/dot-indicator/DotIndicator";
import Welcome from "../../assets/on-boarding/welcome.svg";
import ProgressOverview from "../../assets/on-boarding/progressOverview.svg";
import PlanWorkout from "../../assets/on-boarding/planWorkout.svg";
import BuildForYou from "../../assets/on-boarding/coach.svg";
import Carousel from "react-native-reanimated-carousel";
import { Dimensions } from "react-native";

import { ArrowRight } from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const OnBoarding = () => {
  const width = Dimensions.get("window").width;
  const colorScheme = useColorScheme(); // "light" | "dark"
  const router = useRouter();
  const carouselRef = useRef(null);

  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      svg: <Welcome />,
      title: "Welcome to Fitness Code",
      description:
        "Your personal fitness companion. Track workouts, monitor progress, and achieve your fitness goals with ease",
    },
    {
      svg: <ProgressOverview />,
      title: "Track Your Progress",
      description:
        "Monitor your fitness journey with detailed analytics, workout history, and personalized insights.",
    },
    {
      svg: <PlanWorkout />,
      title: "Plan Your Workouts",
      description:
        "Schedule workouts, set reminders, and stay consistent with our smart calendar system.",
    },
    {
      svg: <BuildForYou />,
      title: "Built for You",
      description:
        "Created by fitness enthusiasts for fitness enthusiasts. Join thousands of users transforming their lives.",
    },
  ];

  console.log("colorScheme: ", colorScheme);

  return (
    <SafeAreaView
      style={{
        backgroundColor:
          colorScheme === "dark"
            ? "hsla(0, 15%, 1%, 1)"
            : "hsla(0, 18%, 99%, 1)",
      }}>
      <YStack width={"100%"} height={"100%"} justify="center">
        <XStack position="absolute" t={10} r={24}>
          <Button
            unstyled
            onPress={() => {
              AsyncStorage.setItem("onboarded", "true");
              router.push("(auth)");
            }}>
            skip
          </Button>
        </XStack>
        <YStack justify="center" gap={40}>
          <Carousel
            ref={carouselRef}
            key={slides.length}
            width={width}
            height={500}
            data={slides}
            pagingEnabled
            onSnapToItem={(index) => setCurrentSlide(index)}
            renderItem={({ item }) => (
              <XStack justify="center">
                <OnBoardingSlider
                  svg={item.svg}
                  title={item.title}
                  description={item.description}
                />
              </XStack>
            )}
          />
          <YStack justify="center">
            <XStack justify="center" gap={5}>
              {slides.map((_, index) => (
                <DotIndicator
                  key={index}
                  onPress={() => {
                    carouselRef.current?.scrollTo({
                      index,
                      animated: true,
                    });
                  }}
                  active={index === currentSlide}
                />
              ))}
            </XStack>
          </YStack>
          <XStack justify="center">
            <Button
              width={360}
              theme="accent"
              fontWeight={"500"}
              color={"$color"}
              onPress={() => {
                const index = carouselRef.current?.getCurrentIndex();
                if (index < slides.length - 1) {
                  carouselRef.current.next();
                } else {
                  AsyncStorage.setItem("onboarded", "true");
                  router.push("(auth)");
                }
              }}
              iconAfter={
                <ArrowRight
                  color={colorScheme === "dark" ? "white" : "black"}
                />
              }>
              {currentSlide !== slides.length - 1 ? "Next" : "Get Started"}
            </Button>
          </XStack>
        </YStack>
      </YStack>
    </SafeAreaView>
  );
};

export default OnBoarding;
