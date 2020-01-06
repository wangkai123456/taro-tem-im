/* eslint-disable no-console */
import { View, ScrollView } from '@tarojs/components';
import { ITouch, ITouchEvent } from '@tarojs/components/types/common';
import Taro, { Component } from '@tarojs/taro';
import classname from 'classnames';
import { autobind } from '@wmeimob/decorator';
import { MMPullToRefreshState } from './const';
import styles from './index.modules.less';
import MMLoading from '../loading';
import { MMLoadingType } from '../loading/types';

interface IMMPullToRefreshProps {
    /**
     * 状态
     *
     * @type {MMPullToRefreshState}
     * @memberof IMMPullToRefreshProps
     */
    state: MMPullToRefreshState;

    /**
     * 没有更多
     *
     * @type {boolean}
     * @memberof IMMPullToRefreshProps
     */
    noMore: boolean;

    /**
     * 刷新事件回调
     *
     * @memberof IMMPullToRefreshProps
     */
    onRefresh: () => void;

    /**
     * 滚动到地步回调
     *
     * @memberof IMMPullToRefreshProps
     */
    onScrollToLower: () => void;

    /**
     * 渲染底部 低于无更多
     *
     * @memberof IMMPullToRefreshProps
     */
    renderFooter?: JSX.Element
}

interface IMMPullToRefreshState {
    pulling: boolean
    top: number;
    scrollViewHeight: number;

}

@autobind
export default class MMPullToRefresh extends Component<IMMPullToRefreshProps, IMMPullToRefreshState> {
    static options = {
        addGlobalClass: true
    };

    static defaultProps = {
    };

    static loadingHeight = 50;

    static getDerivedStateFromProps(nextProps: IMMPullToRefreshProps, prevState: IMMPullToRefreshState) {
        if (nextProps.state === MMPullToRefreshState.refreshing) {
            return {
                top: MMPullToRefresh.loadingHeight,
                pulling: false
            }
        }
        if (prevState.pulling) {
            return null
        }

        return {
            top: 0
        };
    }

    public state: IMMPullToRefreshState = {
        pulling: false,
        scrollViewHeight: 0,
        // eslint-disable-next-line no-invalid-this
        top: this.props.state === MMPullToRefreshState.refreshing ? MMPullToRefresh.loadingHeight : 0
    };

    /**
     * 当前滚动条高度
     *
     * @private
     * @memberof MMPullToRefresh
     */
    private scrollTop = 0;

    /**
     * 记录开始startTouch
     *
     * @private
     * @type {ITouch}
     * @memberof MMPullToRefresh
     */
    private startTouch: ITouch | undefined;

    /**
     * 可以拖动开始
     *
     * @private
     * @memberof MMPullToRefresh
     */
    private get canPull() {
        if (this.props.state !== MMPullToRefreshState.none) {
            return false;
        }

        if (this.scrollTop > 5) {
            return false;
        }
        return true;
    }

    private get classNameContent() {
        const classNames = [styles.content];
        if (this.props.state === MMPullToRefreshState.refreshing) {
            classNames.push(styles.content__refreshing);
        }

        return classname(...classNames);
    }

    componentDidMount() {
        this.calculateScrollViewHeight();
    }

    render() {
        const { state } = this.props;
        const nu = MMPullToRefreshState.refreshing;
        const height = MMPullToRefresh.loadingHeight;
        const style = this.state.scrollViewHeight !== 0 ? { height: this.state.scrollViewHeight + 'px' } : {};
        return <View className={styles.MMPullToRefresh}>
            <View id="MMPullToRefreshTop"></View>
            <ScrollView scrollY={true} throttle={false} style={style} onScroll={this.onScroll} lowerThreshold={100} onScrollToLower={this.onScrollToLower}>
                <View className={this.classNameContent} style={{ top: this.state.top + 'px' }} onTouchMove={this.onTouchMove} onTouchEnd={this.onTouchEnd} >
                    <View className={styles.loading} style={{ marginTop: -height + 'px', height: height + 'px' }}>
                        {/* {this.getRefresh()} */}
                        <MMLoading width={20} type={MMLoadingType.Black} height={20}></MMLoading>
                    </View>
                    {this.props.children}
                    {state !== nu && this.renderPull()}
                    {this.props.renderFooter}
                </View>
            </ScrollView>
        </View>;
    }

    private renderPull() {
        const { noMore } = this.props;
        return <View className={styles.more}>
            {
                noMore ? '没有更多了' : <MMLoading width={20} type={MMLoadingType.Black} height={20}></MMLoading>
            }
        </View>
    }

    // private getRefresh() {
    //     if (this.state.top === MMPullToRefresh.loadingHeight) {
    //         return this.props.state === MMPullToRefreshState.refreshing ? '刷新中' : '松开刷新';
    //     }
    //     return '下拉刷新';
    // }

    private onScrollToLower() {
        if (this.props.state !== MMPullToRefreshState.pushing && !this.props.noMore) {
            this.props.onScrollToLower();
        }
    }

    private onScroll(event) {
        this.scrollTop = event.target.scrollTop;
    }

    private async calculateScrollViewHeight() {
        const topViewRes = await this.getViewRes('#MMPullToRefreshTop');
        Taro.getSystemInfo({
            success: res => {
                this.setState({
                    scrollViewHeight: res.screenHeight - topViewRes.top
                });
            }
        });
    }

    private getViewRes(name: string) {
        return new Promise<Taro.clientRectElement>((resolve) => {
            const query = Taro.createSelectorQuery().in(this.$scope);
            query.select(name).boundingClientRect((res) => {
                res && resolve(res as Taro.clientRectElement);
            }).exec();
        });
    }

    private onTouchMove(event: ITouchEvent) {
        if (!this.canPull) {
            this.startTouch = undefined;
            if (this.props.state !== MMPullToRefreshState.refreshing) {
                this.setState({
                    top: 0
                });
            }
            return;
        }

        const [touche] = event.touches;
        if (!this.startTouch) {
            this.startTouch = touche;
            return;
        }

        const top = touche.clientY - this.startTouch.clientY;
        if (top > 0) {
            this.setTop(top);
        }
    }

    private setTop(top: number) {
        let stateTop = top;
        if (stateTop > MMPullToRefresh.loadingHeight) {
            stateTop = MMPullToRefresh.loadingHeight;
        }
        this.setState({
            pulling: true,
            top: stateTop
        });
    }

    private async onTouchEnd(_event: ITouchEvent) {
        if (!this.canPull) {
            return;
        }

        if (this.state.top < MMPullToRefresh.loadingHeight) {
            // console.log('下拉距离不够');
            this.setState({ top: 0 });
            this.startTouch = undefined;
            return;
        }

        this.setState({ top: MMPullToRefresh.loadingHeight });
        this.startTouch = undefined;

        this.props.onRefresh();
    }
}
