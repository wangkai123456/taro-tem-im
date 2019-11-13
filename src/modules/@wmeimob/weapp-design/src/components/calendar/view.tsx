import { View, ScrollView } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import { autobind } from '@wmeimob/decorator';
import classNames from 'classnames';
import dayjs from 'dayjs';
import styles from './index.modules.less';
import { MMButton } from '..';
import MMPopup from '../modal/popup';

export interface IMMCalendarViewProps {
    /**
     * 选中的区间
     *
     * @type {[Date, Date]}
     * @memberof IMMCalendarProps
     */
    value: [Date, Date] | [Date] | []
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
}
interface IMMCalendarViewState {
    scrollViewHeight: number
    monthsNumber: number
}
@autobind
export class MMCalendarView extends Component<IMMCalendarViewProps, IMMCalendarViewState> {
    static options = {
        addGlobalClass: true
    };

    static defaultProps = {
        minDate: new Date(),
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
            <View className={styles.weekTitle}>
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
        this.calculateScrollViewHeight();
    }

    private onConfirm() {
        if (this.props.value.length !== 2) {
            this.popup.toast('请选择');
            return;
        }
        this.props.onClick();
    }

    private async calculateScrollViewHeight() {
        const topViewRes = await this.getViewRes('#MMCalendarViewTop');
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

        if (this.props.value.length === 0 || this.props.value.length === 2) {
            this.props.onSelect([day])
            return;
        }

        let days: [Date, Date] = [this.props.value[0], day];
        if (this.props.value[0].getTime() > day.getTime()) {
            days = [days[1], days[0]];
        }
        this.props.onSelect(days)
    }

    private renderDate() {
        const { minDate, maxDate } = this.props;
        const { monthsNumber } = this.state;
        const diffNumber = dayjs(maxDate).diff(dayjs(minDate), 'month');
        const monthsNu = monthsNumber > diffNumber + 1 ? diffNumber + 1 : monthsNumber;
        const monthhsArray = new Array(monthsNu).fill(1);
        return monthhsArray.map((value, index) => {
            const day = dayjs(minDate).add(index, 'month').startOf('month');
            const dayArrayEmpty = new Array(day.day()).fill('1');
            const dayArrayLength = day.endOf('month').date();
            return <View key={value + index}  >
                <View className={styles.month}>{day.format('YYYY年MM')}</View>
                <View className={styles.date}>
                    {dayArrayEmpty.map((dayArray, index) => <View key={dayArray + index} className={styles.item}>空</View>)}
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
            return <View key={date + index} className={styles.item} onClick={this.onClick.bind(this, dayDate)}>
                <View className={this.getItemClassName(day)}>{index + 1}</View>
                <View className={styles.itemStart}>{text}</View>
            </View >
        })
    }

    private getItemClassName(day: dayjs.Dayjs) {
        const classnames = [styles.itemText];

        if (this.isDisable(day)) {
            classnames.push(styles.disable);
        } else {
            if (this.isSelected(day)) {
                classnames.push(styles.selected);
            }
        }

        return classNames(...classnames)
    }

    private isDisable(dayjs: dayjs.Dayjs) {
        const day = dayjs.add(1, 'day');
        if (day.isBefore(this.props.minDate as Date) || day.isAfter(this.props.maxDate as Date)) {
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
