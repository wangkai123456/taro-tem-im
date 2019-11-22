import { View } from '@tarojs/components';
import Taro, { Component, Config } from '@tarojs/taro';
import { ComponentType } from 'react';
import * as styles from './index.module.less';
import { autobind } from '@wmeimob/decorator';
import MMNavigation from '~/modules/@wmeimob/weapp-design/src/components/navigation';

@autobind
class Index extends Component {
    config: Config = {
        navigationBarTitleText: '',
        navigationStyle: 'custom'
    };

    state = {

    };

    // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
    componentDidMount() {
        // eslint-disable-next-line no-console
        console.log('this.$router', this.$router.params);
    }

    render() {
        return (<View className={styles.page}>
            <MMNavigation title='测试'></MMNavigation>
        </View>);
    }
}

export default Index as ComponentType;

