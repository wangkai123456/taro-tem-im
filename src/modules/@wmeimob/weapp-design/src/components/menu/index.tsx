import { ScrollView, View } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import { autobind } from '@wmeimob/decorator';
import classNames from 'classnames';
import styles from './index.modules.less';
import { guid } from '../utils';

export interface IMMMenuData {
    text: string
    value: string
    children?: IMMMenuData[]
}

interface IMMMenuProps {

    /**
     * 滚动视窗高度
     *
     * @type {number}
     * @memberof IMMMenuProps
     */
    scrollViewHeight?: number

    /**
     * 选中值
     *
     * @type {string[]}
     * @memberof IMMMenuProps
     */
    value: string[]
    /**
     * 数据
     *
     * @type {IMMMenuData[]}
     * @memberof IMMMenuProps
     */
    data: IMMMenuData[]

    /**
     * 选中改变事件
     *
     * @memberof IMMMenuProps
     */
    onChange: (value: string[], index: number) => void
}

@autobind
export default class MMMenu extends Component<IMMMenuProps> {
    static options = {
        addGlobalClass: true
    };

    static defaultProps = {
    };

    state = {
        scrollViewHeight: 0
    }

    private id = 'MMMenuScrollViewTop' + guid()

    private get style() {
        const { scrollViewHeight } = this.props;
        const { scrollViewHeight: scrollViewHeightState } = this.state;
        const scrollHeight = scrollViewHeight === undefined ?
            scrollViewHeightState : scrollViewHeight;
        return scrollViewHeight !== 0 ? { height: scrollHeight + 'px' } : {}
    }

    render() {
        const { data } = this.props;

        return data && <View className={styles.MMMenu}>
            <View id={this.id}></View>
            {this.renderScrollView()}
        </View>;
    }

    componentDidMount() {
        this.calculateScrollViewHeight();
    }

    private renderScrollView() {
        const { value } = this.props;
        const datas = this.getDatas();

        return datas.map((data, index) => <ScrollView scrollY={true} key={index + '1'}
            style={this.style} className={this.getClassName(index)}>
            {data.map(dataValue => <View onClick={() => this.onChange(dataValue.value, index)}
                className={classNames(styles.item, dataValue.value === value[index] ? styles.selected : '')} key={dataValue.value}>
                {dataValue.text}
            </View>)}
        </ScrollView>)
    }

    private getLevel() {
        let child = this.props.data[0] && this.props.data[0].children;
        let level = 1;
        while (child) {
            child = child[0].children;
            level++;
        }

        return level;
    }

    private getDatas() {
        const { data } = this.props;
        const datas = [data];
        const valueClone = new Array(this.getLevel()).fill(undefined);
        this.props.value.forEach((value, index) => valueClone[index] = value);

        valueClone.forEach((val, index) => {
            const selectedChilds = datas[index].find(vals => vals.value === val);
            if (selectedChilds && selectedChilds.children) {
                datas[index + 1] = selectedChilds.children;
            } else if (datas[index][0] && datas[index][0].children) {
                datas[index + 1] = datas[index][0].children as IMMMenuData[];
            }
        })

        return datas;
    }

    private getClassName(index: number) {
        switch (index) {
            case 0:
                return styles.list;
            default:
                return styles.listChildren;
        }
    }

    private onChange(value: string, index: number) {
        const newValue = this.findValue(value, this.props.data);
        this.props.onChange(newValue, index);
    }

    private findValue(value: string, data: IMMMenuData[]): string[] {
        if (value === undefined) {
            return [];
        }

        let selectedList: string[] = undefined as any;
        data.find(dataValue => {
            if (dataValue.value === value) {
                selectedList = [dataValue.value];
            } else if (dataValue.children) {
                const values = this.findValue(value, dataValue.children);
                if (values) {
                    selectedList = [dataValue.value, ...values];
                }
            }

            return selectedList;
        });

        return selectedList;
    }

    private async calculateScrollViewHeight() {
        const topViewRes = await this.getViewRes('#' + this.id);
        const res = Taro.getSystemInfoSync();
        this.setState({
            scrollViewHeight: res.screenHeight - topViewRes.top
        })
    }

    private getViewRes(name: string) {
        return new Promise<Taro.NodesRef.BoundingClientRectCallbackResult>((resolve) =>
            Taro.createSelectorQuery().in(this.$scope).select(name).boundingClientRect(res => resolve(res)).exec()
        );
    }
}
