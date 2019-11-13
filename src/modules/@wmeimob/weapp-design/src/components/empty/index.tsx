import { View, Image, Text } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import { autobind } from '@wmeimob/decorator';
import bank from './images/bank.png';
import styles from './index.modules.less'

interface IMMEmptyProps {
    /**
     * 文本
     *
     * @type {string}
     * @memberof IMMEmptyProps
     */
    text?: string;

    /**
     * 图片地址
     *
     * @type {string}
     * @memberof IMMEmptyProps
     */
    src?: string
}

@autobind
export default class MMEmpty extends Component<IMMEmptyProps> {
    static defaultProps = {
        src: bank,
        text: '暂无数据'
    }

    static options = {
        addGlobalClass: true
    };

    render() {
        const { text, src } = this.props;
        return <View className={styles.MMEmpty}>
            <Image className={styles.image} src={src as string}></Image>
            <Text className={styles.text}>{text}</Text>
        </View>;
    }
}

