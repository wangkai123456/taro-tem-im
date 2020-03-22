
import { View } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import * as styles from './index.module.less';

export default class Index extends Component {
    static options = {
        addGlobalClass: true
    };

    state = {
    };

    render() {
        return (
            <View className={styles.item}>
            </View>
        );
    }
}
