import { ColorSchemeName } from "react-native";
import { BaseToastProps } from "react-native-toast-message";

type ExpandedOnly = {
  expanded: true;
  collapsable?: false;
};

type CollapsableOnly = {
  collapsable: true;
  expanded?: false;
};

type None = {
  expanded?: false;
  collapsable?: false;
};

type BeastToastProps = BaseToastProps & {
  colorScheme: ColorSchemeName;
  statusColor: "red" | "green" | "blue";
} & (ExpandedOnly | CollapsableOnly | None);

export { BeastToastProps };
