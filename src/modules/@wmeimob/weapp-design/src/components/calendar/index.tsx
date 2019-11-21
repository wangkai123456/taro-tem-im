import { View } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import { autobind } from '@wmeimob/decorator';
import dayjs from 'dayjs';
import { H2, MMIconFont, MMModal } from '..';
import { MMIconFontName, MMModalJustifyContent } from '../const';
import { MMModalAnimationType } from '../modal/const';
import styles from './index.modules.less';
import { MMCalendarView, IMMCalendarViewProps } from './view';

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
            <View className={styles.MMCalendar}>
                <View className={styles.title}>
                    <H2>日期选择</H2>
                </View>
                <View className={styles.delete} onClick={this.props.onClose}>
                    <MMIconFont value={MMIconFontName.Close}></MMIconFont>
                </View>
                <View>
                    <MMCalendarView ref={ref => this.calendarView = ref as MMCalendarView} scrollViewHeight={450} {...this.props}></MMCalendarView>
                </View>
            </View>
        </MMModal >;
    }
}

