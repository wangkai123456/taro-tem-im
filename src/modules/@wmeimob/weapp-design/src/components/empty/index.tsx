import { Image, Text, View } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import { autobind } from '@wmeimob/decorator';
import { MMEmptyType } from './const';
import contacts from './images/contacts.png';
import grade from './images/grade.png';
import internet from './images/internet.png';
import location from './images/location.png';
import message from './images/message.png';
import record from './images/record.png';
import update from './images/update.png';
import styles from './index.modules.less';
import classNames from 'classnames';

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

    /**
     * kon
     *
     * @type {MMEmptyType}
     * @memberof IMMEmptyProps
     */
    type?: MMEmptyType

    /**
     * 浮动居中
     *
     * @type {boolean}
     * @memberof IMMEmptyProps
     */
    fixed?: boolean
}

@autobind
export default class MMEmpty extends Component<IMMEmptyProps> {
    static defaultProps = {
        fixed: true
    }

    static options = {
        addGlobalClass: true
    };

    private get src() {
        if (this.props.src) {
            return this.props.src;
        }

        switch (this.props.type) {
            case MMEmptyType.Contacts:
                return contacts;
            case MMEmptyType.Grade:
                return grade;
            case MMEmptyType.Internet:
                return internet;
            case MMEmptyType.Location:
                return location;
            case MMEmptyType.Message:
                return message;
            case MMEmptyType.Record:
                return record;
            case MMEmptyType.Update:
                return update;
            default:
                return grade;
        }
    }

    private get text() {
        if (this.props.text) {
            return this.props.text;
        }

        switch (this.props.type) {
            case MMEmptyType.Contacts:
                return '暂无联系人~';
            case MMEmptyType.Grade:
                return '暂无评分~';
            case MMEmptyType.Internet:
                return '连接失败~';
            case MMEmptyType.Location:
                return '获取地址失败~';
            case MMEmptyType.Message:
                return '暂无消息~';
            case MMEmptyType.Record:
                return '暂无记录~';
            case MMEmptyType.Update:
                return '暂无更新~';
            default:
                return '数据为空~';
        }
    }

    render() {
        return <View className={classNames(styles.MMEmpty, this.props.fixed ? styles.fixed : '')}>
            <Image className={styles.image} src={this.src as string}></Image>
            <Text className={styles.text}>{this.text}</Text>
        </View>;
    }
}

