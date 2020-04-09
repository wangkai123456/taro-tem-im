import { View } from '@tarojs/components';
import Taro, { Component, Config } from '@tarojs/taro';
import { autobind } from '~/modules/@wmeimob/decorator/src/components';
import * as styles from './index.module.less';
import MMNavigation from '~/modules/@wmeimob/weapp-design/src/components/navigation';

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
                <MMNavigation title="首页" />
            </View>
        );
    }
}
