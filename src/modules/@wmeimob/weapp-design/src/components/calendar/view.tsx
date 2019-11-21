import { View, ScrollView } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import { autobind } from '@wmeimob/decorator';
import classNames from 'classnames';
import dayjs from 'dayjs';
import styles from './index.modules.less';
import { MMButton } from '..';
import MMPopup from '../modal/popup';
import { ITouchEvent } from '@tarojs/components/types/common';

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
    scrollViewHeight: number
    monthsNumber: number
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
        maxDate: dayjs(new Date()).add(12, 'month').toDate(),
        initalMonths: 4
    }

    state: IMMCalendarViewState = {
        scrollViewHeight: 0,
        monthsNumber: this.props.initalMonths || MMCalendarView.defaultProps.initalMonths
    }

    popup: MMPopup

    render() {
        const { scrollViewHeight } = this.state;
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
            <ScrollView scrollY style={{ height: scrollViewHeight + 'px' }} onScrollToLower={this.onScrollToLower}>
                {this.renderDate()}
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
                    scrollViewHeight: res.screenHeight - topViewRes.top
                });
            }
        });
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
        }
    }

    private onClick(date: string) {
        const day = dayjs(date).toDate();

        if (this.isDisable(dayjs(date))) {
            return;
        }

        if (this.props.value.length === 0 || this.props.value.length === 2) {
            this.props.onSelect([day])
            return;
        }

        let days: [Date, Date] = [this.props.value[0], day];
        if (this.props.value[0].getTime() > day.getTime()) {
            days = [days[1], days[0]];
        }

        if (days.length === 2 && this.haveDisable(days)) {
            this.props.onSelectHasDisableDate && this.props.onSelectHasDisableDate(days);
            this.props.onSelect([]);
            return;
        }

        this.props.onSelect(days)
    }

    private renderDate() {
        const { minDate, maxDate, value: PropsValue } = this.props;
        const { monthsNumber } = this.state;
        const diffNumber = dayjs(maxDate).diff(dayjs(minDate), 'month');
        const monthsNu = monthsNumber > diffNumber + 1 ? diffNumber + 1 : monthsNumber;
        const monthhsArray = new Array(monthsNu).fill(1);
        return PropsValue && monthhsArray.map((value, index) => {
            const day = dayjs(minDate).add(index, 'month').startOf('month');
            const dayArrayEmpty = new Array(day.day()).fill('1');
            const dayArrayLength = day.endOf('month').date();
            return <View key={value + index} className={styles.monthBox} >
                <View className={styles.month}>{day.format('YYYY年MM月')}</View>
                <View className={styles.date}>
                    {dayArrayEmpty.map((dayArray, index) => <View key={dayArray + index} className={styles.item}></View>)}
                    {this.renderDateItem(dayArrayLength, day)}
                </View>
            </View>
        });
    }

    private renderDateItem(data: number, dayMonth: dayjs.Dayjs) {
        const { value } = this.props;
        return new Array(data).fill('2').map((date, index) => {
            const day = dayMonth.add(index, 'day');
            const isStart = value && value[0] && day.format("YYYYMMDD") === dayjs(value[0]).format("YYYYMMDD");
            const isEnd = value && value[1] && day.format("YYYYMMDD") === dayjs(value[1]).format("YYYYMMDD");
            let text = '';
            if (isStart && isEnd) {
                text = '起/止';
            } else if (isStart) {
                text = '起';
            } else if (isEnd) {
                text = '止';
            }

            // 这里必须要用bind 和 字符串类型配合 不然传不进去 taro bug
            const dayDate = day.format();
            return <View key={date + index}
                className={this.getItemClassName([styles.item, isStart ? styles.isStart : '', isEnd ? styles.isEnd : ''], day)}
                onClick={this.onClick.bind(this, dayDate)}>
                < View className={classNames(styles.itemContent, (isStart || isEnd) ? styles.isStart : '')}>
                    <View className={styles.itemText}>{index + 1}</View>
                    <View className={styles.itemStart}>{text}</View>
                </View>
            </View >
        })
    }

    private getItemClassName(classnames: string[], day: dayjs.Dayjs) {
        if (this.isDisable(day)) {
            classnames.push(styles.disable);
        } else if (this.props.value.length === 2 && this.isSelected(day)) {
            if (day.day() === 6 || day.date() === day.endOf('month').date()) {
                classnames.push(styles.isEnd);
            }
            if (day.day() === 0 || day.date() === 1) {
                classnames.push(styles.isStart);
            }
            classnames.push(styles.selected);
        }

        return classNames(...classnames)
    }

    private isDisable(day: dayjs.Dayjs) {
        const { disableDate } = this.props;
        if (day.isBefore(this.props.minDate as Date, 'day') || day.isAfter(this.props.maxDate as Date, 'day')) {
            return true;
        }

        if (disableDate && disableDate.find(([min, max]) => {
            return day.isAfter(dayjs(min).add(-1, 'day'), 'day') && day.isBefore(dayjs(max).add(1, 'day'), 'day');
        })) {
            return true;
        }

        return false;
    }

    private haveDisable([min, max]: [Date, Date]) {
        const { disableDate } = this.props;
        const minDay = dayjs(min);
        const maxDay = dayjs(max);

        if (disableDate && disableDate.find(([min, max]) => minDay.isBefore(dayjs(min), 'day') && maxDay.isAfter(dayjs(max), 'day'))) {
            return true;
        }

        return false;
    }

    private isSelected(dayjs: dayjs.Dayjs) {
        if (!this.props.value || this.props.value.length === 0) {
            return false;
        }

        if (dayjs.isSame(this.props.value[0], 'date')) {
            return true;
        }

        if (this.props.value.length === 2 && (dayjs.isSame(this.props.value[1], 'date') ||
            dayjs.isAfter(this.props.value[0]) && dayjs.isBefore(this.props.value[1]))) {
            return true
        }

        return false;
    }
}
