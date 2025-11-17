import React from "react";
import { XStack, YStack, Text, H3, H4, Paragraph } from "tamagui";

const OnBoardingSlider = ({ svg, title, description }) => {
  return (
    <YStack
      justify="center"
      bg="$color3"
      rounded="$6"
      p="$4"
      width={360}
      height={500}>
      <XStack justify="center" width={300} height={300}>
        {svg}
      </XStack>
      <YStack justify="center" gap={20}>
        <XStack justify="center" width={"100%"}>
          <H4 fontWeight={700}>{title}</H4>
        </XStack>
        <XStack justify="center">
          <Paragraph justify="center">{description}</Paragraph>
        </XStack>
      </YStack>
    </YStack>
  );
};

export default OnBoardingSlider;
