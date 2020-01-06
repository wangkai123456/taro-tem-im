import { Text, View } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import { autobind } from '@wmeimob/decorator';
import classNames from 'classnames';
import MMIconFont from '~/components/icon-font';
import MMIconFontName from '~/components/icon-font/name';
import { IDropDownDataSelect } from '../../types';
import styles from './index.modules.less';

interface IMMDropDownSelectProps {

    /**
     * 数据
     *
     * @type {IDropDownDataSelect}
     * @memberof IMMDropDownProps
     */
    data: IDropDownDataSelect

    /**
     * 数据改变事件
     *
     * @memberof IMMDropDownProps
     */
    onChange: (value: string, dropDownData: IDropDownDataSelect) => void

}

@autobind
export default class MMDropDownSelect extends Component<IMMDropDownSelectProps> {
    static options = {
        addGlobalClass: true
    };

    render() {
        const dropDownData = this.props.data;
        const { data, value } = dropDownData || {};
        return data && <View className={styles.select}>
            {data.map(dataValue => {
                const selected = dataValue === value;
                return <View className={classNames(styles.select_item, selected ? styles.selected : '')}
                    onClick={() => this.props.onChange(dataValue, dropDownData)}
                    key={dataValue}>
                    <Text>{dataValue}</Text>
                    {selected && <MMIconFont size={15} value={MMIconFontName.Check}></MMIconFont>}
                </View >
            })}
        </View>
    }
}

