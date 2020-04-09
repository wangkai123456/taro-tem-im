import { View } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import { autobind } from '~/modules/@wmeimob/decorator/src/components';
import dayjs from 'dayjs';
import { MMModalAnimationType, MMModalJustifyContent } from '../modal/const';
import MMModal from '../modal/index';
import MMModalPopupTitle from '../modal/title';
import styles from './index.modules.less';
import { IMMCalendarViewProps, MMCalendarView } from './view';

interface IMMCalendarProps extends IMMCalendarViewProps {
    /**
     * 是否显示
     *
     * @type {boolean}
     * @memberof IMMCalendarProps
     */
    visible: boolean

    /**
     * 弹窗关闭事件
     *
     * @memberof IMMCalendarProps
     */
    onClose: () => void
}

interface IMMCalendarState {
    monthsNumber: number
}

@autobind
export default class MMCalendar extends Component<IMMCalendarProps, IMMCalendarState> {
    static options = {
        addGlobalClass: true
    };

    static defaultProps = {
        minDate: new Date(),
        maxDate: dayjs(new Date()).add(12, 'month').toDate(),
        initalMonths: 2
    }

    calendarView: MMCalendarView

    state: IMMCalendarState = {
        monthsNumber: this.props.initalMonths || MMCalendar.defaultProps.initalMonths
    }

    render() {
        return <MMModal visible={this.props.visible} animationType={MMModalAnimationType.down}
            justifyContent={MMModalJustifyContent.flexEnd} onClose={this.props.onClose}>
            <MMModalPopupTitle title="日期选择" onCancel={this.props.onClose} onOk={this.props.onClick} />
            <View className={styles.MMCalendar}>
                <MMCalendarView ref={ref => this.calendarView = ref as MMCalendarView}
                    scrollViewHeight={450} {...this.props} />
            </View>
        </MMModal >;
    }
}

