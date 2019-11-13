import { View } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import { autobind } from '@wmeimob/decorator';
import styles from './index.modules.less';
import MMIconFont from '../icon-font';
import { MMIconFontName } from '../const';
import themes from '../styles/themes/default.modules.less';
import classNames from 'classnames';

interface ICheckboxProps {
    /**
     * 点击事件
     *
     * @memberof ICheckboxProps
     */
    onClick?: () => void;

    /**
     * 左侧渲染
     *
     * @type {(JSX.Element | string)}
     * @memberof ICheckboxProps
     */
    renderLeft?: JSX.Element | string;
    /**
     * 左侧图标
     *
     * @type {MMIconFontName}
     * @memberof ICheckboxProps
     */
    leftIconfontValue?: MMIconFontName;
    /**
     * 左侧图标颜色
     *
     * @type {string}
     * @memberof ICheckboxProps
     */
    leftIconfontColor?: string;
    /**
     * 左侧文字
     *
     * @type {string}
     * @memberof ICheckboxProps
     */
    leftText?: string

    /**
     * 右侧渲染
     *
     * @type {(JSX.Element | string)}
     * @memberof ICheckboxProps
     */
    renderRight?: JSX.Element | string;
    /**
     * 右侧渲染图片
     *
     * @type {(MMIconFontName | string)}
     * @memberof ICheckboxProps
     */
    rightIconfontValue?: MMIconFontName | string;
    /**
     * 右侧图标颜色
     *
     * @type {string}
     * @memberof ICheckboxProps
     */
    rightIconfontColor?: string;
    /**
     * 右侧文字
     *
     * @type {string}
     * @memberof ICheckboxProps
     */
    rightText?: string

    /**
     * 分割线是否显示
     *
     * @type {boolean}
     * @memberof ICheckboxProps
     */
    divider?: boolean
}

@autobind
export default class MMItem extends Component<ICheckboxProps> {
    static options = {
        addGlobalClass: true
    };

    static defaultProps = {
        rightIconfontName: MMIconFontName.Next,
        rightIconfontNameColor: themes.gray5,
        divider: true,
        onClick: () => null
    };

    get className() {
        const classnames = [styles.content];

        if (this.props.divider) {
            classnames.push(styles.divider);
        }

        return classnames;
    }

    render() {
        const { renderRight, onClick, renderLeft, leftText, leftIconfontColor: leftIconfontNameColor, rightIconfontColor: rightIconfontNameColor, rightText, leftIconfontValue: leftIconfontName, rightIconfontValue: rightIconfontName } = this.props;
        return <View onClick={onClick} className={styles.MMItem}>
            {leftIconfontName && <View className={styles.leftIconfont}>
                <MMIconFont color={leftIconfontNameColor} value={leftIconfontName}></MMIconFont>
            </View>}
            <View className={classNames(this.className)}>
                <View className={styles.left}>
                    {leftText && <View className={styles.leftText}>{leftText}</View>}
                    {renderLeft}
                    {this.props.renderLeft}
                </View>
                <View className={styles.right}>
                    {this.props.renderRight}
                    {renderRight}
                    {rightText && <View className={styles.rightText}>{rightText}</View>}
                    {rightIconfontName && <MMIconFont color={rightIconfontNameColor} value={rightIconfontName}></MMIconFont>}
                </View>
            </View>
        </View>;
    }
}
