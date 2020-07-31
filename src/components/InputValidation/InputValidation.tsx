import React, { forwardRef, useState, ReactElement, RefObject, useRef } from 'react';
import _ from 'lodash';

import { 
    StyleSheet, 
    View, 
    Text, 
    StyleProp, 
    TextStyle, 
    TextInput, 
    ImageStyle, 
    Image, 
    ViewStyle,
    TextInputProps,
    TouchableOpacity
} from 'react-native';
import { iconsPNG } from "assets/Icons";
import { useCallback } from 'react';

interface IInputValidationProps extends TextInputProps {
    label?: string;
    labelStyle?: StyleProp<TextStyle>;
    leftIcon?: ReactElement | keyof typeof iconsPNG;
    leftIconContainerStyle?: StyleProp<ViewStyle>;
    leftIconStyle?: StyleProp<ImageStyle>;
    onPressIconLeft?: () => void;
    rightIcon?: keyof typeof iconsPNG;
    rightIconStyle?: StyleProp<ImageStyle>;
    rightIconContainerStyle?: StyleProp<ViewStyle>;
    onPressIconRight?: () => void;
    errorStyle?: StyleProp<TextStyle>;
    containerStyle?: StyleProp<ViewStyle>;
    inputContainerStyle?: StyleProp<ViewStyle>;
    type?: 'solid' | 'clear';
    inputStyle?: StyleProp<TextStyle>;
    hasFocusEffect?: boolean;
    hasClearIcon?: boolean;
    focusedBorderColor?: string;
    required?: boolean;
    validationType?: 'mail' | 'phone' | 'number';
    positiveNumber?: boolean;
    minLength?: number; 
    delayTime?: number;
}

function isReactElement(element: any): element is ReactElement {
    return typeof element === 'object';
}

function isRefObject<T>(ref: any): ref is RefObject<T>{
    return 'current' in ref;
}

interface IError {
    isError: boolean;
    message?: string;
}

const mailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const numberRegex = /^-?[0-9]\d*(\.\d+)?$/;
const phoneRegex = /(09|01[2|6|8|9])+([0-9]{8})\b/;
const positiveNumberRegex = /^[0-9]\d*(\.\d+)?$/;

// const errorMessage = {
//     minLength: 'Không ngắn hơn',
//     invalidMail: 'Mail không hợp lệ'
// }

const InputValidation : React.ForwardRefExoticComponent<React.PropsWithoutRef<IInputValidationProps> & React.RefAttributes<TextInput>> & { 
    /**
     * Bien dung de khai bao error message
     */
    invalidMail?: string,
    invalidNumber?: string,
    invalidPhone?: string,
    isRequired?: string,
    notPositiveNumber?: string,
    lessThanMinLength?: string
} = forwardRef<TextInput, IInputValidationProps>((props, ref) => {
    const {
        label,
        labelStyle,
        leftIcon,
        leftIconContainerStyle,
        leftIconStyle,
        onPressIconLeft,
        rightIcon,
        rightIconContainerStyle,
        rightIconStyle,
        onPressIconRight,
        errorStyle,
        containerStyle,
        inputContainerStyle,
        type = 'solid',
        inputStyle,
        hasFocusEffect,
        hasClearIcon,
        underlineColorAndroid='transparent',
        focusedBorderColor,
        required,
        validationType,
        positiveNumber,
        minLength,
        delayTime = 300
    } = props;
    const [showFocusEffect, setShowFocusEffect] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string| undefined>(undefined);
    const [error, setError] = useState<IError>({isError: false});

    const onFocusHandle = () => {
        if (inputValue == undefined) setInputValue('');
        if (!hasFocusEffect) return;
        setShowFocusEffect(true);
    }

    const handleChangeText = (text: string) => {
        setInputValue(text);
        if (text.length == 0) {
            setError({isError: false, message: undefined});
            return;
        }
        if (minLength) {
            if (text.length < minLength) {
                setError({isError: true, message: InputValidation.lessThanMinLength && InputValidation.lessThanMinLength + minLength });
                return;
            }
            setError({isError: false, message: undefined});
        }
        if (validationType) {
            switch (validationType) {
                case 'mail': 
                    if (!mailRegex.test(text)) {
                        setError({isError : true, message: InputValidation.invalidMail})
                        return;
                    }
                    setError({isError: false, message: undefined});
                    break;
                case 'number':
                    if (!numberRegex.test(text)) {
                        setError({isError: true, message: InputValidation.invalidNumber});
                        return;
                    }
                    if (positiveNumber && !positiveNumberRegex.test(text)) {
                        setError({isError: true, message: InputValidation.notPositiveNumber});
                        return;
                    }
                    setError({isError: false, message: undefined});
                    break;
                case 'phone':
                    if (!phoneRegex.test(text)) {
                        setError({isError: true, message: InputValidation.invalidPhone});
                        return;
                    }
                    setError({isError: false, message: undefined});
                    break;
                default:
            }
        }
    }

    const onBlurHandle = () => {
        if (hasFocusEffect) setShowFocusEffect(false);
        if (required) {
            if (inputValue == '') {
                setError({isError: true, message: InputValidation.isRequired})
                return
            }
            if (error.isError) setError({isError: false, message: undefined})
        }
    }

    if (!ref) ref = useRef(null);

    const clearText = () => {
        if (isRefObject<TextInput>(ref)) {
            ref.current && ref.current.clear();
        }
        setInputValue(undefined);
        if (required) setError({isError: true, message: InputValidation.isRequired});
    }

    const debounceValidateText = useCallback(_.debounce(handleChangeText, delayTime), []);

    const containerHeight = label ? 90 : 70;

    const keyBoardType = validationType == 'phone' ? 'phone-pad' : validationType == 'number' ? props.keyboardType ? props.keyboardType : 'number-pad' : 'default'; 
    
    return <View style={[
        styles.container, containerStyle, {height: containerHeight}
    ]} >
        {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
        <View style={[
                styles.inputContainer,
                type == 'solid' && {backgroundColor: '#e8e8e8', borderRadius: 16},
                showFocusEffect ? {borderColor: focusedBorderColor || 'black'} : undefined,
                type == 'solid' && error.isError ? {borderColor: '#da1b1b', borderWidth: 2} : undefined,
                leftIcon || rightIcon ? {paddingHorizontal: 8} : undefined,
                inputContainerStyle
            ]}>
            {!leftIcon ? undefined : isReactElement(leftIcon) ? leftIcon : <TouchableOpacity disabled={!onPressIconLeft} onPress={onPressIconLeft} style={[styles.leftIconContainer, leftIconContainerStyle]} >
                <Image 
                    source={iconsPNG[leftIcon]} 
                    style={[styles.icon, leftIconStyle]}
                />
            </TouchableOpacity>}
            <TextInput
                ref={ref}
                onFocus={onFocusHandle}
                onBlur={onBlurHandle}
                style={[
                    styles.textinput,
                    type == 'clear' && { borderBottomColor: '#efefef', borderBottomWidth: 2},
                    inputStyle,
                    props.style
                ]}
                onChangeText={debounceValidateText}
                underlineColorAndroid={underlineColorAndroid}
                keyboardType={keyBoardType}
                {...props}
            />
            {!rightIcon ? undefined : isReactElement(rightIcon) ? rightIcon : <TouchableOpacity disabled={!onPressIconRight} onPress={onPressIconRight} style={[styles.rightIconContainer, rightIconContainerStyle]} >
                <Image 
                    source={iconsPNG[rightIcon]} 
                    style={[styles.icon, rightIconStyle]}
                />
            </TouchableOpacity>}
            {!rightIcon && hasClearIcon && <TouchableOpacity onPress={clearText} style={styles.leftIconContainer}>
                    <Image source={iconsPNG['add']} style={styles.icon} />
                </TouchableOpacity>}
        </View>
        {error.isError && <Text style={[styles.error, errorStyle]}>{error.message}</Text>}
    </View>
})

InputValidation.invalidMail = 'Mail không hợp lệ';
InputValidation.invalidNumber = "Số không hợp lệ";
InputValidation.invalidPhone = "Số điện thoại không hợp lệ";
InputValidation.isRequired = "Bắt buộc";
InputValidation.notPositiveNumber = "Không nhận giá trị âm";
InputValidation.lessThanMinLength = "Số kí tự tối thiểu ";


const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    label: {
        marginHorizontal: 32,
        marginBottom: 8,
        color: '#fe805c',
        fontSize: 12,
        fontWeight: '500'
    },
    inputContainer: {
        height: 48,
        paddingHorizontal: 16, 
        justifyContent: 'center',
        marginHorizontal: 16,
        flexDirection: 'row',
        borderWidth: 2,
        borderColor: 'transparent'
    },
    textinput: {
        flex: 1,
        fontSize: 19,
        // fontFamily: 'Montserrat'
    },
    icon: {
        marginHorizontal: 8,
        width: 24,
        height: 24,
    },
    leftIconContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    rightIconContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    error: {
        marginHorizontal: 32,
        marginTop: 8,
        color: '#da1b1b',
        fontSize: 12,
        fontWeight: '500'
    }
})

export default InputValidation;