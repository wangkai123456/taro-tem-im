import { View } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import { autobind } from '~/modules/@wmeimob/decorator/src/components';
import { MMModalAnimationType, MMModalJustifyContent } from '../modal/const';
import MMModal from '../modal/index';
import styles from './index.modules.less';
import MMPickerView from './view';
import MMModalPopupTitle from '../modal/title';

const name = 'MMPicker';

interface MMPickerProps {
    /**
     * 弹窗标题
     *
     * @type {string}
     * @memberof MMPickerProps
     */
    title?: string;

    /**
     * 数据
     *
     * @type {{ value: string; text: string }[][]}
     * @memberof MMPickerProps
     */
    data: { id: string; text: string }[][];

    /**
     * 当前值
     *
     * @type {string[]}
     * @memberof MMPickerProps
     */
    value: string[];

    /**
     * 选择改变
     *
     * @memberof MMPickerProps
     */
    onChange?: (index: number, value: string) => void;

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
        title: '请选择',
        value: [],
        data: []
    };

    render() {
        const { visible, data, value, onCancel } = this.props;
        return <View className={name}>
            <MMModal visible={visible} animationType={MMModalAnimationType.down}
                justifyContent={MMModalJustifyContent.flexEnd}
                onClose={this.props.onCancel} >
                <View className={styles.modal}>
                    <MMModalPopupTitle onCancel={onCancel}
                        onOk={this.onOk} title={this.props.title} />
                    <View className={styles.content}>
                        {data.map((dataValue, index) => <View className={styles.modal_picker} key={index + '1'}>
                            <MMPickerView data={dataValue} value={value[index]} onChange={value => this.onChange(index, value)} />
                        </View>)}
                    </View>
                </View>
            </MMModal>
        </View>;
    }

    private onOk() {
        const selectList = [...this.props.value].map((value, index) => {
            if (!value) {
                return this.props.data[index][0].id;
            }
            return value;
        });
        this.props.onOk(selectList)
    }

    private onChange(index: number, val: string) {
        this.props.onChange && this.props.onChange(index, val);
    }
}

