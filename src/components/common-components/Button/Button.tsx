import React from 'react';
import { 
    ActivityIndicator, 
    Image, 
    ImageStyle, 
    StyleProp, 
    StyleSheet,
    Text,
    TextStyle,
    View,
    ViewStyle
} from 'react-native';
import { iconsPNG } from 'assets/Icons';
import TouchableDebounce from 'components/common-components/TouchableDebounce/TouchableDebounce';

export interface IButtonProps {
    onPress?: () => void;
    type?: 'solid' | 'clear' | 'outline';
    disabled?: boolean;
    disabledStyle?: StyleProp<ViewStyle>;
    disabledTitleStyle?: StyleProp<TextStyle>;
    loading?: boolean;
    loadingStyle?: StyleProp<ViewStyle>;
    iconName?: keyof typeof iconsPNG;
    iconStyle?: StyleProp<ImageStyle>
    title?: string;
    titleStyle?: StyleProp<TextStyle>;
    buttonColor?: string;
    borderColor?: string;
    borderRadius?: number;
    buttonStyle?: StyleProp<ViewStyle>;
    raised?: boolean;
    raisedStyle?: StyleProp<ViewStyle>;
    interval?: number;
    noDebounce?: boolean;
}

const Button : React.FC<IButtonProps> = ({
    onPress,
    type = 'solid',
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
    interval,
    noDebounce
}) => {
    return <TouchableDebounce onPress={onPress} disabled={disabled} interval={interval} noDebounce={noDebounce} >
        <View style={[
            styles.button,
            borderRadius ? {borderRadius} : undefined,
            {borderWidth: type == 'outline' ? 1 : undefined},
            buttonColor && type == 'solid' ? {backgroundColor: buttonColor} : undefined,
            borderColor && type == 'outline' ? {borderColor} : undefined,
            disabled && type == 'solid' ? {backgroundColor: '#cccccc'} : undefined,
            disabled && type == 'outline' ? {borderColor: '#999999'} : undefined,
            raised && type != 'clear' ? styles.raised : undefined,
            raised && type != 'clear' && raisedStyle ? raisedStyle : undefined,
            disabled && disabledStyle,
            buttonStyle,
        ]}>
            {loading && <ActivityIndicator style={loadingStyle} />}
            {!loading && iconName && <Image 
                style={[styles.icon, iconStyle]} 
                source={iconsPNG[iconName]} 
            />}
            {!loading && title && <Text style={[
                titleStyle, disabled ? {color: '#666666'} : undefined,
                disabledTitleStyle
            ]}>{title}</Text>}
        </View>
    </TouchableDebounce>
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        paddingHorizontal: 10,
        borderRadius: 10,
        height: 40
    },
    raised: {
        overflow: 'visible',
        shadowColor: 'rgba(0, 0, 0, .4)',
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 1,
        shadowRadius: 1,
    },
    icon: {
        width: 24,
        height: 24,
        margin: 4
    }
});

export default Button;

