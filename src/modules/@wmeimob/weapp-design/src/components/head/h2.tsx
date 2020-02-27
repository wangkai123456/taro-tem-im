import { View } from '@tarojs/components';

import Taro, { Component } from '@tarojs/taro';
import { autobind } from '~/modules/@wmeimob/decorator/src/components';
import styles from './index.modules.less';

@autobind
export default class H2 extends Component {
    static options = {
        addGlobalClass: true
    };

    render() {
        return <View className={styles.MMHead_h2}>
            {this.props.children}
        </View>;
    }
}

