import { Check, ChevronDown, ChevronUp } from "lucide-react-native";
import { useMemo, useState } from "react";
import {
  Adapt,
  FontSizeTokens,
  getFontSize,
  Select,
  SelectProps,
  Sheet,
  YStack,
} from "tamagui";

export function CustomSelectOpt(
  props: SelectProps & {
    trigger?: React.ReactNode;
    labelTitle?: string;
    items: Array<{ name: string; value: string }>;
  }
) {
  const [val, setVal] = useState("");

  return (
    <Select
      value={val}
      onValueChange={setVal}
      disablePreventBodyScroll
      {...props}>
      {props?.trigger || (
        <Select.Trigger
          maxWidth={320}
          iconAfter={ChevronDown}
          color={"hsla(0, 15%, 50%, 1)"}>
          <Select.Value placeholder="Select Gender" color={"$color10"} />
        </Select.Trigger>
      )}

      <Adapt when="maxMd" platform="touch">
        <Sheet
          native={!!props.native}
          modal
          dismissOnSnapToBottom
          animation="medium"
          snapPoints={[50]}>
          <Sheet.Handle />
          <Sheet.Frame>
            {/* This is to include scroll view */}
            {/* <Sheet.ScrollView> */}
            <Adapt.Contents />
            {/* </Sheet.ScrollView> */}
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

        <Select.Viewport
          //   to do animations:
          //   animation="quick"
          //   animateOnly={["transform", "opacity"]}
          //   enterStyle={{ o: 0, y: -10 }}
          //   exitStyle={{ o: 0, y: 10 }}
          minWidth={200}>
          <Select.Group>
            <Select.Label>{props.labelTitle}</Select.Label>
            {/* for longer lists memoizing these is useful */}
            {useMemo(
              () =>
                props.items.map((item, i) => {
                  return (
                    <Select.Item index={i} key={item.name} value={item.value}>
                      <Select.ItemText>{item.name}</Select.ItemText>
                      <Select.ItemIndicator marginLeft="auto">
                        <Check size={28} />
                      </Select.ItemIndicator>
                    </Select.Item>
                  );
                }),
              [props.items]
            )}
          </Select.Group>
          {/* Native gets an extra icon */}
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
          <linearGradient
            start={[0, 0]}
            end={[0, 1]}
            fullscreen
            colors={["transparent", "$background"]}
            borderRadius="$4"
          />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select>
  );
}
