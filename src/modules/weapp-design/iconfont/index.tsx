import { View } from '@tarojs/components';
import { StandardProps } from '@tarojs/components/types/common';
import Taro, { Component } from '@tarojs/taro';
import { autobind } from '@wmeimob/decorator';
import classnames from 'classnames';
import styles from './index.modules.less';


const name = 'MMIconfont';

interface IIconfontProps extends StandardProps {
    value: string;
    color?: string;
    size?: number;
}

interface IIconfontState {
    checked: boolean;
}

@autobind
export default class MMIconfont extends Component<IIconfontProps, IIconfontState> {
    static defaultProps = {
        color: '#000',
        size: 20
    };

    static options = {
        addGlobalClass: true
    };

    render() {
        return <View className={classnames(styles.MMIconfont, styles[`icon${this.props.value}`])}
            style={{ fontSize: this.props.size + 'px', color: this.props.color }}></View>;
    }
}

