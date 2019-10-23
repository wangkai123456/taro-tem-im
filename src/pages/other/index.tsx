/* eslint-disable no-console */
import { View } from '@tarojs/components';
import Taro, { Component, Config } from '@tarojs/taro';
import { ComponentType } from 'react';
import { autobind } from '~/components/decorator';
import H2 from '~/modules/weapp-design/head/h2';
import MMItem from '~/modules/weapp-design/item';
import MMNavigation from '~/modules/weapp-design/navigation';
import MMTabBar from '~/modules/weapp-design/tab-bar';
import * as styles from './index.module.less';

@autobind
class Index extends Component {
    config: Config = {
        navigationBarTitleText: '',
        navigationStyle: 'custom'
    };

    state = {

    };

    render() {
        return (
            <View className={styles.page}>
                <MMNavigation title="其他"></MMNavigation>
                <View className='spacing'></View>
                <View className='container'>
                    <H2>其他</H2>
                    <View className='spacing'></View>
                    <MMItem onClick={() => Taro.navigateTo({
                        url: '/pages/decorator/index'
                    })}>装饰器</MMItem>
                    <View className='spacing'></View>
                    <MMItem onClick={() => Taro.navigateTo({
                        url: '/pages/transparent/index'
                    })}>透明MMNavigation</MMItem>

                    <View className='spacing'></View>
                    <MMItem onClick={() => Taro.navigateTo({
                        url: '/pages/mobx/index'
                    })}>mobx和自定义组件</MMItem>
                </View>

                <MMTabBar></MMTabBar>
            </View>
        );
    }
}

export default Index as ComponentType;
