import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import AllianceBadge from './AllianceBadge';
import Button from 'components/Button';
import { iconsPNG } from 'assets/Icons';
import { AllianceItemModel } from 'models/AllianceItem';

const HEIGHT_OF_ALLIANCE_ITEM = 72;
const HEIGHT_OF_ALLIANCE_ITEM_HAS_CONDITION = 112;

interface IAllianceItemProps {
    data: AllianceItemModel
}

const AllianceItem : React.FC<IAllianceItemProps> = ({
    data
}) => {
    const awardIcon = data.farmScore < 1000 ? 'silver_award' : data.farmScore < 1500 ? 'silver_award' : 'gold_award';

    return <View style={[
        styles.container,
        {height: !!data.coalitionType ? HEIGHT_OF_ALLIANCE_ITEM_HAS_CONDITION : HEIGHT_OF_ALLIANCE_ITEM}
    ]} >
        <View style={styles.mainContainer} >
            <Image source={{uri: data.coalitionAvatar}} style={styles.allianceLogo} />
            <View style={styles.centerContainer} >
                <Text style={styles.allianceName} >{data.coalitionName}</Text>
                <View style={styles.infoContainer} >
                    <AllianceBadge iconType='group_equal' content={data.memberNum.toString()} />
                    <AllianceBadge iconType={awardIcon} content={data.farmScore.toString()} />
                    <AllianceBadge iconType='route_dashed' content={data.distance.toString()} />
                </View>
            </View>
            <Button 
                type='clear' 
                title="Tham gia" 
                buttonStyle={{backgroundColor: '#efefef'}} 
                borderRadius={16}
                containerStyle={{width: 80, flex: 0}}
                titleStyle={{fontSize: 12, fontWeight: '600'}}
            />
        </View>
        {!!data.coalitionType && <View style={styles.conditionAlertContainer} >
            <Image source={iconsPNG.error} />
            <Text style={styles.conditionText} >Bạn phải là thành viên bạc để tham gia</Text>
        </View>}
    </View>
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 16,
        marginBottom: 16,
        backgroundColor: 'white',
        justifyContent: 'center',
        borderRadius: 16,
    },
    allianceLogo: {
        width: 56,
        height: 56,
        borderRadius: 28
    },
    mainContainer: {
        flexDirection: 'row',
        paddingHorizontal: 9,
        paddingVertical: 8,
    },
    centerContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginHorizontal: 8,
        flex: 1
    },
    infoContainer: {
        flexDirection: 'row'
    },
    allianceName: {
        marginBottom: 5,
        fontSize: 14,
        fontWeight: 'bold'
    },
    conditionAlertContainer: {
        flexDirection: 'row',
        paddingHorizontal: 9,
        paddingVertical: 8,
        borderTopWidth: 1,
        borderTopColor: '#efefef',
        alignItems: 'center'
    },
    conditionText: {
        marginHorizontal: 4,
        color: '#fe805c'
    }
})

export default AllianceItem;