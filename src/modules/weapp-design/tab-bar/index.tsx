import { View } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import { autobind } from '@wmeimob/decorator';
import MMIconfont from '../iconfont';
import styles from './index.modules.less';
import classNames from 'classnames';
import { isNewIphone } from '../utils';

interface IMMTabBarData {
    iconfont: string;
    text: string;
    url: string;
    redHot?: boolean;
    count?: number
}

interface IMMTabBarProps {
    /**
     * 数据
     *
     * @type {{
     *         iconfont: string;
     *         text: string;
     *     }[]}
     * @memberof IMMTabBarProps
     */
    defaultData?: IMMTabBarData[];

    /**
     * 点击事件 返回false 可以组织页面的跳转
     *
     * @memberof IMMTabBarProps
     */
    onClick?: (data: IMMTabBarData) => boolean | void;

}

export interface IMMTabBarState {
    /**
     * 当前页面index
     *
     * @type {number}
     * @memberof IMMTabBarState
     */
    currPageIndex: number

    /**
     * 记录页面的所有数据
     *
     * @type {IMMTabBarData[]}
     * @memberof IMMTabBarState
     */
    data: IMMTabBarData[];
}

const MMTabBarList: MMTabBar[] = [];
let recordData: IMMTabBarData[];
@autobind
export default class MMTabBar extends Component<IMMTabBarProps, IMMTabBarState> {
    static currPageIndex = 0

    static options = {
        addGlobalClass: true
    };

    static defaultProps: Partial<IMMTabBarProps> = {
        defaultData: []
    };

    state = {
        currPageIndex: MMTabBar.currPageIndex,
        // eslint-disable-next-line no-invalid-this
        data: recordData || this.props.defaultData
    }

    render() {
        const { currPageIndex, data } = this.state;

        return <View>
            <View className={styles.MMTabBar_placeholder}></View>
            {isNewIphone && <View className="spacing-iphone"></View>}
            <View className={styles.MMTabBar}>
                <View className={styles.content} >
                    {data.map((value, index) =>
                        <View
                            key={value.text}
                            className={this.getClassName(index)}
                            onClick={() => this.onClick(value, index)}>
                            <MMIconfont value={value.iconfont} size={20} color={currPageIndex === index ?
                                styles.primaryColor : styles.tabBarFontColor} ></MMIconfont>
                            {value.text}
                            {value.redHot && <View className={styles.redDot}></View>}
                            {value.count && <View className={styles.count}>{value.count}</View>}
                        </View>)}
                </View>
                {isNewIphone && <View className="spacing-iphone"></View>}
            </View>
        </View>;
    }

    componentDidMount() {
        // eslint-disable-next-line prefer-destructuring
        if (!recordData) {
            recordData = this.props.defaultData as any;
        }
        MMTabBarList.push(this);
    }

    setRedDot(index: number, redHot: boolean) {
        this.setAllState({
            data: this.state.data.map((value, dataIndex) => {
                if (index === dataIndex) {
                    value.redHot = redHot;
                }
                return value;
            })
        })
    }

    setCount(index: number, count: number) {
        this.setAllState({
            data: this.state.data.map((value, dataIndex) => {
                if (index === dataIndex) {
                    value.count = count;
                }
                return value;
            })
        })
    }

    setAllState(state: Partial<IMMTabBarState>) {
        MMTabBarList.forEach(value => value.setState(state as IMMTabBarState))
    }

    private getClassName(index) {
        const { currPageIndex } = this.state;
        return classNames(styles.item, currPageIndex === index ? styles.selected : {});
    }

    private onClick(data: IMMTabBarData, index: number) {
        if (index !== this.state.currPageIndex) {
            MMTabBarList.forEach(value => value.setState({
                currPageIndex: index
            }))
            MMTabBar.currPageIndex = index;
            Taro.switchTab({
                url: data.url
            });
        }
    }
}
