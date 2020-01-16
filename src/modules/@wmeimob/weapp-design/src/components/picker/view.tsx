import { Swiper, SwiperItem, View } from '@tarojs/components';
import { BaseEventOrig } from '@tarojs/components/types/common';
import Taro, { Component } from '@tarojs/taro';
import { autobind } from '~/modules/@wmeimob/decorator/src';
import styles from './index.modules.less';
import themesStyles from '../styles/themes/default.modules.less';
import MMDivider from '../divider';

interface MMPickerViewProps {
    data: { id: string; text: string }[];
    value: string;
    onChange: (value: string) => void;
}

@autobind
export default class MMPickerView extends Component<MMPickerViewProps> {
    static options = {
        addGlobalClass: true
    };

    static defaultProps = {
        data: []
    };

    render() {
        const current = this.props.data.findIndex(value => value.id === this.props.value);
        return <View className={styles.MMPicker}>
            <Swiper className={styles.swiper} display-multiple-items={5} vertical={true} current={current} onChange={this.onChange}>
                <SwiperItem><View className={styles.item}></View></SwiperItem>
                <SwiperItem><View className={styles.item}></View></SwiperItem>
                {this.props.data.map((item, index) => <SwiperItem key={item.id}>
                    <View style={this.getStyle(index)} className={styles.item}>{item.text}</View>
                </SwiperItem>)}
                <SwiperItem><View className={styles.item}></View></SwiperItem>
                <SwiperItem><View className={styles.item}></View></SwiperItem>
            </Swiper>
            <View className={styles.select}>
            </View>
        </View>;
    }

    private onChange(event: BaseEventOrig<{ current: number }>) {
        this.props.onChange(this.props.data[event.detail.current].id)
    }

    private getStyle(currentIndex) {
        const index = this.props.data.findIndex(value => value.id === this.props.value);

        const abs = Math.abs(currentIndex - index);

        if (abs === 1) {
            return {
                color: themesStyles.gray5,
                fontSize: '14px'
            }
        } else if (abs > 1) {
            return {
                color: themesStyles.gray4,
                fontSize: '12px'
            }
        }

        return {
        }
    }
}

