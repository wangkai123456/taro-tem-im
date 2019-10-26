import { View } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import { autobind } from '@wmeimob/decorator';
import classname from 'classnames';
import styles from './index.modules.less';

interface IList {
    title: string;
    items: IItem[];
}

interface IItem {
    id: string;
    text: string;
}

interface IMMSkuListProps {
    /**
     * 选中
     *
     * @type {[]}
     * @memberof IMMSkuListProps
     */
    value: string[];
    /**
     * 库存
     *
     * @type {string[][]}
     * @memberof IMMSkuListProps
     */
    sku: string[][];
    /**
     * 列表
     *
     * @type {IList[]}
     * @memberof IMMSkuListProps
     */
    list: IList[];

    /**
     * 点击事件
     *
     * @memberof IMMSkuListProps
     */
    onClick: (value: string[]) => void;
}

@autobind
export default class MMSkuList extends Component<IMMSkuListProps> {
    static defaultProps = {
        sku: [],
        value: [],
        list: []
    };

    static options = {
        addGlobalClass: true
    };

    render() {
        const { list } = this.props;
        return <View className={styles.MMSkuList}>
            {list.map((listValue, index) => <View key={'list' + index}>
                <View className={styles.title}>{listValue.title}</View>
                <View className={styles.content}>
                    {listValue.items.map(item => <View key={item.id}
                        className={this.getItemClassName(item, index)} onClick={() => this.onClick(item, index)}>{item.text}</View>)}
                </View>
            </View>)}
        </View>;
    }

    private onClick(item: IItem, index: number) {
        if (!this.skuInclude(item.id, index)) {
            return;
        }
        const { value } = this.props;
        if (value.includes(item.id)) {
            const values = [...this.props.value];
            delete values[index];
            this.props.onClick(values);
        } else {
            const values = [...this.props.value];
            values[index] = item.id;
            this.props.onClick(values);
        }
    }

    private getItemClassName(item: IItem, index: number) {
        const classNames = [styles.item];
        if (!this.skuInclude(item.id, index)) {
            classNames.push(styles.item__disabled);
        }

        if (this.props.value.includes(item.id)) {
            classNames.push(styles.item__selected);
        }
        return classname(...classNames);
    }

    private skuInclude(id: string, index: number) {
        const includeArray = [...this.props.value];
        includeArray[index] = id;
        return !!this.props.sku.find(value => this.arrayInclude(value, includeArray));
    }

    private arrayInclude(array: string[], includeArray: string[]) {
        if (includeArray.length > 0) {
            return includeArray.every(value => value === undefined ? true : array.includes(value));
        }
        return true;
    }
}

