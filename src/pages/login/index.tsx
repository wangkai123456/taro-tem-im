import { View, Button } from '@tarojs/components';
import Taro, { Component, Config } from '@tarojs/taro';
import { ComponentType } from 'react';
import { autobind } from '~/components/decorator';
import * as styles from './index.module.scss';

@autobind
class Index extends Component {
    config: Config = {
        navigationBarTitleText: '登录'
    };

    state = {

    };

    componentDidMount() {
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

    render() {
        return (<View className={styles.page}>
            <Button onClick={this.onClick}>跳转到test页面</Button>
        </View>);
    }
}

export default Index as ComponentType;
