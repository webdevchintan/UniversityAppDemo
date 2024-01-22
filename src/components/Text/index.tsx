import { Text, StyleProp, TextStyle } from "react-native";

// Define TextProps as a type instead of an interface to avoid TypeScript specific syntax
type TextProps = {
    textStyle?: StyleProp<TextStyle>;
    content: string;
    fontSize?: number;
    fontWeight?:string;
    color?:string
}

export const CustomText = ({content, textStyle, fontSize, fontWeight, color}: TextProps) => {
    return <Text style={[textStyle, {fontSize: fontSize, fontWeight: fontWeight as any, color: color}]}>{content}</Text>
};
