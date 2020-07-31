import React, { forwardRef, useEffect, RefObject } from 'react';
import { TextInputProps, TextInput } from 'react-native';

interface IMyTextInputProps extends TextInputProps {
    onFocusInput?: (isFocused: boolean) => void;
}

function isRefObject<T>(ref: any): ref is RefObject<T>{
    return 'current' in ref;
}

const MyTextInput = forwardRef<TextInput, IMyTextInputProps>((props, ref) => {
    return <TextInput onFocus={() => props.onFocusInput?.(true)} onBlur={() => props.onFocusInput?.(false)} {...props} ref={ref} />
}) 

export default MyTextInput;