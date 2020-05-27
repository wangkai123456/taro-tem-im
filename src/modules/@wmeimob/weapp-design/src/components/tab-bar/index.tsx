import { View, Image } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import { autobind } from '~/modules/@wmeimob/decorator/src/components';
import MMIconFont from '../icon-font';
import styles from './index.modules.less';
import classNames from 'classnames';
import { isNewIphone } from '../utils';
import MMBadge from '../badge';
import MMIconFontName from '../icon-font/name';

interface IMMTabBarData {
    /**
     * 图标
     *
     * @type {string}
     * @memberof IMMTabBarData
     */
    image?: any

    /**
     * 选中时候的样式
     *
     * @type {*}
     * @memberof IMMTabBarData
     */
    imageSelected?: any

    /**
     * iconfont值
     *
     * @type {string}
     * @memberof IMMTabBarData
     */
    iconfont?: string;
    /**
     * 文字
     *
     * @type {string}
     * @memberof IMMTabBarData
     */
    text: string;
    /**
     * 跳转连接
     *
     * @type {string}
     * @memberof IMMTabBarData
     */
    url: string;
    /**
     * 红点
     *
     * @type {boolean}
     * @memberof IMMTabBarData
     */
    redHot?: boolean;
    /**
     * 未读数
     *
     * @type {number}
     * @memberof IMMTabBarData
     */
    count?: number
}

interface IMMTabBarProps {
    /**
     * 点击事件 返回false 可以组织页面的跳转
     *
     * @memberof IMMTabBarProps
     */
    onClick?: (data: IMMTabBarData) => boolean | void;

    path?: string
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
     * 导航数据
     *
     * @type {IMMTabBarData[]}
     * @memberof IMMTabBarState
     */
    data: IMMTabBarData[];
}

const MMTabBarList: MMTabBar[] = [];

@autobind
export default class MMTabBar extends Component<IMMTabBarProps, IMMTabBarState> {
    static currPageIndex = 0

    static options = {
        addGlobalClass: true
    };

    static defaultProps: Partial<IMMTabBarProps> = {
    };

    state: IMMTabBarState = {
        currPageIndex: MMTabBar.currPageIndex,
        data: [
            {
                image: styles.sop,
                imageSelected: styles.sopHover,
                text: '基础',
                url: '/pages/template/index/index'
            },
            {
                iconfont: MMIconFontName.Send,
                text: '请求',
                url: '/pages/template/request/index'
            },
            {
                iconfont: MMIconFontName.Class,
                text: '其他',
                url: '/pages/template/other/index'
            }
        ]
    }

    componentDidShow() {
        this.setPath();
    }

    render() {
        const { currPageIndex, data } = this.state;

        return <View>
            <View className={styles.MMTabBar_placeholder} />
            {isNewIphone && <View className="spacingIphone" />}
            <View className={styles.MMTabBar}>
                <View className={styles.content} >
                    {data.map((value, index) =>
                        <View
                            key={value.text}
                            className={this.getClassName(index)}
                            onClick={() => this.onClick(value, index)}>
                            <View className={styles.iconfont}>
                                {
                                    value.image ?
                                        <View className={classNames(styles.image, currPageIndex === index ? value.imageSelected : value.image)} /> :
                                        <MMIconFont value={value.iconfont as string} size={styles.iconSize} color={currPageIndex === index ?
                                            styles.primaryColor : styles.tabBarFontColor} />
                                }
                            </View>
                            <View className={styles.text}>
                                {value.text}
                            </View>
                            {value.redHot && <MMBadge absolute />}
                            {value.count && <View className={styles.count}><MMBadge value={value.count} digit={2} absolute /></View>}
                        </View>)}
                </View>
                {isNewIphone && <View className="spacingIphone" />}
            </View>
        </View>;
    }

    componentDidMount() {
        MMTabBarList.push(this);
        this.setPath();
    }

    setPath() {
        const { path } = this.props;
        if (path) {
            this.setAllState({
                currPageIndex: this.state.data.findIndex(value => value.url === path.replace(/\?.*$/g, ''))
            })
        }
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
