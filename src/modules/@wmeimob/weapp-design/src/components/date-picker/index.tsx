import { View } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import dayjs, { UnitType } from 'dayjs';
import { MMDatePickerType } from './const';
import styles from './index.modules.less';
import MMPicker from '../picker';
import { autobind } from '~/modules/@wmeimob/decorator/src/components';

interface IMMDatePickerProps {

    /**
     * 默认时间
     *
     * @type {Date}
     * @memberof IMMDatePickerProps
     */
    defaultValue?: Date

    /**
     * 当前选中时间
     *
     * @type {Date}
     * @memberof IMMImagePickerProps
     */
    value?: Date

    /**
     * 类型
     *
     * @type {MMDatePickerType}
     * @memberof IMMDatePickerProps
     */
    type?: MMDatePickerType

    /**
     * 图片值
     *
     * @type {string[]}
     * @memberof IMMImagePickerProps
     */
    minDate?: Date

    /**
     * 图片值
     *
     * @type {string[]}
     * @memberof IMMImagePickerProps
     */
    maxDate?: Date

    /**
     * 是否显示
     *
     * @type {boolean}
     * @memberof IMMDatePickerProps
     */
    visible: boolean

    /**
     * 点击确定事件
     *
     * @memberof MMPickerProps
     */
    onOk: (value: Date) => void;

    /**
     * 点击取消
     *
     * @memberof MMPickerProps
     */
    onCancel: () => void;

    /**
     * 改变事件
     *
     * @memberof IMMDatePickerProps
     */
    onChange?: (value: Date) => void;
}

@autobind
export default class MMDatePicker extends Component<IMMDatePickerProps> {
    static typeKeyObject: { [key: string]: UnitType[] } = {
        [MMDatePickerType.date]: ['year', 'month', 'date'],
        [MMDatePickerType.time]: ['hour', 'minute'],
        [MMDatePickerType.dateTime]: ['year', 'month', 'date', 'hour', 'minute'],
        [MMDatePickerType.year]: ['year'],
        [MMDatePickerType.month]: ['month']
    }

    static options = {
        addGlobalClass: true
    };

    static defaultProps = {
        type: MMDatePickerType.dateTime,
        minDate: new Date(),
        maxDate: dayjs().add(10, 'year').toDate()
    };

    state = {
        value: this.props.defaultValue || this.props.minDate
    }

    private get dateValue(): Date {
        if (this.props.value) {
            return this.props.value;
        }

        return this.state.value as Date;
    }

    private get pickerValue() {
        const day = dayjs(this.dateValue);
        return MMDatePicker.typeKeyObject[this.props.type as MMDatePickerType].map(value => day[value]().toString())
    }

    render() {
        const { visible, onCancel } = this.props;
        return <View className={styles.MMDatePicker}>
            <MMPicker visible={visible} data={this.getDate()} value={this.pickerValue}
                onChange={this.onChange.bind(this)} onOk={this.onOk} onCancel={onCancel}></MMPicker>
        </View >;
    }

    componentDidMount() {
        // const data = this.correct(new Date('2000-09-09 09:09:09'));
        // console.log(dayjs(data).format());
    }

    getyearString() {
        const { maxDate, minDate } = this.props;

        const minDateDay = dayjs(minDate as Date);
        const maxDateDay = dayjs(maxDate as Date);
        const yearArray: {
            id: string,
            text: string
        }[] = [];

        for (let index = minDateDay.year(); index <= maxDateDay.year(); index++) {
            yearArray.push({
                id: index.toString(),
                text: index.toString()
            });
        }

        return yearArray;
    }

    getmonthString() {
        const dateArray: {
            id: string,
            text: string
        }[] = [];

        const { maxDate, minDate } = this.props;
        const min = dayjs(minDate as Date);
        const max = dayjs(maxDate as Date);
        const day = dayjs(this.dateValue);

        let minMonth = 0;
        let maxMonth = 11;

        if (day.year() === min.year()) {
            minMonth = min.month();
        }

        if (day.year() === max.year()) {
            maxMonth = max.month();
        }

        for (let index = minMonth; index <= maxMonth; index++) {
            dateArray.push({
                id: index.toString(),
                text: (index + 1).toString() + '月'
            });
        }

        return dateArray;
    }

    getdateString() {
        const dateArray: {
            id: string,
            text: string
        }[] = [];

        const { maxDate, minDate } = this.props;
        const min = dayjs(minDate as Date);
        const max = dayjs(maxDate as Date);
        const day = dayjs(this.dateValue);

        let minDay = 1;
        let maxDay = day.endOf('month').date();

        if (day.year() === min.year() && day.month() === min.month()) {
            minDay = min.date();
        }

        if (day.year() === max.year() && day.month() === max.month()) {
            maxDay = max.date();
        }

        for (let index = minDay; index <= maxDay; index++) {
            dateArray.push({
                id: index.toString(),
                text: index.toString() + '日'
            });
        }

        return dateArray;
    }

    gethourString() {
        const dateArray: {
            id: string,
            text: string
        }[] = [];

        const { maxDate, minDate } = this.props;
        const min = dayjs(minDate as Date);
        const max = dayjs(maxDate as Date);
        const day = dayjs(this.dateValue);

        let minHour = 0;
        let maxHour = 23;

        if (day.year() === min.year() && day.month() === min.month() && day.date() === min.date()) {
            minHour = min.hour();
        }

        if (day.year() === max.year() && day.month() === max.month() && day.date() === max.date()) {
            maxHour = max.hour();
        }

        for (let index = minHour; index <= maxHour; index++) {
            dateArray.push({
                id: index.toString(),
                text: index.toString() + '时'
            });
        }

        return dateArray;
    }

    getminuteString() {
        const dateArray: {
            id: string,
            text: string
        }[] = [];

        const { maxDate, minDate } = this.props;
        const min = dayjs(minDate as Date);
        const max = dayjs(maxDate as Date);
        const day = dayjs(this.dateValue);

        let minMinute = 0;
        let maxMinute = 59;

        if (day.year() === min.year() && day.month() === min.month() && day.date() === min.date() && day.hour() === min.hour()) {
            minMinute = min.minute();
        }

        if (day.year() === max.year() && day.month() === max.month() && day.date() === max.date() && day.hour() === min.hour()) {
            maxMinute = max.minute();
        }

        for (let index = minMinute; index <= maxMinute; index++) {
            dateArray.push({
                id: index.toString(),
                text: index.toString() + '分'
            });
        }

        return dateArray;
    }

    private onOk() {
        if (this.props.value) {
            this.props.onOk(this.props.value);
        } else {
            this.props.onOk(this.props.minDate as any);
        }
    }

    private onChange(index: number, value: string) {
        let day = dayjs(this.dateValue)
        const keyList: UnitType[] = MMDatePicker.typeKeyObject[this.props.type as MMDatePickerType];
        day = day.set(keyList[index], Number(value));

        const dataValue = this.correct(day.toDate());

        this.setState({
            value: dataValue
        })
        this.props.onChange && this.props.onChange(dataValue);
    }

    private correct(date: Date) {
        const keyList: UnitType[] = ['year', 'month', 'date', 'hour', 'minute', 'second']
        let day = dayjs(date);

        if (date.getTime() < (this.props.minDate as Date).getTime()) {
            const minDay = dayjs(this.props.minDate);
            keyList.find(value => {
                if (day[value]() < minDay[value]()) {
                    day = day.set(value, minDay[value]());
                }

                if (day.toDate().getTime() < (this.props.minDate as Date).getTime()) {
                    return false;
                }
                return true;
            })
        } else if (date.getTime() > (this.props.maxDate as Date).getTime()) {
            const maxDay = dayjs(this.props.maxDate);

            keyList.find(value => {
                if (day[value]() > maxDay[value]()) {
                    day = day.set(value, maxDay[value]());
                }

                if (day.toDate().getTime() > (this.props.minDate as Date).getTime()) {
                    return false;
                }
                return true;
            })
        }

        return day.toDate();
    }

    private getDate() {
        const keyList: UnitType[] = MMDatePicker.typeKeyObject[this.props.type as MMDatePickerType];

        return keyList.map(value => this[`get${value}String`]())
    }
}

