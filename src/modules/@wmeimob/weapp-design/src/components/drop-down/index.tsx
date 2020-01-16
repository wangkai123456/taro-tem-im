import { Text, View } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import { autobind } from '~/modules/@wmeimob/decorator/src';
import classNames from 'classnames';
import MMIconFont from '../icon-font';
import MMDropDownSelect from './components/select';
import styles from './index.modules.less';
import { IDropDownData, IMMDropDownDataType } from './types';

interface IMMDropDownProps {

    /**
     * 值
     *
     * @type {string}
     * @memberof IMMDropDownProps
     */
    value: string

    /**
     * 数据
     *
     * @type {IDropDownData}
     * @memberof IMMDropDownProps
     */
    data: IDropDownData[]

    /**
     * 数据改变事件
     *
     * @memberof IMMDropDownProps
     */
    onChange: (value: string, dropDownData: IDropDownData[]) => void

}

interface IMMDropDownState {
    /**
     * 显示弹窗id
     *
     * @type {boolean}
     * @memberof IModalProps
     */
    visibleId?: string;

}

@autobind
export default class MMDropDown extends Component<IMMDropDownProps, IMMDropDownState> {
    static options = {
        addGlobalClass: true
    };

    state: IMMDropDownState = {
        visibleId: undefined
    }

    render() {
        const { data, value } = this.props;
        const { visibleId } = this.state;
        const visible = visibleId !== undefined;
        const selectedDataIndex = data && data.findIndex(data => data.id === visibleId);
        const selectedData = data && data[selectedDataIndex];
        return data && <View className={styles.MMDropDown}>
            <View className={styles.content}>
                {this.props.data.map(dataValue => {
                    const selected = dataValue.id === value;
                    return <View className={classNames(styles.item, selected ? styles.selected : '')}
                        onClick={() => this.onItemClick(dataValue)}
                        key={dataValue.id}>
                        <Text className={styles.text}>{dataValue.value}</Text>
                        {dataValue.iconfont && <MMIconFont size={12} value={dataValue.iconfont}></MMIconFont>}
                    </View>
                })}
            </View>
            {visible && <View className={styles.modal}>
                <View className={styles.mask}></View>
                <View className={styles.modal_content}>
                    {this.renderDate(selectedData as IDropDownData, selectedDataIndex as any)}
                </View>
            </View>}
        </View>;
    }

    private onItemClick(dataValue: IDropDownData) {
        if (dataValue.type === IMMDropDownDataType.Single) {
            this.props.onChange(dataValue.id, this.props.data);
            this.setState({
                visibleId: undefined
            })
        } else {
            if (dataValue.id === this.state.visibleId) {
                this.setState({
                    visibleId: undefined
                })
            } else {
                this.setState({
                    visibleId: dataValue.id
                })
            }
        }
    }

    private onSelectClick(value: string, dropDownData: IDropDownData, index: number) {
        const data = [...this.props.data];
        const newDropDownData = { ...dropDownData, value };
        data[index] = newDropDownData;
        this.props.onChange(newDropDownData.id, data);
        this.setState({
            visibleId: undefined
        })
    }

    private renderDate(data: IDropDownData, index: number) {
        if (data.type === IMMDropDownDataType.Select) {
            return <MMDropDownSelect data={data} onChange={dataValue => this.onSelectClick(dataValue, data, index)}></MMDropDownSelect>
        }
        return <View></View>;
    }
}

