import { AllianceItemModel } from "models/AllianceItem";
import { Pageable } from "models/Pageable";
import { RequestStatus, IAction } from "sagas/baseTypes";


export enum AllianceListTypes {
    ALLIANCE_LIST_REQUEST = '@@AllianceList/ALLIANCE_LIST_REQUEST',
    ALLIANCE_LIST_SUCCESS = '@@AllianceList/ALLIANCE_LIST_SUCCESS',
    ALLIANCE_LIST_FAILURE = '@@AllianceList/ALLIANCE_LIST_FAILURE',
    ALLIANCE_LIST_REFRESH = '@@AllianceList/ALLIANCE_LIST_REFRESH',
    ALLIANCE_LIST_FIRST_LOADING = '@@AllianceList/ALLIANCE_LIST_FIRST_LOADING',
    ALLIANCE_LIST_RESET = '@@Alliancelist/ALLIANCE_LIST_RESET'
}

export interface IAllianceListState {
    allianceList: AllianceItemModel[],
    loading?: boolean,
    refreshing: boolean,
    error?: Error,
    pageable: Pageable,
    allianceListRequestStatus?: RequestStatus
}

interface IAllianceListPayload {
    datas: AllianceItemModel[],
    pageable: Pageable
}

interface ActionAllianceListRequest extends IAction<AllianceListTypes.ALLIANCE_LIST_REQUEST> {}
interface ActionAllianceListSuccess extends IAction<AllianceListTypes.ALLIANCE_LIST_SUCCESS, IAllianceListPayload> {}
interface ActionAllianceListFailure extends IAction<AllianceListTypes.ALLIANCE_LIST_FAILURE, Error> {}
interface ActionAllianceListLoading extends IAction<AllianceListTypes.ALLIANCE_LIST_FIRST_LOADING> {}
interface ActionAllianceListRefresh extends IAction<AllianceListTypes.ALLIANCE_LIST_REFRESH> {}
interface ActionAllianceListReset extends IAction<AllianceListTypes.ALLIANCE_LIST_RESET> {}

export type AllianceListActions = ActionAllianceListRequest 
| ActionAllianceListSuccess
| ActionAllianceListFailure
| ActionAllianceListLoading
| ActionAllianceListRefresh
| ActionAllianceListReset
;


