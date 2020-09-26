export interface AllianceItemModel {
    id: number,
    coalitionAvatar: string,
    coalitionName: string,
    memberNum: number,
    farmScore: number,
    coalitionType?: 'FOR_SILVER',
    distance: number
}