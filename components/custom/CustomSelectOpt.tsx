import React, { useMemo } from "react";
import { Check, ChevronDown, ChevronUp } from "lucide-react-native";
import { Adapt, Select, SelectProps, Sheet, YStack } from "tamagui";

type Item = { name: string; value: string };

interface CustomSelectOptProps extends Omit<SelectProps, "children"> {
  labelTitle?: string;
  items: Item[];
  maxWidth?: number; // px
  placeholder?: string;
  value: string;
  onValueChange: (val: string) => void;
  onOpenChange?: (val: boolean) => void;
}

export const CustomSelectOpt = ({
  items,
  labelTitle,
  maxWidth = 90,
  placeholder,
  value,
  onValueChange,
  onOpenChange,
  ...props
}: CustomSelectOptProps) => {
  const options = useMemo(
    () =>
      items.map((item, index) => (
        <Select.Item index={index} key={item.value} value={item.value}>
          <Select.ItemText>{item.name}</Select.ItemText>
          <Select.ItemIndicator marginLeft="auto">
            <Check size={20} />
          </Select.ItemIndicator>
        </Select.Item>
      )),
    []
  );

  return (
    <Select
      value={value}
      onValueChange={onValueChange}
      onOpenChange={onOpenChange}
      disablePreventBodyScroll
      {...props}>
      <Select.Trigger
        style={{ width: maxWidth, alignSelf: "flex-start" }}
        iconAfter={ChevronDown}
        color={"hsla(0, 15%, 50%, 1)"}>
        <Select.Value
          placeholder={placeholder}
          color={!value ? "$color10" : "hsla(0, 18%, 15%, 1)"}
        />
      </Select.Trigger>

      <Adapt when="maxMd" platform="touch">
        <Sheet modal dismissOnSnapToBottom animation="medium" snapPoints={[50]}>
          <Sheet.Handle />
          <Sheet.Frame>
            <Adapt.Contents />
          </Sheet.Frame>
          <Sheet.Overlay
            backgroundColor="rgba(0,0,0,0.5)"
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>

      <Select.Content zIndex={200000}>
        <Select.ScrollUpButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3">
          <YStack zIndex={10}>
            <ChevronUp size={20} />
          </YStack>
        </Select.ScrollUpButton>

        <Select.Viewport minWidth={200}>
          <Select.Group>
            {labelTitle && (
              <Select.Label textAlign="center" bg={"hsla(0, 15%, 77%, 1)"}>
                {labelTitle}
              </Select.Label>
            )}
            {options}
          </Select.Group>
        </Select.Viewport>

        <Select.ScrollDownButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3">
          <YStack zIndex={10}>
            <ChevronDown size={20} />
          </YStack>
        </Select.ScrollDownButton>
      </Select.Content>
    </Select>
  );
};

export default CustomSelectOpt;
