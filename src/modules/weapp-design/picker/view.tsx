import { View, ScrollView } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import { autobind, throttle } from '@wmeimob/decorator';

import styles from '../styles/components/picker/index.modules.less';

interface MMPickerViewProps {
    data: { value: string; text: string }[];
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

    static itemHeight = styles.itemHeight;

    state = {
        index: 0,
        scrollTop: 0
    };

    private scrollTop = 0;

    private changeST;

    private touching = false;

    render() {
        const { scrollTop } = this.state;

        // console.log(scrollTop);
        return <View className={styles.MMPicker}>
            <ScrollView className={styles.scrollview} scrollTop={this.getScrollTop()} throttle={false} scrollY scrollWithAnimation
                onScroll={this.onScroll} onTouchStart={this.onTouchStart} onTouchEnd={this.onTouchEnd}>
                <View className={styles.placeholder}></View>
                {this.props.data.map((item, index) => <View key={item.value} className={styles.item}
                    style={this.getStyle(index)}>{item.text}</View>)}
                <View className={styles.placeholder}></View>
            </ScrollView>
            <View className={styles.select}></View>
        </View>;
    }

    private getStyle(index) {
        const result = Math.abs(index * MMPickerView.itemHeight - this.scrollTop);
        const start = MMPickerView.itemHeight / 2;
        const end = MMPickerView.itemHeight * 3.8;
        if (result < start) {
            return {
                opacity: 1
            }
        }

        const proportion = (end - start - result) / (end - start);
        // const scale = (MMPickerView.itemHeight * 6 - start - result) / (MMPickerView.itemHeight * 6 - start);
        // const translateY = result / MMPickerView.itemHeight * -10;
        return {
            opacity: 0.8 * proportion
            // transform: `scale(${scale}) translate(0, ${translateY}px)`
        }
    }

    private getScrollTop() {
        return MMPickerView.itemHeight * this.props.data.findIndex(value => value.value === this.props.value);
    }

    @throttle(20)
    private onScroll(event) {
        this.scrollTop = event.target.scrollTop;
        this.setState({
            scrollTop: event.target.scrollTop
        })
        this.onChange();
    }

    private onTouchStart() {
        this.touching = true;
        this.onChange();
    }

    private onTouchEnd() {
        this.touching = false;
        this.onChange();
    }

    private onChange() {
        if (!this.touching) {
            clearTimeout(this.changeST);
            this.changeST = setTimeout(() => this.props.onChange(this.props.data[Math.round(this.scrollTop / MMPickerView.itemHeight)].value), 100);
        }
    }
}

