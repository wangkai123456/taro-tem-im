
import { View } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import * as styles from './index.module.less';

export default class Index extends Component {
    state = {
    };

    onClick() {
        Taro.navigateBack({
            delta: 1
        });
    }

    render() {
        return (
            <View className={styles.page}>
                组件
                {this.props.children}
            </View>
        );
    }
}
