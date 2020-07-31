import React from "react";
import {
    ActivityIndicator,
    Image,
    ImageStyle,
    StyleProp,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle,
} from "react-native";
import { iconsPNG } from "assets/Icons";

interface IButtonProps {
    containerStyle?: StyleProp<ViewStyle>;
    onPress?: () => void;
    type?: "solid" | "clear" | "outline";
    disabled?: boolean;
    disabledStyle?: StyleProp<ViewStyle>;
    disabledTitleStyle?: StyleProp<TextStyle>;
    loading?: boolean;
    loadingStyle?: StyleProp<ViewStyle>;
    iconName?: keyof typeof iconsPNG;
    iconStyle?: StyleProp<ImageStyle>;
    title?: string;
    titleStyle?: StyleProp<TextStyle>;
    buttonColor?: string;
    borderColor?: string;
    borderRadius?: number;
    buttonStyle?: StyleProp<ViewStyle>;
    raised?: boolean;
    raisedStyle?: StyleProp<ViewStyle>;
}

const Button: React.FC<IButtonProps> = ({
    containerStyle,
    onPress,
    type = "solid",
    disabled,
    disabledStyle,
    disabledTitleStyle,
    loading,
    loadingStyle,
    iconName,
    iconStyle,
    title,
    titleStyle,
    buttonColor,
    borderColor,
    borderRadius,
    buttonStyle,
    raised,
    raisedStyle,
}) => {
    return (
        <View style={[styles.container, containerStyle]}>
        <TouchableOpacity onPress={onPress} disabled={disabled}>
            <View
            style={[
                styles.button,
                borderRadius ? { borderRadius } : undefined,
                { borderWidth: type == "outline" ? 1 : undefined },
                buttonColor && type == "solid"
                ? { backgroundColor: buttonColor }
                : undefined,
                borderColor && type == "outline" ? { borderColor } : undefined,
                disabled && type == "solid"
                ? { backgroundColor: "#cccccc" }
                : undefined,
                disabled && type == "outline"
                ? { borderColor: "#999999" }
                : undefined,
                raised && type != "clear" ? styles.raised : undefined,
                raised && type != "clear" && raisedStyle ? raisedStyle : undefined,
                disabled && disabledStyle,
                buttonStyle,
            ]}
            >
            {loading && <ActivityIndicator style={loadingStyle} />}
            {!loading && iconName && (
                <Image
                style={[styles.icon, iconStyle]}
                source={iconsPNG[iconName]}
                />
            )}
            {!loading && title && (
                <Text
                style={[
                    titleStyle,
                    disabled ? { color: "#666666" } : undefined,
                    disabledTitleStyle,
                ]}
                >
                {title}
                </Text>
            )}
            </View>
        </TouchableOpacity>
        </View>
    );
    };

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    button: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
        paddingHorizontal: 10,
        borderRadius: 10,
        height: 40,
    },
    raised: {
        overflow: "visible",
        shadowColor: "rgba(0, 0, 0, .4)",
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 1,
        shadowRadius: 1,
    },
    icon: {
        width: 24,
        height: 24,
        margin: 4,
    },
    });

export default Button;
