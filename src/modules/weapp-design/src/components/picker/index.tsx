import { View } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import { autobind } from '@wmeimob/decorator';

import MMPickerView from './view';
import MMModal from '../modal/modal';
import { MMModalAnimationType, MMModalJustifyContent } from '../modal/const';
import styles from './index.modules.less';

const name = 'MMPicker';

interface MMPickerProps {
    /**
     * 弹窗标题
     *
     * @type {string}
     * @memberof MMPickerProps
     */
    title: string;

    /**
     * 数据
     *
     * @type {{ value: string; text: string }[][]}
     * @memberof MMPickerProps
     */
    data: { value: string; text: string }[][];

    /**
     * 当前值
     *
     * @type {string[]}
     * @memberof MMPickerProps
     */
    value: string[];

    /**
     * 点击确定事件
     *
     * @memberof MMPickerProps
     */
    onOk: (value: string[]) => void;

    /**
     * 点击取消
     *
     * @memberof MMPickerProps
     */
    onCancel: () => void;

    /**
     * 是否显示
     *
     * @type {boolean}
     * @memberof MMPickerProps
     */
    visible: boolean;
}

@autobind
export default class MMPicker extends Component<MMPickerProps> {
    static options = {
        addGlobalClass: true
    };

    static defaultProps = {
        value: [],
        data: []
    };

    state = {
        value: this.props.value
    };

    render() {
        const { value } = this.state;
        const { visible } = this.props;
        return <View className={name}>
            <MMModal visible={visible} animationType={MMModalAnimationType.down}
                justifyContent={MMModalJustifyContent.flexEnd}
                onClose={this.props.onCancel} >
                <View className={styles.modal}>
                    <View className={styles.title}>
                        <View className={styles.title_button} onClick={this.props.onCancel}>取消</View>
                        <View className={styles.title_content}>{this.props.title}</View>
                        <View className={styles.title_button} onClick={() => this.props.onOk([...this.state.value])}>确定</View>
                    </View>
                    <View className={styles.content}>
                        {this.props.data.map((data, index) => <View className={styles.modal_picker} key={index + '1'}>
                            <MMPickerView data={data} value={value[index]} onChange={(value) => this.onChange(index, value)}></MMPickerView>
                        </View>)}
                    </View>
                </View>
            </MMModal>
        </View>;
    }

    componentDidUpdate(prevProps) {
        if (this.props.visible && !prevProps.visible) {
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({
                value: this.props.value
            });
        }
    }

    private onChange(index: number, val: string) {
        const value = [...this.state.value];
        value[index] = val;
        this.setState({
            value
        });
    }
}

