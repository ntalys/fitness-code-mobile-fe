import React, { useMemo } from "react";
import { View } from "react-native";

import {
  Adapt,
  FontSizeTokens,
  getFontSize,
  Select,
  SelectProps,
  Sheet,
  YStack,
} from "tamagui";

import DateTimePicker from "@react-native-community/datetimepicker";
import { Calendar, ChevronDown, ChevronUp } from "lucide-react-native";

import { format } from "date-fns";

const PopoverCalendarIOS = (
  props: SelectProps & {
    trigger?: React.ReactNode;
    labelTitle?: string;
    setDate: React.Dispatch<React.SetStateAction<Date>>;
    date: Date | null;
  }
) => {
  const onChange = (_event: any, selectedDate?: Date) => {
    if (selectedDate) props.setDate(selectedDate);
  };

  const formattedDate = useMemo(
    () => (props.date ? props.date.toLocaleDateString() : ""),
    [props.date]
  );

  const formattedTitleLabel = useMemo(
    () => (props.date ? format(props.date, "dd MMM, yyyy") : ""),
    [props.date]
  );
  return (
    <>
      <Select value={formattedDate} disablePreventBodyScroll {...props}>
        {props?.trigger || (
          <Select.Trigger
            maxWidth={420}
            iconAfter={Calendar}
            color={"hsla(0, 15%, 50%, 1)"}>
            <Select.Value
              placeholder="dd/mm/yyyy"
              color={!formattedDate ? "$color10" : "hsla(0, 18%, 15%, 1)"}>
              {formattedDate}
            </Select.Value>
          </Select.Trigger>
        )}

        <Adapt when="maxMd" platform="touch">
          <Sheet
            native={!!props.native}
            modal
            dismissOnSnapToBottom
            animation="medium"
            snapPoints={[60]}>
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
            <linearGradient
              start={[0, 0]}
              end={[0, 1]}
              colors={["$background", "transparent"]}
              borderRadius="$4"
            />
          </Select.ScrollUpButton>

          <Select.Viewport minWidth={200}>
            <Select.Group>
              <Select.Label bg={"hsla(0, 15%, 77%, 1)"}>
                {formattedTitleLabel}
              </Select.Label>
              <View
                style={{
                  alignItems: "center",
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,
                }}>
                <DateTimePicker
                  value={props.date}
                  mode="date"
                  display="inline"
                  onChange={onChange}
                  themeVariant="light"
                  textColor="black"
                  accentColor="hsla(0, 15%, 50%, 1)"
                />
              </View>
            </Select.Group>
            {props.native && (
              <YStack
                position="absolute"
                right={0}
                top={0}
                bottom={0}
                alignItems="center"
                justifyContent="center"
                width={"$4"}
                pointerEvents="none">
                <ChevronDown
                  size={getFontSize((props.size as FontSizeTokens) ?? "$true")}
                />
              </YStack>
            )}
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
    </>
  );
};

export default PopoverCalendarIOS;
