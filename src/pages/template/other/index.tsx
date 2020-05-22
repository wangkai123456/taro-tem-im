/* eslint-disable no-console */
import { View } from '@tarojs/components';
import Taro, { Component, Config } from '@tarojs/taro';
import { ComponentType } from 'react';
import { autobind } from '~/modules/@wmeimob/decorator/src/components';
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
                <MMNavigation title="其他" />
                <View className='spacing' />
                <View className='container'>
                    <H2>其他</H2>
                    <View className='spacing' />
                    <MMItem text="装饰器" onClick={() => Taro.navigateTo({
                        url: '/pages/template/decorator/index'
                    })} />
                    <View className='spacing' />
                    <MMItem text="透明MMNavigation" onClick={() => Taro.navigateTo({
                        url: '/pages/template/transparent/index'
                    })} />

                    <View className='spacing' />
                    <MMItem text="mobx和自定义组件" onClick={() => Taro.navigateTo({
                        url: '/pages/template/mobx/index'
                    })} />

                    <View className='spacing' />
                    <MMItem text="跳转登录页" onClick={() => Taro.navigateTo({
                        url: '/pages/template/login/index'
                    })} />

                </View>

                <MMTabBar path={this.$router.path} />
            </View>
        );
    }
}

export default Index as ComponentType;
