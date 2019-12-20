import { ScrollView, View } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import { autobind } from '@wmeimob/decorator';
import styles from './index.modules.less';
import classNames from 'classnames';

interface IMMMenuData {
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
    onChange: (value: string[]) => void
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

    render() {
        const { data, value, scrollViewHeight } = this.props;
        const scrollHeight = this.props.scrollViewHeight === undefined ?
            this.state.scrollViewHeight : this.props.scrollViewHeight;
        const style = scrollViewHeight !== 0 ? {
            height: scrollHeight + 'px'
        } : {};
        const childrenData = data && data.find(data => data.value === value[0]);
        const children = childrenData && childrenData.children;
        return data && <View className={styles.MMMenu}>
            <View id="MMMenuScrollViewTop"></View>
            <ScrollView scrollY={true} style={style} className={styles.list}>
                {data.map(dataValue => <View
                    onClick={() => this.onChange(dataValue.value, 0)}
                    className={classNames(styles.item,
                        dataValue.value === value[0] ? styles.selected : '')} key={dataValue.value}>
                    {dataValue.text}
                </View>)}
            </ScrollView>
            <ScrollView scrollY={true} style={style} className={styles.listChildren}>
                {children && children.map(childrenValue =>
                    <View
                        onClick={() => this.onChange(childrenValue.value, 1)}
                        className={classNames(styles.item,
                            childrenValue.value === value[1] ? styles.selected : '')} key={childrenValue.value}>
                        {childrenValue.text}
                    </View>)}
            </ScrollView>
        </View>;
    }

    componentDidMount() {
        this.calculateScrollViewHeight();
    }

    private onChange(value: string, index: number) {
        const newValue = [...this.props.value];
        newValue[index] = value;
        this.props.onChange(newValue)
    }

    private async calculateScrollViewHeight() {
        const topViewRes = await this.getViewRes('#MMMenuScrollViewTop');
        Taro.getSystemInfo({
            success: res => {
                this.setState({
                    scrollViewHeight: res.screenHeight - topViewRes.top
                });
            }
        });
    }

    private getViewRes(name: string) {
        return new Promise<Taro.clientRectElement>((resolve) => {
            const query = Taro.createSelectorQuery().in(this.$scope);
            query.select(name).boundingClientRect((res) => {
                resolve(res as Taro.clientRectElement);
            }).exec();
        });
    }
}
