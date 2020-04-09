import { View } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import { autobind } from '~/modules/@wmeimob/decorator/src/components';

import classname from 'classnames';
import styles from './index.modules.less';

interface IMMSwitchProps {
    /**
     *  选中状态
     *
     * @type {boolean}
     * @memberof IMMSwitchProps
     */
    checked: boolean;
    /**
     * 是否禁用
     *
     * @type {boolean}
     * @memberof IMMSwitchProps
     */
    disabled?: boolean;
    /**
     * 改变事件
     *
     * @memberof IMMSwitchProps
     */
    onChange: (checked: boolean) => void;
}

@autobind
export default class MMSwitch extends Component<IMMSwitchProps> {
    static options = {
        addGlobalClass: true
    };

    static defaultProps = {
    };

    get className() {
        const classNames = [styles.MMSwitch];

        if (this.props.disabled) {
            classNames.push(styles.MMSwitch__disabled);
        }

        if (this.props.checked) {
            classNames.push(styles.MMSwitch__checked);
        }

        return classname(...classNames);
    }

    render() {
        return <View className={this.className} onClick={() => !this.props.disabled && this.props.onChange(!this.props.checked)} />;
    }
}
