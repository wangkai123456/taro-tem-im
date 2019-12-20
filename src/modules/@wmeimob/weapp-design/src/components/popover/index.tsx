import { View } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import { autobind } from '@wmeimob/decorator';
import { MMIconFont } from '..';
import IconFontName from '../icon-font/name';
import styles from './index.modules.less';
import classNames from 'classnames';
import { MMPopoverType } from './const';

interface IMMPopoverProps {
    /**
     * 是否显示
     *
     * @type {boolean}
     * @memberof IModalProps
     */
    visible: boolean;

    /**
     * 数据
     *
     * @type {{ value: string, iconfont: IconFontName }[]}
     * @memberof IMMPopoverProps
     */
    data: { value: string, iconfont: IconFontName }[]

    /**
     * 点击事件
     *
     * @memberof IMMPopoverProps
     */
    onClick: (value: { value: string, iconfont: IconFontName }, index: number) => void

    /**
     * 类型
     *
     * @type {MMPopoverType}
     * @memberof IMMPopoverProps
     */
    type?: MMPopoverType
}

@autobind
export default class MMPopover extends Component<IMMPopoverProps> {
    static options = {
        addGlobalClass: true
    };

    static defaultProps = {
    };

    state = {
        right: false
    }

    render() {
        const className = classNames(styles.MMPopover, this.state.right ? styles.MMPopoverRight : "",
            this.props.type === MMPopoverType.black ? styles.MMPopoverBlack : '',
            this.props.visible ? styles.visible : '');
        return this.props.data && <View
            className={className}>
            <View id="MMPopover" className={styles.queryView}></View>
            {this.props.data.map((value, index) => <View className={styles.item}
                onClick={() => this.props.onClick(value, index)}
                key={value.value}>
                <View className={styles.iconfontView}>
                    <MMIconFont value={value.iconfont} size={22}></MMIconFont>
                </View>
                <View>
                    {value.value}
                </View>
            </View>)}
            <View className={styles.arrow}></View>
        </View>;
    }

    async componentDidMount() {
        const topViewRes = await this.getViewRes('#MMPopover');
        const { screenWidth } = Taro.getSystemInfoSync();
        if (screenWidth - topViewRes.right < 10) {
            this.setState({ right: true })
        }
    }

    private getViewRes(name: string) {
        return new Promise<Taro.clientRectElement>((resolve) => {
            const query = Taro.createSelectorQuery().in(this.$scope);
            query.select(name).boundingClientRect((res) => {
                resolve(res as Taro.clientRectElement);
            }).exec();
        });
    }
}

