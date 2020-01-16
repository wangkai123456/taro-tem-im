
import { View } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import classnames from 'classnames';
import { autobind } from '~/modules/@wmeimob/decorator/src';
import { MMModalAnimationType, MMModalJustifyContent } from './const';
import { ITouchEvent } from '@tarojs/components/types/common';
import styles from './index.modules.less';

export interface IMMModalProps {

    /**
     * 是否显示
     *
     * @type {boolean}
     * @memberof IModalProps
     */
    visible: boolean;

    /**
     * 关闭回调
     *
     * @memberof IMMModalProps
     */
    onClose?: () => void;

    /**
     * 是否开启蒙层
     *
     * @type {boolean}
     * @memberof IModalProps
     */
    mask?: boolean;

    /**
     * 动画类型
     *
     * @type {MMModalAnimationType}
     * @memberof IMMModalProps
     */
    animationType?: MMModalAnimationType;

    /**
     * 点击蒙层是否关闭
     *
     * @type {boolean}
     * @memberof IModalProps
     */
    maskClosable?: boolean;

    /**
     * 内容排列方式
     *
     * @type {MMJustifyContent}
     * @memberof IMMModalProps
     */
    justifyContent?: MMModalJustifyContent;

    /**
     * 样式表
     *
     * @type {string}
     * @memberof IMMModalProps
     */
    className?: string;

}

@autobind
export default class MMModal extends Component<IMMModalProps> {
    static options = {
        addGlobalClass: true
    };

    static defaultProps: Partial<IMMModalProps> = {
        mask: true,
        justifyContent: MMModalJustifyContent.center,
        animationType: MMModalAnimationType.fade
    };

    state = {

    };

    private get className() {
        const classNameArray = [styles.MMModal, this.props.className];

        if (!this.props.visible) {
            classNameArray.push(styles.MMModal__hide);

            switch (this.props.animationType) {
                case MMModalAnimationType.down:
                    classNameArray.push(styles.MMModal__hide_down);
                    break;
                case MMModalAnimationType.fade:
                    classNameArray.push(styles.MMModal__hide_fade);
                    break;
                case MMModalAnimationType.none:
                    classNameArray.push(styles.MMModal__hide_none);
                    break;
                default:
                    break;
            }
        } else {
            switch (this.props.animationType) {
                case MMModalAnimationType.down:
                    classNameArray.push(styles.MMModal__show_down);
                    break;
                // case MMModalAnimationType.fade:
                //     classNameArray.push(styles.MMModal__show_down);
                //     break;
                default:
                    break;
            }
        }

        switch (this.props.justifyContent) {
            case MMModalJustifyContent.center:
                classNameArray.push(styles.MMModal__center);
                break;
            case MMModalJustifyContent.flexEnd:
                classNameArray.push(styles.MMModal__flexEnd);
                break;
            case MMModalJustifyContent.flexStart:
                classNameArray.push(styles.MMModal__flexStart);
                break;
            default:
                break;
        }

        return classnames(...classNameArray);
    }

    render() {
        const { mask, children } = this.props;
        return <View className={this.className} onTouchMove={this.onTouchMove}>
            {mask && <View onClick={() => this.props.onClose && this.props.onClose()} className={styles.MMModal_mask}> </View>}
            <View className={styles.MMModal_content}>
                {children}
            </View>
        </View>;
    }

    private onTouchMove(event: ITouchEvent) {
        event.stopPropagation();
    }
}
