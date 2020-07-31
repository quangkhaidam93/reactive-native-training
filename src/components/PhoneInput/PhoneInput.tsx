import React, { useState, RefObject, useRef, forwardRef, useCallback } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TextInputProps, TouchableOpacity, ViewStyle, StyleProp, TextStyle, ImageStyle } from 'react-native';
import { iconsPNG } from 'assets/Icons';
import _ from 'lodash';

interface IPhoneInputProps extends TextInputProps {
    required?: boolean;
    delayTime?: number;
    inputContainerStyle?: StyleProp<ViewStyle>;
    countryCodeContainerStyle?: StyleProp<ViewStyle>;
    iconFlagStyle?: StyleProp<ImageStyle>;
    prefixPhoneStyle?: StyleProp<TextStyle>;
    errorStyle?: StyleProp<TextStyle>;
    containerStyle?: StyleProp<ViewStyle>;
}

const phoneRegex = /^((2|3|5|7|8|9)[0-9]{8})$/;

interface IError {
    isError: boolean;
    message?: string;
}

function isRefObject<T>(ref: any): ref is RefObject<T>{
    return 'current' in ref;
}

const PhoneInput : React.ForwardRefExoticComponent<React.PropsWithoutRef<IPhoneInputProps> & React.RefAttributes<TextInput>> & {
    isRequired?: string,
    invalidPhone?: string
} = forwardRef<TextInput, IPhoneInputProps>(({
    required,
    delayTime = 300,
    inputContainerStyle,
    countryCodeContainerStyle,
    iconFlagStyle,
    prefixPhoneStyle,
    errorStyle,
    containerStyle,
    ...props
}, ref) => {
    const [error, setError] = useState<IError>({isError: false});
    const [inputValue, setInputValue] = useState<string| undefined>(undefined);
    const [focusEffect, setFocusEffect] = useState<boolean>(false);
    const [showClearIcon, setShowClearIcon] = useState<boolean>(false);

    if (!ref) ref = useRef(null);

    const onFocusHandle = () => {
        if (inputValue == undefined) setInputValue('');
        setFocusEffect(true);
    }

    const handleChangeText = (text: string) => {
        setInputValue(text);
        if (text.length == 0) {
            setShowClearIcon(false);
            setError({isError: false, message: undefined});
            return;
        }
        setShowClearIcon(true);
        if (text[0] === '0') text = text.substring(1);
        if (!phoneRegex.test(text)) {
            setError({isError: true, message: PhoneInput.invalidPhone});
            return;
        }
        setError({isError: false, message: undefined});
    }

    const onBlurHandle = () => {
        setFocusEffect(false);
        if (required) {
            if (inputValue == '') {
                setError({isError: true, message: PhoneInput.isRequired})
                return
            }
            if (error.isError) setError({isError: false, message: undefined})
        }
    }

    const clearText = () => {
        if (isRefObject<TextInput>(ref)) {
            ref.current && ref.current.clear();
        }
        setShowClearIcon(false);
        setInputValue(undefined);
        if (required) setError({isError: true, message: PhoneInput.isRequired});
    }

    const debounceValidateText = useCallback(_.debounce(handleChangeText, delayTime), []);

    return <View style={[styles.container, containerStyle]} >
        <View style={styles.phoneInputContainer}>
            <TouchableOpacity disabled style={[styles.countryCode, countryCodeContainerStyle]} >
                <Image source={iconsPNG.vnflag} style={[styles.iconFlag, iconFlagStyle]} />
                <Text style={[styles.prefixPhone, prefixPhoneStyle]} >+84</Text>
            </TouchableOpacity>
            <View style={[
                styles.inputContainer,
                inputContainerStyle,
                focusEffect ? {borderColor: '#333333', borderWidth: 1} : undefined,
                error.isError ? {borderColor: '#da1b1b', borderWidth: 1} : undefined,
            ]}>
                <TextInput
                    ref={ref}
                    onBlur={onBlurHandle}
                    onFocus={onFocusHandle}
                    onChangeText={debounceValidateText}
                    keyboardType="phone-pad"
                    underlineColorAndroid={'transparent'}
                    placeholderTextColor={'#898989'}
                    style={styles.input}
                    {...props}
                />
                {
                    showClearIcon &&
                    <TouchableOpacity onPress={clearText} style={styles.clearIconCotainer}>
                        <Image source={iconsPNG.addphoto} style={styles.clearIcon} />
                    </TouchableOpacity>
                }
            </View>
        </View>
        {error.isError && <Text style={[styles.error, errorStyle]} >{error.message}</Text>}
    </View>
});

PhoneInput.isRequired = 'Bắt buộc';
PhoneInput.invalidPhone = 'Số điện thoại không hợp lệ';

const styles = StyleSheet.create({
    container: {
        height: 80,
        marginHorizontal: 16
    },
    phoneInputContainer: {
        flexDirection: 'row',
        height: 48
    },
    inputContainer: {
        flex: 1,
        backgroundColor: '#efefef',
        borderBottomRightRadius: 16,
        borderTopRightRadius: 16,
        justifyContent: 'center',
        flexDirection: 'row'
    },
    iconFlag: {
        width: 26,
        height: 18.6,
        marginRight: 5
    },
    prefixPhone: {
        lineHeight: 24,
        fontSize: 16,
        fontWeight: '600'
    },
    countryCode: {
        backgroundColor: '#efefef',
        marginRight: 2,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomLeftRadius: 16,
        borderTopLeftRadius: 16
    },
    input: {
        flex: 1,
        paddingHorizontal: 15.5,
        fontSize: 16,
        fontWeight: '600'
    },
    error: {
        paddingHorizontal: 16,
        marginTop: 8,
        color: '#da1b1b',
        fontSize: 15
    },
    clearIconCotainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    clearIcon: {
        marginHorizontal: 8,
        width: 24,
        height: 24,
    },
})

export default PhoneInput;