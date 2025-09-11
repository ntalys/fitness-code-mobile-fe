import { icons } from "lucide-react-native";

const CustomIcon = ({
  name,
  color,
  size,
}: {
  name: string;
  color: string;
  size: number | string;
}) => {
  const LucideIcon = icons[name as keyof typeof icons];

  return <LucideIcon color={color} size={size} />;
};

export default CustomIcon;
