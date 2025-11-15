import { Checkbox, CheckboxProps, Label, XStack } from "tamagui";
import { Check } from "lucide-react-native";

export function CustomCheckbox({
  size,
  label,
  ...checkboxProps
}: CheckboxProps & { label?: string }) {
  const id = `checkbox-${(Math.random() || "").toString().slice(1)}`;

  return (
    <XStack width={300} alignItems="center" gap="$4">
      <Checkbox id={id} size={size} {...checkboxProps}>
        <Checkbox.Indicator>
          <Check />
        </Checkbox.Indicator>
      </Checkbox>

      <Label size={size} htmlFor={id}>
        {label}
      </Label>
    </XStack>
  );
}
