import { View, Text } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import MMModal from '../modal/index';
import classNames from 'classnames';
import styles from './index.modules.less'
import { autobind } from '~/modules/@wmeimob/decorator/src/components';
import { MMModalAnimationType, MMModalJustifyContent } from '../modal/const';
import H2 from '../head/h2';
import { MMActionSheetType } from './const';
import MMDivider from '../divider';
import MMCheckbox from '../checkbox';

interface IMMActionSheetProps {
    /**
     * 标题
     *
     * @type {string}
     * @memberof IMMActionSheetProps
     */
    title?: string;

    /**
     * 是否显示
     *
     * @type {boolean}
     * @memberof IMMActionSheetProps
     */
    visible: boolean;

    /**
     * 选中值
     *
     * @type {number}
     * @memberof IMMActionSheetProps
     */
    value?: string | string[]

    /**
     * 选项
     *
     * @type {boolean}
     * @memberof IMMActionSheetProps
     */
    data: { id: string; text: string }[]

    /**
     * 关闭事件
     *
     * @memberof IMMActionSheetProps
     */
    onCancel: () => void;

    /**
     * 点击事件
     *
     * @memberof IMMActionSheetProps
     */
    onOk?: () => void;

    /**
     * 类型
     *
     * @type {MMActionSheetType}
     * @memberof IMMActionSheetProps
     */
    type?: MMActionSheetType

    /**
     * 点击选项
     *
     * @memberof IMMActionSheetProps
     */
    onOptionsClick?: (value: { id: string; text: string }, index: number) => void;
}

@autobind
export default class MMActionSheet extends Component<IMMActionSheetProps> {
    static options = {
        addGlobalClass: true
    };

    static defaultProps = {
        title: '请选择',
        data: [],
        type: MMActionSheetType.Default
    };

    get contentClassName() {
        const classNameArray = [styles.MMActionSheet];

        if (!this.props.visible) {
            classNameArray.push(styles.content__hide);
        }

        return classNames(...classNameArray);
    }

    onOptionsClick(value: { id: string; text: string }, index: number) {
        this.props.onOptionsClick && this.props.onOptionsClick(value, index);
    }

    render() {
        const { type, data, value: selecteValue, onOk, onCancel } = this.props;
        return <MMModal onClose={onCancel} visible={this.props.visible}
            justifyContent={MMModalJustifyContent.flexEnd} animationType={MMModalAnimationType.down}
            className={styles.MMActionSheet}>
            <View className={this.contentClassName}>
                <View className={styles.title}>
                    <H2>{this.props.title}</H2>
                </View>
                {data.map((value, index) => <View onClick={() => this.onOptionsClick(value, index)}
                    key={value.id} className={this.getItemClassName(value)}>
                    <Text>{value.text}</Text>
                    {type === MMActionSheetType.Multiple &&
                        <MMCheckbox checked={(selecteValue as string[]).includes(value.id)} />}
                </View>)}
                <View className="spacing" />
                {type === MMActionSheetType.Multiple && <View>
                    <View onClick={onOk && onOk} className={styles.cancel}>确定</View>
                    <MMDivider />
                </View>}
                <View onClick={onCancel} className={styles.cancel}>取消</View>
            </View>
        </MMModal>;
    }

    private getItemClassName(value) {
        const { value: selectedValue } = this.props;
        if (this.props.type === MMActionSheetType.Default) {
            return classNames(styles.item, value.id === selectedValue && styles.selected)
        }
        return classNames(styles.item, styles.itemMultiple);
    }
}

