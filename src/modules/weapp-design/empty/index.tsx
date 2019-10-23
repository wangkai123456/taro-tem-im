import { View, Image, Text } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import { autobind } from '@wmeimob/decorator';
import bank from './images/bank.png';
import styles from './index.modules.less'

interface IMMEmptyProps {
    text: string;
}

@autobind
export default class MMEmpty extends Component<IMMEmptyProps> {
    static options = {
        addGlobalClass: true
    };

    render() {
        return <View className={styles.MMEmpty}>
            <Image className={styles.image} src={bank}></Image>
            <Text className={styles.text}>暂无数据</Text>
        </View>;
    }
}

