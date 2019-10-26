import { View } from '@tarojs/components';
import { ITouchEvent } from '@tarojs/components/types/common';
import Taro, { Component } from '@tarojs/taro';
import classnames from 'classnames';
import { MMButtonSize, MMButtonType, MMButtonRadius, MMButtonState } from './const';
import { autobind, lock } from '@wmeimob/decorator';
import styles from './index.modules.less'

interface IButtonProps {

    /**
     * 按钮状态
     *
     * @type {MMButtonState}
     * @memberof IButtonProps
     */
    state?: MMButtonState

    /**
     * 按钮类型
     *
     * @type {MMButtonType}
     * @memberof IButtonProps
     */
    type?: MMButtonType;

    /**
     * 按钮大小
     *
     * @type {MMButtonSize}
     * @memberof IButtonProps
     */
    size?: MMButtonSize;

    /**
     * 是否设置为行内按钮
     *
     * @type {boolean}
     * @memberof IButtonProps
     */
    inline?: boolean;

    /**
     * 禁用
     *
     * @type {boolean}
     * @memberof IButtonProps
     */
    disabled?: boolean;

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
    onClick?: (event: ITouchEvent) => void;
}

@autobind
export default class MMButton extends Component<IButtonProps> {
    static options = {
        addGlobalClass: true
    };

    static defaultProps = {
        block: true
    };

    state = {

    };

    get typeClass() {
        switch (this.props.type) {
            case MMButtonType.Hollow:
                return styles.MMButton__type_hollow;
            case MMButtonType.White:
                return styles.MMButton__type_white;
            default:
                return '';
        }
    }

    get stateClass() {
        switch (this.props.state) {
            case MMButtonState.Success:
                return styles.MMButton__success;
            case MMButtonState.Warning:
                return styles.MMButton__warning;
            case MMButtonState.Danger:
                return styles.MMButton__danger;
            case MMButtonState.Cool:
                return styles.MMButton__cool;
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

    get inlineClass() {
        if (this.props.inline) {
            return styles.MMButton__inline;
        }
        return '';
    }

    get disabledClass() {
        if (this.props.disabled) {
            return styles.MMButton__disabled;
        }
        return '';
    }

    render() {
        return <View className={classnames(styles.MMButton, this.stateClass, this.radiusClass,
            this.typeClass, this.sizeClass, this.inlineClass, this.disabledClass)}
            onClick={this.onClick}>
            <View className={styles.MMButton_content}>
                {this.props.children}
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

