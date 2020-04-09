import { View } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import styles from './index.modules.less';
import { autobind } from '~/modules/@wmeimob/decorator/src/components';

@autobind
export default class MMItemRightText extends Component {
    static options = {
        addGlobalClass: true
    };

    static defaultProps = {
        textAlign: 'right'
    };

    state = {
    }

    render() {
        return <View className={styles.rightText}>{this.props.children}</View>;
    }
}
