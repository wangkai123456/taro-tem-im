import { View } from '@tarojs/components';
import { ITouchEvent } from '@tarojs/components/types/common';
import Taro, { Component } from '@tarojs/taro';
import { autobind, lock } from '~/modules/@wmeimob/decorator/src/components';
import classnames from 'classnames';
import MMLoading from '../loading';
import { MMButtonColor, MMButtonRadius, MMButtonSize, MMButtonType } from './const';
import styles from './index.modules.less';

interface IButtonProps {

    /**
     * 按钮颜色
     *
     * @type {MMButtonColor}
     * @memberof IButtonProps
     */
    color?: MMButtonColor

    /**
     * 加载状态
     *
     * @type {boolean}
     * @memberof IButtonProps
     */
    loading?: boolean

    /**
     * 按钮类型
     *
     * @type {MMButtonType}
     * @memberof IButtonProps
     */
    type?: MMButtonType

    /**
     * 按钮大小
     *
     * @type {MMButtonSize}
     * @memberof IButtonProps
     */
    size?: MMButtonSize

    /**
     * 禁用
     *
     * @type {boolean}
     * @memberof IButtonProps
     */
    disabled?: boolean

    /**
     * 文字
     *
     * @type {string}
     * @memberof IButtonProps
     */
    text?: string

    /**
     * 圆角
     *
     * @type {MMButtonRadius}
     * @memberof IButtonProps
     */
    radius?: MMButtonRadius

    /**
     * 点击事件 返回的是promise 未运行完毕不会触发第二次
     *
     * @type {boolean}
     * @memberof IButtonProps
     */
    onClick?: (event: ITouchEvent) => void | Promise<any>
}

@autobind
export default class MMButton extends Component<IButtonProps> {
    static options = {
        addGlobalClass: true
    };

    static defaultProps = {
        // color: MMButtonColor.Red
    };

    state = {

    };

    get typeClass() {
        switch (this.props.type) {
            case MMButtonType.Hollow:
                return styles.MMButton__type_hollow;
            case MMButtonType.Gradient:
                return styles.MMButton__type_gradient;
            default:
                return '';
        }
    }

    get colorClass() {
        switch (this.props.color) {
            case MMButtonColor.Red:
                return styles.MMButton__red;
            case MMButtonColor.Gray:
                return styles.MMButton__gray;
            default:
                return '';
        }
    }

    get sizeClass() {
        switch (this.props.size) {
            case MMButtonSize.Small:
                return styles.MMButton__small;
            case MMButtonSize.Tiny:
                return styles.MMButton__tiny;
            default:
                return '';
        }
    }

    get radiusClass() {
        switch (this.props.radius) {
            case MMButtonRadius.None:
                return styles.MMButton__radius_none;
            case MMButtonRadius.Large:
                return styles.MMButton__radius_large;
            default:
                return '';
        }
    }

    get disabledClass() {
        if (this.props.disabled) {
            return styles.MMButton__disabled;
        }
        return '';
    }

    render() {
        const { loading, text } = this.props;
        return <View className={classnames(styles.MMButton, this.radiusClass, this.colorClass,
            this.typeClass, this.sizeClass, this.disabledClass)}
            onClick={this.onClick}>
            <View className={styles.MMButton_content}>
                {loading && <View className={styles.MMButton_loading}>
                    <MMLoading width={styles.loadingSize} height={styles.loadingSize} />
                </View>}
                <View>{this.props.children}{text}</View>
            </View>
        </View>;
    }

    @lock()
    private onClick(event: ITouchEvent) {
        if (this.props.disabled) {
            return;
        }
        return this.props.onClick && this.props.onClick(event);
    }
}

