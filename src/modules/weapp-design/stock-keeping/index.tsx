import { View } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import classnames from 'classnames';
import { autobind } from '@wmeimob/decorator';


const name = 'MMStockKeeping';

interface IList {
    title: string;
    items: {
        id: string;
        text: string;
    }[];
}

interface IMMStockKeepingProps {
    /**
     * 库存
     *
     * @type {string[][]}
     * @memberof IStockKeepingProps
     */
    stocks: {
        ids: string[];
        stock: number;
    }[];

    /**
     * 选中列表
     *
     * @type {string[]}
     * @memberof IStockKeepingProps
     */
    selecteditems: string[];

    /**
     * 列表数据
     *
     * @type {IList[]}
     * @memberof IStockKeepingProps
     */
    list: IList[];

    onClick: (id: string, selected: boolean) => void;

}

interface IMMStockKeepingState {
    checked: boolean;
}

@autobind
export default class MMStockKeeping extends Component<IMMStockKeepingProps, IMMStockKeepingState> {
    static defaultProps = {
        selecteditems: [],
        list: []
    };

    static options = {
        addGlobalClass: true
    };

    render() {
        const { props } = this;
        return <View>
            {
                props.list.map((item, index) => <View key={item.title + index}>
                    {this.renderTitle(item.title)}
                    {item.items.map(value => <View key={value.id}>{this.renderItem(value)}</View>)}
                </View>)
            }
        </View>;
    }

    private renderTitle(title: string) {
        return <View className={`${name}-title`}>{title}</View>;
    }

    private renderItem(item: { id: string; text: string }) {
        const { props } = this;
        const include = this.includeIds(props.stocks.map(value => value.ids), [...props.selecteditems, item.id]);
        const selected = props.selecteditems.includes(item.id);
        return <View onClick={() => {
            props.onClick(item.id, selected);
        }} key={item.id} className={this.getClassName(include, selected)}>{item.text}</View>;
    }

    private getClassName(include: boolean, selected: boolean) {
        const classNames = [`${name}-item`];
        if (!include) {
            classNames.push(`${name}-item--disabled`);
        }
        if (selected) {
            classNames.push(`${name}-item--selected`);
        }
        return classnames(...classNames);
    }

    private includeIds(ids: string[][], includeIds: string[]) {
        return !!ids.find(value => !this.includeArray(value, includeIds));
    }

    private includeArray(ids: string[], includeIds: string[]) {
        return !!includeIds.find(value => !ids.includes(value));
    }
}

