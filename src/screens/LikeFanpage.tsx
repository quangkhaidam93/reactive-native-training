import React, { useReducer, useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text, Linking, ListRenderItemInfo, FlatList } from 'react-native';
import { Images } from 'assets/images';
import { iconsPNG } from 'assets/Icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AllianceItem from 'components/AllianceAroundYou/components/AllianceItem';
import { AllianceItemModel } from 'models/AllianceItem';
import { IAllianceListState, AllianceListActions, AllianceListTypes } from './types';
import axios from 'axios';
import Button from 'components/Button';
import AllianceListPlaceHolder from 'components/AllianceAroundYou/components/AllianceListPlaceHolder';

const allianceListInitialState : IAllianceListState = {
    allianceList: [],
    loading: false,
    refreshing: false,
    allianceListRequestStatus: undefined,
    pageable: undefined,
    error: undefined
}

const allianceListReducer = (state: IAllianceListState, action: AllianceListActions): IAllianceListState => {
    switch(action.type) {
        case AllianceListTypes.ALLIANCE_LIST_REQUEST: 
            return {
                ...state,
                allianceListRequestStatus: 'REQUEST'
            }
        case AllianceListTypes.ALLIANCE_LIST_SUCCESS: {
            const oldList = state.allianceList || [];
            let newList: AllianceItemModel[] = [];
            if (action.payload) {
                if (action.payload.pageable.offset === 0) {
                    newList = action.payload.datas;
                } else newList = [...oldList, ...(action.payload.datas || [])];
            }
            return {
                ...state,
                allianceListRequestStatus: 'SUCCESS',
                loading: false,
                allianceList: newList,
                pageable: {
                    limit: 10,
                    offset: newList.length,
                    last: false
                }
            }
        }
        case AllianceListTypes.ALLIANCE_LIST_FAILURE:
            return {
                ...state,
                allianceListRequestStatus: 'FAILURE',
                loading: false,
                error: action.payload
            }
        case AllianceListTypes.ALLIANCE_LIST_FIRST_LOADING:
            return {
                ...state,
                loading: true
            }
        default: return {...state}
    }
}

const LikeFanPage = () => {
    const [allianceListState, allianceListDispatch] = useReducer(allianceListReducer, allianceListInitialState);
    const [activeButton, setActiveButton] = useState(0);

    const renderItem = (info: ListRenderItemInfo<AllianceItemModel>) => {
        const { item } = info;
        return (
            <AllianceItem
                data={item}
                key={item.id}
            />
        );
    };

    const fetchData = (index: number) => {
        switch(index) {
            case 0: {
                fetchAllianceListHottest();
                break;
            }
            case 1: {
                fetchAllianceListNearest();
                break;
            }
            case 2: {
                fetchAllianceListBiggest();
            }
            default: break;
        }
    }

    const fetchAllianceListHottest = async () => {
        allianceListDispatch({type: AllianceListTypes.ALLIANCE_LIST_REQUEST});
        try {
            const result = await axios.get('https://dev.aladin.today/coalition/public/newsfeed/searchAround?lat=6&lng=106&limit=10&offset=0');
            const allianceList : AllianceItemModel[] = result.data.dataArray;
            allianceListDispatch({
                type: AllianceListTypes.ALLIANCE_LIST_SUCCESS,
                payload: {
                    datas: allianceList,
                    pageable: result.data.pageable
                }
            });
        }
        catch (err) {
            allianceListDispatch({
                type: AllianceListTypes.ALLIANCE_LIST_FAILURE,
                payload: new Error()
            })
        }
    }

    const fetchAllianceListNearest = async () => {
        allianceListDispatch({type: AllianceListTypes.ALLIANCE_LIST_REQUEST});
        try {
            const result = await axios.get('https://dev.aladin.today/coalition/public/newsfeed/searchAround?lat=6&lng=106&limit=10&offset=0');
            const allianceList : AllianceItemModel[] = result.data.dataArray;
            allianceListDispatch({
                type: AllianceListTypes.ALLIANCE_LIST_SUCCESS,
                payload: {
                    datas: allianceList,
                    pageable: result.data.pageable
                }
            });
        }
        catch (err) {
            allianceListDispatch({
                type: AllianceListTypes.ALLIANCE_LIST_FAILURE,
                payload: new Error()
            })
        }
    }

    const handleButtonClick = (index: number) => {
        setActiveButton(index);
        allianceListDispatch({type: AllianceListTypes.ALLIANCE_LIST_FIRST_LOADING});
        fetchData(index);
    }

    const fetchAllianceListBiggest = async () => {
        allianceListDispatch({type: AllianceListTypes.ALLIANCE_LIST_REQUEST});
        try {
            const result = await axios.get('https://dev.aladin.today/coalition/public/newsfeed/searchAround?lat=6&lng=106&limit=10&offset=0');
            const allianceList : AllianceItemModel[] = result.data.dataArray;
            allianceListDispatch({
                type: AllianceListTypes.ALLIANCE_LIST_SUCCESS,
                payload: {
                    datas: allianceList,
                    pageable: result.data.pageable
                }
            });
        }
        catch (err) {
            allianceListDispatch({
                type: AllianceListTypes.ALLIANCE_LIST_FAILURE,
                payload: new Error()
            })
        }
    }

    const onLoadmoreAlliances = (index: number) => {
        if (allianceListState.pageable) {
            if (allianceListState.allianceListRequestStatus === 'REQUEST' || allianceListState.pageable.last) return;
            fetchData(index);
        }
    }

    useEffect(() => {
        fetchAllianceListHottest();
    }, []);

    const keyExtractor = (item: AllianceItemModel) => `${item.id}`;
    
    return <SafeAreaView style={{backgroundColor: 'rgba(0, 0, 0, .09)', paddingVertical: 20}}>
        <View style={styles.buttonsContainer} >
            <Button 
                type='clear' 
                title="Hot nhất" 
                buttonStyle={{backgroundColor: activeButton === 0 ? '#fe805c' : 'white'}} 
                borderRadius={16}
                // containerStyle={{width: 80, flex: 0, marginRight: 8}}
                titleStyle={{fontSize: 12, fontWeight: '600', color: activeButton === 0 ? 'white' : 'black'}}
                onPress={() => handleButtonClick(0)}
            />
            <Button 
                type='clear' 
                title="Gần nhất" 
                buttonStyle={{backgroundColor: activeButton === 1 ? '#fe805c' : 'white'}} 
                borderRadius={16}
                // containerStyle={{width: 80, flex: 0, marginRight: 8}}
                titleStyle={{fontSize: 12, fontWeight: '600', color: activeButton === 1 ? 'white' : 'black'}}
                onPress={() => handleButtonClick(1)}
            />
            <Button 
                type='clear' 
                title="Lớn nhất" 
                buttonStyle={{backgroundColor: activeButton === 2 ? '#fe805c' : 'white'}} 
                borderRadius={16}
                // containerStyle={{width: 80, flex: 0}}
                titleStyle={{fontSize: 12, fontWeight: '600', color: activeButton === 2 ? 'white' : 'black'}}
                onPress={() => handleButtonClick(2)}
            />
        </View>
        {allianceListState.loading ? <AllianceListPlaceHolder /> 
            : <FlatList
                refreshing={allianceListState.allianceListRequestStatus === 'REQUEST'}
                onRefresh={() => fetchData(activeButton)}
                data={allianceListState.allianceList}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                onEndReachedThreshold={0}
                onEndReached={() => onLoadmoreAlliances(activeButton)}
                
            />
        }
    </SafeAreaView>
}

const styles = StyleSheet.create({
    buttonsContainer: {
        flexDirection: 'row',
        marginHorizontal: 16,
        marginBottom: 16
    },
    clearContainer: {
        flexDirection: 'row-reverse',
        marginHorizontal: 16
    },
    clearIcon: {
        width: 24,
        height: 24
    },
    buttonContainer: {
        justifyContent: 'center',
        flexDirection: 'row'
    },
    button: {
        marginTop: 36, 
        width: 382,
        height: 40,
        backgroundColor: '#333333',
        borderRadius: 23,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: '#ffffff',
        fontWeight: '600',
        fontSize: 14
    }
})

export default LikeFanPage;

// const openFacebook = async () => {
    //     try {
    //         const hasFBApp = await Linking.canOpenURL('fb://page/105547547594720');
    //         if (hasFBApp) {
    //             Linking.openURL('fb://page/?id=105547547594720');
    //         }
    //         else {
    //             Linking.openURL('https://www.facebook.com/105547547594720');
    //             // Linking.openURL('https://www.facebook.com/aladin.today/');
    //         }
    //     }
    //     catch (err) {
    //         console.log(err);
    //     }
        
    // }

    // return (<SafeAreaView>
    //     <View style={styles.clearContainer} >
    //         <TouchableOpacity>
    //             <Image source={iconsPNG.clear} style={{justifyContent: 'flex-end'}} />
    //         </TouchableOpacity>
    //     </View>
    //     <Image source={Images.group} />
    //     <View style={styles.buttonContainer }>
    //         <TouchableOpacity style={styles.button} onPress={openFacebook} >
    //             <Text style={styles.text}>Like ngay nào!</Text>
    //         </TouchableOpacity>
    //     </View>
    // </SafeAreaView>)