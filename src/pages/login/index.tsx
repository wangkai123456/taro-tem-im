import { View, Button } from '@tarojs/components';
import Taro, { Component, Config } from '@tarojs/taro';
import { ComponentType } from 'react';
import { autobind } from '@wmeimob/decorator';
import * as styles from './index.module.less';
import MMNavigation from '~/modules/weapp-design/navigation';

@autobind
class Index extends Component {
    config: Config = {
        navigationBarTitleText: '',
        navigationStyle: 'custom'
    };

    state = {

    };

    componentDidMount() {
        // eslint-disable-next-line no-console
        console.log('this.$router', this.$router.params);
    }

    onClick() {
        Taro.redirectTo({
            url: '/pages/test/index',
            params: {
                test: '????'
            }
        });
    }

    async onLogin() {
        const data = await Taro.login();

        // eslint-disable-next-line no-console
        console.log(data);
        const { userInfo } = await Taro.getUserInfo();
        // eslint-disable-next-line no-console
        console.log(userInfo);
    }

    render() {
        return (<View className={styles.page}>
            <MMNavigation title="登录"></MMNavigation>
            <Button onClick={this.onClick}>跳转到test页面</Button>
            <Button onClick={this.onLogin}>获取微信授权</Button>
        </View>);
    }
}

export default Index as ComponentType;
