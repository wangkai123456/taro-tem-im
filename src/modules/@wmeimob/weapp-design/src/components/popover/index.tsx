import { View } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import { autobind } from '~/modules/@wmeimob/decorator/src/components';
import IconFontName from '../icon-font/const';
import styles from './index.modules.less';
import classNames from 'classnames';
import { MMPopoverType } from './const';
import MMIconFont from '../icon-font';
import { selectRect } from '../utils';

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
            <View id="MMPopover" className={styles.queryView} />
            {this.props.data.map((value, index) => <View className={styles.item}
                onClick={() => this.props.onClick(value, index)}
                key={value.value}>
                <View className={styles.iconfontView}>
                    <MMIconFont value={value.iconfont} size={22} />
                </View>
                <View>
                    {value.value}
                </View>
            </View>)}
            <View className={styles.arrow} />
        </View>;
    }

    async componentDidMount() {
        const topViewRes = await selectRect('#MMPopover', this.$scope);
        const { screenWidth } = Taro.getSystemInfoSync();
        if (screenWidth - topViewRes.right < 10) {
            this.setState({ right: true })
        }
    }
}

