import { ScrollView, View } from '@tarojs/components';
import { BaseEventOrig, ITouchEvent } from '@tarojs/components/types/common';
import Taro, { Component } from '@tarojs/taro';
import { autobind, debounce } from '@wmeimob/decorator';
import dayjs from 'dayjs';
import { MMButton } from '..';
import MMPopup from '../modal/popup';
import styles from './index.modules.less';
import MMCalendarItem from './viewItem';

export interface IMMCalendarViewProps {
    /**
     * 选中的区间
     *
     * @type {[Date, Date]}
     * @memberof IMMCalendarProps
     */
    value: [Date, Date] | [Date] | []

    /**
     * 禁止日期
     *
     * @type {[Date, Date][]}
     * @memberof IMMCalendarViewProps
     */
    disableDate?: [Date, Date][]

    /**
     * 选择区间包含禁止日期
     *
     * @memberof IMMCalendarViewProps
     */
    onSelectHasDisableDate?: (value: [Date, Date] | [Date] | []) => void

    /**
     * 选择区间最小值
     *
     * @type {Date}
     * @memberof IMMCalendarProps
     */
    minDate?: Date
    /**
     * 选择区间最大值
     *
     * @type {Date}
     * @memberof IMMCalendarProps
     */
    maxDate?: Date
    /**
     * 初始化月数
     *
     * @type {number}
     * @memberof IMMCalendarProps
     */
    initalMonths?: number
    /**
     * 选择
     *
     * @memberof IMMCalendarProps
     */
    onSelect: (value: [Date, Date] | [Date] | []) => void

    /**
     * 点击确定
     *
     * @memberof IMMCalendarProps
     */
    onClick: () => void

    /**
     * 滚动条高度
     *
     * @type {number}
     * @memberof IMMCalendarViewProps
     */
    scrollViewHeight?: number
}
interface IMMCalendarViewState {
    scrollTop: number
    scrollViewHeight: number
    scrollViewTop: number
    monthsNumber: number
    noMore: boolean
}
/**
 * 日历插件 [性能优化] 日历状态的缓存
 *
 * @export
 * @class MMCalendarView
 * @extends {Component<IMMCalendarViewProps, IMMCalendarViewState>}
 */
@autobind
export class MMCalendarView extends Component<IMMCalendarViewProps, IMMCalendarViewState> {
    static options = {
        addGlobalClass: true
    };

    static defaultProps = {
        disableDate: [],
        minDate: new Date(),
        // maxDate: new Date('2019-11-22'),
        maxDate: dayjs(new Date()).add(1, 'year').toDate(),
        initalMonths: 10
    }

    state: IMMCalendarViewState = {
        scrollTop: 0,
        scrollViewTop: 0,
        scrollViewHeight: 0,
        monthsNumber: this.props.initalMonths || MMCalendarView.defaultProps.initalMonths,
        noMore: false
    }

    popup: MMPopup

    render() {
        const { scrollViewHeight, noMore } = this.state;
        const [startTime, endTime] = this.props.value || [];
        const startTimeString = startTime ? dayjs(startTime).format('YYYY年MM月DD日') : '';
        const endTimeString = endTime ? dayjs(endTime).format('YYYY年MM月DD日') : '';
        return <View className={styles.MMCalendar}>
            <MMPopup ref={ref => this.popup = ref as MMPopup}></MMPopup>
            <View className={styles.weekTitle} onTouchMove={this.onTouchMove}>
                <View>日</View>
                <View>一</View>
                <View>二</View>
                <View>三</View>
                <View>四</View>
                <View>五</View>
                <View>六</View>
            </View>
            <View id="MMCalendarViewTop"></View>
            <ScrollView scrollY throttle={false} style={{ height: scrollViewHeight + 'px' }} onScroll={this.onScroll as any} lowerThreshold={2000} onScrollToLower={this.onScrollToLower}>
                {this.renderDate()}
                <View className={styles.loading}>
                    {noMore ? '' : '加载中'}
                </View>
                <View className={styles.tools}>
                    <View className={styles.toolsContent}>
                        <View className={styles.timeBox}>
                            {startTimeString && <View>开始:{startTimeString}</View>}
                            {endTimeString && <View>结束:{endTimeString}</View>}
                        </View>
                        <View>
                            <MMButton onClick={this.onConfirm}>确定</MMButton>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    }

    componentDidMount() {
        if (this.props.scrollViewHeight) {
            this.setState({
                scrollViewHeight: this.props.scrollViewHeight
            })
        } else {
            this.calculateScrollViewHeight();
        }
    }

    async calculateScrollViewHeight() {
        const topViewRes = await this.getViewRes('#MMCalendarViewTop');
        Taro.getSystemInfo({
            success: res => {
                this.setState({
                    scrollViewTop: topViewRes.top,
                    scrollViewHeight: res.screenHeight - topViewRes.top
                });
            }
        });
    }

    @debounce(200)
    private onScroll(event: BaseEventOrig<{ scrollTop: number }>) {
        this.setState({
            scrollTop: event.detail.scrollTop
        })
    }

    private onTouchMove(event: ITouchEvent) {
        event.stopPropagation();
    }

    private onConfirm() {
        if (this.props.value.length !== 2) {
            this.popup.toast('请选择');
            return;
        }
        this.props.onClick();
    }

    private getViewRes(name: string) {
        return new Promise<Taro.clientRectElement>((resolve) => {
            const query = Taro.createSelectorQuery().in(this.$scope);
            query.select(name).boundingClientRect((res) => {
                resolve(res as Taro.clientRectElement);
            }).exec();
        });
    }

    private onScrollToLower() {
        const diffNumber = dayjs(this.props.maxDate).diff(dayjs(this.props.minDate), 'month');
        if (this.state.monthsNumber < diffNumber + 1) {
            let monthsNumber = this.state.monthsNumber + 3;
            if (monthsNumber > diffNumber + 1) {
                monthsNumber = diffNumber + 1;
            }
            this.setState({
                monthsNumber
            })
        } else {
            this.setState({
                noMore: true
            })
        }
    }

    private renderDate() {
        const { minDate, maxDate, value: PropsValue } = this.props;
        const { monthsNumber, scrollTop } = this.state;
        const diffNumber = dayjs(maxDate).diff(dayjs(minDate), 'month');
        const monthsNu = monthsNumber > diffNumber + 1 ? diffNumber + 1 : monthsNumber;
        const monthhsArray = new Array(monthsNu).fill(1);
        return PropsValue && monthhsArray.map((_value, index) => {
            const day = dayjs(minDate).add(index, 'month').startOf('month').toDate();
            const isScreen = Math.abs(310 * index - scrollTop) < 1000 && Math.abs(scrollTop - 310 * index) < 1000;

            return <View key={day.toString()} >
                <MMCalendarItem inScreen={isScreen} day={day} {...this.props}></MMCalendarItem>
            </View>
        });
    }
}
