import React, { useMemo } from "react";
import { Check, ChevronDown, ChevronUp } from "lucide-react-native";
import { Adapt, Select, SelectProps, Sheet, Text, YStack } from "tamagui";
import { useColorScheme } from "react-native";

type Item = { name: string; value: string; disabled?: boolean; msg?: string };

interface CustomSelectOptProps extends Omit<SelectProps, "children"> {
  labelTitle?: string;
  items: Item[];
  maxWidth?: number; // px
  placeholder?: string;
  value: string;
  snapPoints?: [number] | [number, number];
  onValueChange: (val: string) => void;
  onOpenChange?: (val: boolean) => void;
}

export const CustomSelectOpt = ({
  items,
  labelTitle,
  maxWidth = 90,
  placeholder,
  value,
  snapPoints = [25],
  onValueChange,
  onOpenChange,
  ...props
}: CustomSelectOptProps) => {
  const colorScheme = useColorScheme();

  const options = useMemo(
    () =>
      items.map((item, index) => (
        <Select.Item
          index={index}
          key={item.value}
          value={item.value}
          disabled={item.disabled}>
          <Select.ItemText
            fontWeight={item.disabled ? "200" : "300"}
            opacity={item.disabled ? 0.8 : 1}>
            {item.name}
          </Select.ItemText>
          <Select.ItemIndicator marginLeft="auto">
            <Check
              size={20}
              color={colorScheme === "dark" ? "white" : "black"}
            />
          </Select.ItemIndicator>
        </Select.Item>
      )),
    [items]
  );

  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // wait one render cycle
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  if (!mounted) {
    // prevent rendering until layout is stable
    return <YStack height={45} width={maxWidth} bg="transparent" />;
  }

  return (
    <Select
      value={value || ""}
      onValueChange={(val) => onValueChange(val)}
      onOpenChange={onOpenChange}
      disablePreventBodyScroll
      {...props}>
      <Select.Trigger
        style={{ width: maxWidth, alignSelf: "flex-start" }}
        iconAfter={ChevronDown}
        color={"hsla(0, 15%, 50%, 1)"}>
        <Select.Value
          placeholder={placeholder}
          color={!value ? "$color10" : "$color"}
        />
      </Select.Trigger>

      <Adapt when="maxMd" platform="touch">
        <Sheet
          modal
          dismissOnSnapToBottom
          animation="medium"
          snapPoints={snapPoints}>
          <Sheet.Handle />
          <Sheet.Frame borderTopLeftRadius={24} borderTopRightRadius={24}>
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
      <Select.FocusScope>
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
                <Select.Label textAlign="center" bg={"$color2"}>
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
      </Select.FocusScope>
    </Select>
  );
};
