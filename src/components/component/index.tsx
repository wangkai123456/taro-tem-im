
import { View } from '@tarojs/components';
import Taro, { Component, Config } from '@tarojs/taro';
import { ComponentType } from 'react';
import * as styles from './index.module.less';

class Index extends Component {
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

export default Index as ComponentType;
