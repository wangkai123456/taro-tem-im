import { View, Text } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import { autobind } from '~/modules/@wmeimob/decorator/src';
import classnames from 'classnames';
import styles from './index.modules.less';

interface IButtonProps {
    /**
     * 值
     *
     * @type {number}
     * @memberof IButtonProps
     */
    value?: number | string

    /**
     * 位数
     *
     * @type {number}
     * @memberof IButtonProps
     */
    digit?: number

    /**
     * 绝对定位
     *
     * @type {boolean}
     * @memberof IButtonProps
     */
    absolute?: boolean
}

@autobind
export default class MMBadge extends Component<IButtonProps> {
    get className() {
        const classNames = [styles.MMBadge];

        if (this.props.value !== undefined) {
            classNames.push(styles.MMBadgeNumber);
        }

        return classnames(...classNames)
    }

    get value() {
        const { value, digit } = this.props;
        if (digit !== undefined && typeof (value) === 'number') {
            const max = Math.pow(10, digit) - 1;
            return value > max ? max + '+' : value;
        }
        return value;
    }

    render() {
        const { absolute } = this.props;
        return <View className={absolute ? styles.MMBadgeAbsolute : ''}>
            <View className={this.className} >
                <Text>{this.value === undefined ? 0 : this.value}</Text>
            </View>
        </View>;
    }
}

