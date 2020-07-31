import React from 'react';
import {   
    StyleSheet, 
    View,
    ViewProps,
    StyleProp,
    ViewStyle,
} from 'react-native';

const HEADER_HEIGHT = 56;
const LEFT_COMPONENT_FLEX = 1;
const CENTER_COMPONENT_FLEX = 3;
const RIGHT_COMPONENT_FLEX = 1;

interface IHeaderProps extends ViewProps {
    leftComponent?: JSX.Element;
    leftComponentFlex?: number;
    leftCustomViewStyle?: StyleProp<ViewStyle>;
    centerComponent?: JSX.Element;
    centerComponentFlex?: number;
    centerCustomViewStyle?: StyleProp<ViewStyle>;
    rightComponent?: JSX.Element;
    rightComponentFlex?: number;
    rightCustomViewStyle?: StyleProp<ViewStyle>;
    topComponent?: JSX.Element;
    bottomComponent?: JSX.Element;
    headerHeight?: number;
    isEven?: boolean;
    justifyMainLayout?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';
}

const Header : React.FC<IHeaderProps> = ({
    leftComponent,
    leftComponentFlex = LEFT_COMPONENT_FLEX,
    leftCustomViewStyle,
    centerComponent,
    centerComponentFlex = CENTER_COMPONENT_FLEX,
    centerCustomViewStyle,
    rightComponent,
    rightComponentFlex = RIGHT_COMPONENT_FLEX,
    rightCustomViewStyle,
    topComponent,
    bottomComponent,
    headerHeight = HEADER_HEIGHT,
    isEven = true,
    justifyMainLayout = 'space-between',
    ...props
}) => {
    if (isEven) {
        if (leftComponentFlex >= rightComponentFlex) rightComponentFlex = leftComponentFlex;
        leftComponentFlex = rightComponentFlex;
    }

    return <View style={[
        props.style,
        {height: headerHeight},
        {flexDirection: topComponent || bottomComponent ? 'column' : 'row'}
    ]}>
        {topComponent}
        <View style={[styles.mainComponents, {justifyContent : justifyMainLayout}]} >
            <View 
                style={
                    leftCustomViewStyle ? leftCustomViewStyle : 
                    {
                        alignItems: 'center',
                        flex: leftComponentFlex
                    }
                }
            >
                {leftComponent}
            </View>
            <View 
                style={
                    centerCustomViewStyle ? centerCustomViewStyle : 
                    {
                        alignItems: 'center',
                        flex: centerComponentFlex
                    }
                }
            >
                {centerComponent}
            </View>
            <View 
                style={
                    rightCustomViewStyle ? rightCustomViewStyle :
                    {
                        alignItems: 'center',
                        flex: rightComponentFlex,
                    }
                }
            >
                {rightComponent}
            </View>
        </View>
        {bottomComponent}
    </View>
}

const styles = StyleSheet.create({
    mainComponents: {
        flex: 1,
        flexDirection: 'row',
    },
})

export default Header;