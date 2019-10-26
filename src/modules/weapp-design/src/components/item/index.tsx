import { View } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import { autobind } from '@wmeimob/decorator';
import styles from './index.modules.less';
import MMIconFont from '../icon-font';
import { MMIconFontName } from '../const';
import themes from '../styles/themes/default.modules.less';
import classNames from 'classnames';

interface ICheckboxProps {
    onClick?: () => void;

    renderLeft?: JSX.Element | string;
    leftIconfontName?: MMIconFontName;
    leftIconfontNameColor?: string;
    leftText?: string

    renderRight?: JSX.Element | string;
    rightIconfontName?: MMIconFontName | string;
    rightIconfontNameColor?: string;
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
        rightIconfontName: MMIconFontName.ArrowRight,
        rightIconfontNameColor: themes.gray5,
        divider: true
    };

    get className() {
        const classnames = [styles.content];

        if (this.props.divider) {
            classnames.push(styles.divider);
        }

        return classnames;
    }

    render() {
        const { renderRight, renderLeft, onClick, leftText, leftIconfontNameColor, rightIconfontNameColor, rightText, leftIconfontName, rightIconfontName } = this.props;
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
