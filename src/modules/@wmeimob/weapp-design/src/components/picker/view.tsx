import { View, ScrollView } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import { autobind, throttle } from '@wmeimob/decorator';
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

    static itemHeight = styles.itemHeight;

    static getScrollTop(dataValue, data) {
        return MMPickerView.itemHeight * data.findIndex(value => value.id === dataValue);
    }

    state = {
        index: 0,
        scrollTop: MMPickerView.getScrollTop(this.props.value, this.props.data),
        scrollViewScrollTop: MMPickerView.getScrollTop(this.props.value, this.props.data)
    };

    private changeST;
    private canChange;

    render() {
        return <View className={styles.MMPicker}>
            <ScrollView className={styles.scrollview} scrollTop={this.state.scrollViewScrollTop}
                throttle={false} scrollY
                onScroll={this.onScroll} onTouchStart={this.onTouchStart} onTouchEnd={this.onTouchEnd}>
                <View className={styles.placeholder}></View>
                {this.props.data.map((item, index) => <View key={item.id} className={styles.item}
                    style={this.getStyle(index)}>{item.text}</View>)}
                <View className={styles.placeholder}></View>
            </ScrollView>
            <View className={styles.select}></View>
        </View>;
    }

    componentDidUpdate(prevProps: MMPickerViewProps) {
        if (prevProps.data !== this.props.data) {
            const scrollTop = MMPickerView.getScrollTop(this.props.value, this.props.data);
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({
                scrollViewScrollTop: scrollTop,
                scrollTop
            })
        }
    }

    private getStyle(index) {
        const result = Math.abs(index * MMPickerView.itemHeight - this.state.scrollTop);
        const start = MMPickerView.itemHeight / 2;
        const end = MMPickerView.itemHeight * 3.8;
        if (result < start) {
            return {
                opacity: 1
            }
        }

        const proportion = (end - start - result) / (end - start);
        return {
            opacity: 0.8 * proportion
        }
    }

    @throttle(20)
    private onScroll(event) {
        // 用于更新透明度
        this.setState({
            scrollTop: event.target.scrollTop
        });
        this.onChange();
    }

    private onTouchStart() {
        this.canChange = false;
    }

    private onTouchEnd() {
        this.canChange = true;
        this.onChange();
    }

    private onChange() {
        clearTimeout(this.changeST);
        this.changeST = setTimeout(() => {
            if (this.canChange) {
                this.canChange = false;
                const { id: value } = this.props.data[Math.round(this.state.scrollTop / MMPickerView.itemHeight)];
                const scrollViewScrollTop = MMPickerView.getScrollTop(value, this.props.data);
                this.setState({
                    scrollViewScrollTop
                })
                this.props.onChange(value);
            }
        }, 100);
    }
}

