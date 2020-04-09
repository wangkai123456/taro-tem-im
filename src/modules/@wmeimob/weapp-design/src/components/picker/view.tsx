import { Swiper, SwiperItem, View } from '@tarojs/components';
import { BaseEventOrig } from '@tarojs/components/types/common';
import Taro, { Component } from '@tarojs/taro';
import { autobind } from '~/modules/@wmeimob/decorator/src/components';
import themesStyles from '../styles/themes/default.modules.less';
import styles from './index.modules.less';

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
        let current = this.props.data.findIndex(value => value.id === this.props.value);
        if (current === -1) {
            current = 0;
        }
        return <View className={styles.MMPicker}>
            <Swiper className={styles.swiper} display-multiple-items={5} vertical={true}
                duration={0} current={current} onChange={this.onChange}>
                <SwiperItem><View className={styles.item} /></SwiperItem>
                <SwiperItem><View className={styles.item} /></SwiperItem>
                {this.props.data.map((item, index) => <SwiperItem key={item.id}>
                    <View style={this.getStyle(index)} className={styles.item}>{item.text}</View>
                </SwiperItem>)}
                <SwiperItem><View className={styles.item} /></SwiperItem>
                <SwiperItem><View className={styles.item} /></SwiperItem>
            </Swiper>
            <View className={styles.select} />
        </View>;
    }

    private onChange(event: BaseEventOrig<{ current: number }>) {
        const current = this.props.data.findIndex(value => value.id === this.props.value);
        if (current === event.detail.current) {
            return;
        }
        this.props.onChange(this.props.data[event.detail.current].id)
    }

    private getStyle(currentIndex) {
        let index = this.props.data.findIndex(value => value.id === this.props.value);
        if (index === -1) {
            index = 0;
        }
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

