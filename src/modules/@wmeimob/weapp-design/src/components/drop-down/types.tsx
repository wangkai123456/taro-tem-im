import MMIconFontName from "../icon-font/name";

export enum IMMDropDownDataType {
    Single,
    Select
}

export type IDropDownData = IDropDownDataSelect | IDropDownDataSingle;

export interface IDropDownDataBase {

    /**
     * id
     *
     * @type {string}
     * @memberof IDropDownDataBase
     */
    id: string

    /**
     * 文本内容
     *
     * @type {string}
     * @memberof IDropDownData
     */
    value: string

    /**
     * iconfont
     *
     * @type {string}
     * @memberof IDropDownData
     */
    iconfont?: MMIconFontName

}

/**
 * 单个选项
 *
 * @export
 * @interface IDropDownDataSingle
 * @extends {IDropDownDataBase}
 */
export interface IDropDownDataSingle extends IDropDownDataBase {
    type: IMMDropDownDataType.Single
}

export interface IDropDownDataSelect extends IDropDownDataBase {
    type: IMMDropDownDataType.Select
    data: string[]
}

