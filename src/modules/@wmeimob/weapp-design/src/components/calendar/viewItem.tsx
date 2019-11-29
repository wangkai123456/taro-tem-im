import { View } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import { autobind } from '@wmeimob/decorator';
import styles from './index.modules.less';
import dayjs from 'dayjs';
import classNames from 'classnames';

interface IMMCalendarItemProps {
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
     * 性能优化是否在屏幕中
     *
     * @type {boolean}
     * @memberof IMMCalendarItemProps
     */
    inScreen: boolean

    /**
     * 当前月
     *
     * @type {Date}
     * @memberof IMMCalendarItemProps
     */
    day: Date

    /**
     * 禁止日期
     *
     * @type {[Date, Date][]}
     * @memberof IMMCalendarViewProps
     */
    disableDate?: [Date, Date][]

    /**
     * 选择
     *
     * @memberof IMMCalendarProps
     */
    onSelect: (value: [Date, Date] | [Date] | []) => void

    /**
     * 选择区间包含禁止日期
     *
     * @memberof IMMCalendarViewProps
     */
    onSelectHasDisableDate?: (value: [Date, Date] | [Date] | []) => void
}

@autobind
export default class MMCalendarItem extends Component<IMMCalendarItemProps> {
    static options = {
        addGlobalClass: true
    };

    static defaultProps = {
    }

    /**
     * 是否是禁用日期
     *
     * @static
     * @param {[Date, Date][]} disableDate 禁用列表
     * @param {Date} date 用于判断的日期
     * @returns
     * @memberof MMCalendarItem
     */
    static hasDisableDate(disableDate: [Date, Date][], date: Date) {
        const day = dayjs(date);
        return !!disableDate.find(([min, max]) => {
            return day.isAfter(dayjs(min).add(-1, 'day'), 'day') && day.isBefore(dayjs(max).add(1, 'day'), 'day');
        })
    }

    dateState: { [key: string]: { disable: boolean } } = {}

    shouldComponentUpdate(nextProps: IMMCalendarItemProps) {
        if (nextProps.disableDate !== this.props.disableDate) {
            this.dateState = {};
            return true;
        }

        if (nextProps.inScreen !== this.props.inScreen) {
            return true;
        }

        if (nextProps.inScreen) {
            return true;
        }

        return false;
    }

    render() {
        const { day: dayDate } = this.props;
        const day = dayjs(dayDate);
        const dayArrayEmpty = new Array(day.day()).fill('1');
        const dayArrayLength = day.endOf('month').date();
        return dayDate && <View className={styles.monthBox} >
            <View id={'MMCalendarItem' + dayDate.getTime()}></View>
            <View>
                <View className={styles.month}>{day.format('YYYY年MM月')}</View>
                <View className={styles.date}>
                    {dayArrayEmpty.map((dayArray, index) => <View key={dayArray + index} className={styles.item}></View>)}
                    {this.renderDateItem(dayArrayLength, day)}
                </View>
            </View>
        </View>
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

    private haveDisable([min, max]: [Date, Date]) {
        const { disableDate } = this.props;
        const minDay = dayjs(min);
        const maxDay = dayjs(max);

        if (disableDate && disableDate.find(([min, max]) => minDay.isBefore(dayjs(min), 'day') && maxDay.isAfter(dayjs(max), 'day'))) {
            return true;
        }

        return false;
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
        const format = day.format();
        let dateState = this.dateState[format];
        if (dateState) {
            return dateState.disable;
        }
        dateState = {
            disable: false
        };
        this.dateState[format] = dateState;

        const { disableDate } = this.props;
        if (day.isBefore(this.props.minDate as Date, 'day') || day.isAfter(this.props.maxDate as Date, 'day')) {
            dateState.disable = true;
            return dateState.disable;
        }

        if (disableDate && MMCalendarItem.hasDisableDate(disableDate, day.toDate())) {
            dateState.disable = true;
            return dateState.disable;
        }

        return dateState.disable;
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

