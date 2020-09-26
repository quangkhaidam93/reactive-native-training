import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { iconsPNG } from 'assets/Icons';



interface IAllianceBadgeProps {
    iconType: 'group_equal' | 'silver_award' | 'route_dashed' | 'gold_award';
    content: string; 
}

const AllianceBadge : React.FC<IAllianceBadgeProps> = ({
    iconType,
    content
}) => {
    return  <View style={styles.container} >
        <Image source={iconsPNG[iconType]} style={styles.badgeIcon} />
        <Text style={styles.text} >{content}</Text>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginRight: 14
    },
    badgeIcon: {
        marginRight: 4
    },
    text: {
        fontSize: 12
    }
})

export default AllianceBadge;