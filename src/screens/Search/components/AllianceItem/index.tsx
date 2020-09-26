import React, { memo } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { iconsPNG } from 'assets/Icons';
import Button from 'components/Button';
import AllianceBadge from './AllianceBadge';
import { AllianceItemModel } from 'models/AllianceItem';


const HEIGHT_OF_ALLIANCE_ITEM = 72;
const HEIGHT_OF_ALLIANCE_ITEM_HAS_CONDITION = 112;

interface AllianceItemProps {
    data: AllianceItemModel,
}

const AllianceItem : React.FC<AllianceItemProps> = ({
    data,
}) => {
    const awardIcon = data.farmScore < 1000 ? 'bronze_award' : data.farmScore < 1500 ? 'silver_award' : 'gold_award';

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
                title='Tham gia'
                buttonStyle={{backgroundColor: '#efefef', height: 32}} 
                borderRadius={16}
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
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
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
        alignItems: 'center'
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

// const propsAreEqual = (prevProps: AllianceItemProps, nextProps: AllianceItemProps) => {
//     return prevProps.data === nextProps.data && prevProps.highlight === nextProps.highlight;
// }

export default memo(AllianceItem, undefined);