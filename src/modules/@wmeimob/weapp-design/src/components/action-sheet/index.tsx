import { View } from '@tarojs/components';

import Taro, { Component } from '@tarojs/taro';
import MMModal from '../modal/modal';
import classnames from 'classnames';
import styles from './index.modules.less'
import { autobind } from '@wmeimob/decorator';
import { MMModalAnimationType, MMModalJustifyContent } from '../modal/const';
import H2 from '../head/h2';

interface IMMActionSheetProps {
    /**
     * 标题
     *
     * @type {string}
     * @memberof IMMActionSheetProps
     */
    title?: string;

    /**
     * 是否显示
     *
     * @type {boolean}
     * @memberof IMMActionSheetProps
     */
    visible: boolean;
    /**
     * 选项
     *
     * @type {boolean}
     * @memberof IMMActionSheetProps
     */
    options: string[];

    /**
     * 关闭事件
     *
     * @memberof IMMActionSheetProps
     */
    onClose: () => void;

    /**
     * 点击选项
     *
     * @memberof IMMActionSheetProps
     */
    onOptionsClick?: (value: string, index: number) => void;
}

@autobind
export default class MMActionSheet extends Component<IMMActionSheetProps> {
    static options = {
        addGlobalClass: true
    };

    static defaultProps = {
        options: []
    };

    get contentClassName() {
        const classNameArray = [styles.MMActionSheet];

        if (!this.props.visible) {
            classNameArray.push(styles.content__hide);
        }

        return classnames(...classNameArray);
    }

    onOptionsClick(value: string, index: number) {
        this.props.onOptionsClick && this.props.onOptionsClick(value, index);
        this.props.onClose();
    }

    render() {
        return <MMModal onClose={this.props.onClose} visible={this.props.visible}
            justifyContent={MMModalJustifyContent.flexEnd} animationType={MMModalAnimationType.down}
            className={styles.MMActionSheet}>
            <View className={this.contentClassName}>
                <View className={styles.title}>
                    <H2>{this.props.title}</H2>
                </View>
                {this.props.options.map((value, index) => <View onClick={() => this.onOptionsClick(value, index)}
                    key={value + index} className={styles.item}>{value}</View>)}
                <View onClick={this.props.onClose} className={styles.cancel}>取消</View>
            </View>
        </MMModal>;
    }
}

