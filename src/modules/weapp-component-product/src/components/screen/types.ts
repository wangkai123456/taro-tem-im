export enum IScreenType {
    /**
     * 默认
     */
    default,

    /**
     * 单选
     */
    singleElection,

    /**
     * 多选
     */
    multipleElection
}

export type IScreenItem = IScreenItemDefault | IScreenItemSingleElection | IScreenItemMultipleElection;

export interface IScreenItemBase {
    id: string
    type: IScreenType
}

/**
 * 默认筛选
 *
 * @export
 * @interface IScreenItemDefault
 */
export interface IScreenItemDefault extends IScreenItemBase {
    type: IScreenType.default
    data: string
}

/**
 * 单选筛选
 *
 * @export
 * @interface IScreenItemSingleElection
 */
export interface IScreenItemSingleElection extends IScreenItemBase {
    type: IScreenType.singleElection
    value: string
    data: IScreenSingleElectionData[]
}

export interface IScreenSingleElectionData {
    id: string
    value: string
}

/**
 * 多选筛选
 *
 * @export
 * @interface IScreenItemMultipleElection
 */
export interface IScreenItemMultipleElection extends IScreenItemBase {
    type: IScreenType.multipleElection
    value: string
    data: IScreenSingleElectionData[]
}
