import React, { useState, useRef, RefObject, useEffect, useReducer, useCallback } from 'react';
import { 
    View, 
    Image, 
    Text, 
    TouchableOpacity, 
    Dimensions, 
    Animated, 
    TextInput,
    Keyboard,
    StyleSheet,
    Modal,
    FlatList,
    ListRenderItemInfo
} from 'react-native';
import { iconsPNG } from 'assets/Icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import InputValidation from 'components/InputValidation';
import SortsHeader, { ORDER_TYPE } from './components/SortsHeader';
import { IAllianceListState, AllianceListTypes, AllianceListActions } from 'screens/types';
import { AllianceItemModel } from 'models/AllianceItem';
import axios from 'axios';
import AllianceListPlaceHolder from 'components/AllianceAroundYou/components/AllianceListPlaceHolder';
import AllianceItem from './components/AllianceItem';
import _ from 'lodash';

const { width } = Dimensions.get("window");
const PADDING = 16;
const SEARCH_WIDTH = width - 2 * PADDING - 15 - 40;

function isRefObject<T>(ref: any): ref is RefObject<T>{
    return 'current' in ref;
}

const allianceListInitialState: IAllianceListState = {
    allianceList: [],
    refreshing: false,
    allianceListRequestStatus: undefined,
    pageable: {
        limit: 15,
        offset: 0,
        last: false,
    },
    error: undefined,
};

const ORDERS: {[key: number]: ORDER_TYPE} = {
    0: 'HOTTEST',
    1: 'NEAREST',
    2: 'BIGGEST',
};

const allianceListReducer = (
    state: IAllianceListState,
    action: AllianceListActions,
): IAllianceListState => {
    switch (action.type) {
        case AllianceListTypes.ALLIANCE_LIST_REQUEST:
        return {
            ...state,
            allianceListRequestStatus: 'REQUEST',
        };
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
                ...state.pageable,
                offset: newList.length,
                last: action.payload && action.payload.pageable.last,
            },
        };
    }
    case AllianceListTypes.ALLIANCE_LIST_FAILURE:
        return {
            ...state,
            allianceListRequestStatus: 'FAILURE',
            loading: false,
            error: action.payload,
        };
    case AllianceListTypes.ALLIANCE_LIST_FIRST_LOADING: {
        return {
            ...state,
            loading: true
        };
    }
    case AllianceListTypes.ALLIANCE_LIST_RESET: {
        return {
            ...state,
            allianceList: []
        }
    }
    case AllianceListTypes.ALLIANCE_LIST_REFRESH:
        return {
            ...state,
            allianceList: [],
            pageable: {
                ...state.pageable,
                offset: 0,
                last: false,
            },
        };
    default:
        return {...state};
    }
};

const Search = () => {
    const searchInputLength = useRef(new Animated.Value(0)).current;
    const cancelOpacity = useRef(new Animated.Value(1)).current;
    const inputOpacity = useRef(new Animated.Value(0)).current;
    const cancelWidth = useRef(new Animated.Value(40)).current;
    const inputRef = useRef<TextInput>(null);
    const [searchAppearance, setSearchAppearance] = useState(false);
    // const searchBackgroundAnim = useRef(new Animated.Value(1)).current;
    const allianceListView = useRef(new Animated.Value(0)).current;
    const searchOpacity = useRef(new Animated.Value(0)).current;

    const [activeButton, setActiveButton] = useState<number>(0);

    const [allianceListState, allianceListDispatch] = useReducer(
        allianceListReducer,
        allianceListInitialState
    );

    // const [searchKeyword, setSearchKeyword] = useState<string>('');

    useEffect(() => {
        if (searchAppearance) {
            Animated.parallel([
                Animated.timing(inputOpacity, {
                    toValue: 1,
                    duration: 300
                }),
                Animated.timing(searchInputLength, {
                    toValue: SEARCH_WIDTH,
                    duration: 300
                }),
                Animated.timing(cancelOpacity, {
                    toValue: 1,
                    duration: 300
                }),
                Animated.timing(cancelWidth, {
                    toValue: 40,
                    duration: 300
                }),
                // Animated.timing(searchBackgroundAnim, {
                //     toValue: 2,
                //     duration: 300
                // }),
                Animated.timing(searchOpacity, {
                    toValue: 1,
                    duration: 300
                }),
                Animated.timing(allianceListView, {
                    toValue: 1,
                    duration: 300
                })
            ]).start(
                () => {
                    if (isRefObject(inputRef)) {
                        inputRef.current?.focus();
                    }
                }
            );
        }
    }, [searchAppearance])

    const handleClickIconSearch = () => {
        setSearchAppearance(true);
    }

    const handleCancle = () => {
        Animated.parallel([
            Animated.timing(cancelOpacity, {
                toValue: 0,
                duration: 250
            }),
            Animated.timing(cancelWidth, {
                toValue: 7,
                duration: 100
            }),
            Animated.timing(searchInputLength, {
                toValue: 0,
                duration: 250
            }),
            Animated.timing(inputOpacity, {
                toValue: 0,
                duration: 250
            })
        ]).start(() => {
            Keyboard.dismiss();
            Animated.sequence([
                Animated.timing(allianceListView, {
                    toValue: 1000,
                    duration: 250
                }),
                // Animated.timing(searchBackgroundAnim, {
                //     toValue: 1,
                //     duration: 250
                // }),
                // Animated.timing(searchBackgroundAnim, {
                //     toValue: 0,
                //     duration: 250
                // }),
                Animated.timing(searchOpacity, {
                    toValue: 0,
                    duration: 250
                }),
            ]).start(() => {
                allianceListDispatch({type: AllianceListTypes.ALLIANCE_LIST_RESET});
                setSearchAppearance(false);
            })
        }); 
    }

    const onSortPressHandle = (index: number) => {
        setActiveButton(index);
    };

    const onChangeText = (text: string) => {
        console.log(text);
        if (text.length >= 4) {
            fetchData(text);
        }
    }

    const debounceChangeText = useCallback(_.debounce(onChangeText, 500), []);

    const fetchData = async (keyword: string) => {
        allianceListDispatch({type: AllianceListTypes.ALLIANCE_LIST_REQUEST});
        console.log('O day ' + keyword);
        try {
            const result = await axios.get(`https://dev.aladin.today/coalition/public/newsfeed/searchAround?lat=6&lng=106&limit=10&offset=0&keyword=${keyword}`);
            const allianceList : AllianceItemModel[] = result.data.dataArray;
            console.log(result);
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

    const renderItem = (info: ListRenderItemInfo<AllianceItemModel>) => {
        const {item} = info;
        return <AllianceItem data={item} key={item.id} />;
    };

    const keyExtractor = (item: AllianceItemModel) => `${item.id}`;

    return <SafeAreaView 
        style={[
            {
                flex: 1
            },
        ]} 
    >   
            <Modal
                animationType="fade"
                visible={searchAppearance}
                transparent={true}
            >
                <Animated.View style={[
                    {
                        backgroundColor: 'white',
                        opacity: searchOpacity,
                        flex: 1,
                    }
                ]} >
                <SafeAreaView style={{flex: 1}} >
                    <View>
                        <Animated.View style={[{
                            width,
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            paddingHorizontal: 16,
                            opacity: inputOpacity,
                        }]}  
                        >
                            <Animated.View style={{
                                width: searchInputLength,
                                marginRight: 15
                            }} >
                                <InputValidation
                                    leftIcon={'search'}
                                    ref={inputRef}
                                    containerStyle={{height: 40}}
                                    inputContainerStyle={{height: 40, marginHorizontal: 0}}
                                    autoFocus={true}
                                    onChangeText={debounceChangeText}
                                />
                            </Animated.View>
                            <Animated.View style={{opacity: cancelOpacity, width: cancelWidth}} >
                                <TouchableOpacity style={{justifyContent: 'center', height: 40}} onPress={handleCancle} >
                                    <Text style={{
                                        color: '#ff7750',
                                        textAlign: "center",
                                    }} >
                                        Thoát
                                    </Text>
                                </TouchableOpacity>
                            </Animated.View>
                                    
                        </Animated.View>
                    </View>
                    <Animated.View style={{
                        backgroundColor: '#efefef', 
                        flex: 1,
                        transform: [
                            {
                                translateY: allianceListView
                            }
                        ]
                    }} >
                        <View style={{backgroundColor: 'white', marginBottom: 16}} >
                            <SortsHeader
                                activeName={ORDERS[activeButton]}
                                onPress={onSortPressHandle}
                            />
                        </View>
                        {
                            allianceListState.loading ? <AllianceListPlaceHolder /> : 
                            <FlatList
                                contentContainerStyle={
                                    allianceListState.allianceList.length == 0 && styles.container3
                                }
                                refreshing={allianceListState.allianceListRequestStatus === 'REQUEST'}
                                // onRefresh={onRefreshAlliances}
                                data={allianceListState.allianceList}
                                keyExtractor={keyExtractor}
                                renderItem={renderItem}
                                showsVerticalScrollIndicator={false}
                                // onEndReachedThreshold={0.4}
                                // onEndReached={onLoadmoreAlliances}
                            />
                        }
                    </Animated.View>
                    
                </SafeAreaView>
                </Animated.View>
            </Modal>
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flex: 1,
        }}>
            <View style={{width}} >
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{fontSize: 24, marginLeft: 16}} >Xóm lân cận</Text>
                    <TouchableOpacity onPress={handleClickIconSearch} style={{justifyContent: 'center', marginRight: 16, height: 40}} >
                        <Image
                            source={iconsPNG.search}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            
        </View>
        
    </SafeAreaView>
}

const styles = StyleSheet.create({
    buttonsContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingVertical: 8
    },
    buttonStyle: {
        height: 32,
        marginRight: 8
    },
    container3: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default Search;

