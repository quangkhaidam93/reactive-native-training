import React from 'react';
import {StyleSheet, View} from 'react-native';
// import FadeInView from 'src/components/FadeInView';
import Button from 'components/Button';

export type ORDER_TYPE = 'HOTTEST' | 'NEAREST' | 'BIGGEST';

const arrActions: ORDER_TYPE[] = ['HOTTEST', 'BIGGEST', 'NEAREST'];

enum DisplayName {
    HOTTEST = 'Hot nhất',
    NEAREST = 'Gần nhất',
    BIGGEST = 'Lớn nhất',
}
interface SortsHeaderProps {
    activeName: ORDER_TYPE;
    onPress: (index: number) => void;
}
const SortsHeader = (props: SortsHeaderProps) => {
    const {activeName, onPress} = props;

    const onPressHandle = (name: ORDER_TYPE) => {
        switch(name) {
        case 'HOTTEST': {
            onPress(0);
            break;
        }
        case 'NEAREST': {
            onPress(1);
            break;
        }
        case 'BIGGEST': {
            onPress(2);
            break;
        }
        }
    };
    return (
        <View style={styles.buttonsContainer}>
        {arrActions.map(t => (
            <Button
            key={t}
            type='clear'
            title={DisplayName[t]}
            buttonStyle={[
                {
                    backgroundColor: activeName === t ? '#fe805c' : '#efefef',
                },
                styles.buttonStyle,
            ]}
            borderRadius={16}
            titleStyle={[
                {
                color: activeName === t ? 'white' : 'black',
                },
                styles.titleStyle,
            ]}
            onPress={() => onPressHandle(t)}
            />
        ))}
        </View>
    );
};

const styles = StyleSheet.create({
    buttonsContainer: {
        flexDirection: 'row',
        marginHorizontal: 16,
        marginVertical: 8
    },
    buttonStyle: {
        marginRight: 8,
        height: 32,
    },
    titleStyle: {
        fontSize: 12,
        fontWeight: '600',
    },
});

export default SortsHeader;
