import { View } from '@tarojs/components';
import Taro, { Component, Config } from '@tarojs/taro';
import { autobind } from '~/modules/@wmeimob/decorator/src';
import * as styles from './index.module.less';

@autobind
export default class Page extends Component {
    config: Config = {
        navigationBarTitleText: '',
        navigationStyle: 'custom'
    };

    state = {

    };

    render() {
        return (
            <View className={styles.page}>
            </View>
        );
    }
}
