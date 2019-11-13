import { View } from '@tarojs/components';

import Taro, { Component } from '@tarojs/taro';
import { autobind } from '@wmeimob/decorator';
import styles from './index.modules.less';

@autobind
export default class H3 extends Component {
    static options = {
        addGlobalClass: true
    };

    render() {
        return <View className={styles.MMHead_h4}>
            {this.props.children}
        </View>;
    }
}

