import React, { FunctionComponent, JSX, PropsWithChildren } from "react";
import { Button, Separator, Text, View, XStack, YStack } from "tamagui";

type ButtonCustomIconProps = { color?: any; size?: any };
type IconCustomProp =
  | JSX.Element
  | FunctionComponent<ButtonCustomIconProps>
  | ((props: ButtonCustomIconProps) => any)
  | null;

type ButtonProps = {
  leftIcon: React.ReactNode;
  title: string;
  rightIcon: React.ReactNode;
  onPress: any;
};
type GroupButtonsProps = {
  buttons: ButtonProps[];
};

const GroupButtons = ({ buttons }: GroupButtonsProps) => {
  return (
    <XStack
      width={360}
      bg="$color3"
      rounded="$6"
      borderWidth={"$0.25"}
      borderColor={"$borderColor"}>
      <YStack width={"100%"}>
        {buttons.map((item, index) => {
          return (
            <View key={index}>
              <Button
                onPress={item.onPress}
                unstyled
                key={index}
                width={"100%"}
                style={{
                  padding: "15",
                  borderBottom: "0.25",
                }}
                pressStyle={{
                  bg: "$color4",
                  borderTopRightRadius: index === 0 ? "$6" : "$0",
                  borderTopLeftRadius: index === 0 ? "$6" : "$0",
                  borderBottomLeftRadius:
                    index === buttons.length - 1 ? "$6" : "$0",
                  borderBottomRightRadius:
                    index === buttons.length - 1 ? "$6" : "$0",
                }}>
                <XStack justify="space-between">
                  <XStack gap={10}>
                    <Button.Icon>{item.leftIcon}</Button.Icon>
                    <Button.Text size={"$6"}>{item.title}</Button.Text>
                  </XStack>
                  {item.rightIcon}
                  {/* <Button.Icon>{item.rightIcon}</Button.Icon> */}
                </XStack>
              </Button>
              {index !== buttons.length - 1 && <Separator />}
            </View>
          );
        })}
      </YStack>
    </XStack>
  );
};

export default GroupButtons;
