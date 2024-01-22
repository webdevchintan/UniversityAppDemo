import { TouchableOpacity, Text, StyleProp, TextStyle, ViewStyle } from "react-native";

interface ButtonProps {
  btnStyle: StyleProp<ViewStyle>;
  onPress: () => void;
  btnText: string;
  btnTextStyle: StyleProp<TextStyle>;
}

export const CustomButton = ({btnStyle, onPress, btnText, btnTextStyle}: ButtonProps) => (
<TouchableOpacity style={btnStyle} onPress={onPress}>
    <Text style={btnTextStyle}>{btnText}</Text>
  </TouchableOpacity>
);