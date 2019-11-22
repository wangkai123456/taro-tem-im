/* eslint-disable no-console */
import { View } from '@tarojs/components';
import Taro, { Component, Config } from '@tarojs/taro';
import { ComponentType } from 'react';
import { autobind } from '@wmeimob/decorator';
import H2 from '~/modules/@wmeimob/weapp-design/src/components/head/h2';
import MMItem from '~/modules/@wmeimob/weapp-design/src/components/item';
import MMNavigation from '~/modules/@wmeimob/weapp-design/src/components/navigation';
import MMTabBar from '~/modules/@wmeimob/weapp-design/src/components/tab-bar';
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
                    <MMItem leftText="装饰器" onClick={() => Taro.navigateTo({
                        url: '/pages/decorator/index'
                    })}></MMItem>
                    <View className='spacing'></View>
                    <MMItem leftText="透明MMNavigation" onClick={() => Taro.navigateTo({
                        url: '/pages/transparent/index'
                    })}></MMItem>

                    <View className='spacing'></View>
                    <MMItem leftText="mobx和自定义组件" onClick={() => Taro.navigateTo({
                        url: '/pages/mobx/index'
                    })}></MMItem>

                    <View className='spacing'></View>
                    <MMItem leftText="跳转登录页" onClick={() => Taro.navigateTo({
                        url: '/pages/login/index'
                    })}></MMItem>

                    <View className='spacing'></View>
                    <MMItem leftText="商品组件" onClick={() => Taro.navigateTo({
                        url: '/pages/product/index'
                    })}></MMItem>
                </View>

                <MMTabBar></MMTabBar>
            </View>
        );
    }
}

export default Index as ComponentType;
