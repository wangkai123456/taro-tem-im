import { Text, View } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import { autobind } from '~/modules/@wmeimob/decorator/src';
import styles from './index.modules.less';

interface IMMEmptyProps {
    text: string;
}

@autobind
export default class MMScore extends Component<IMMEmptyProps> {
    static options = {
        addGlobalClass: true
    };

    render() {
        return <View className={styles.MMEmpty}>
            <Text className={styles.text}>暂无数据</Text>
        </View>;
    }
}

