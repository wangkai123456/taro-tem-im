import { View } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import { autobind } from '@wmeimob/decorator';
import styles from './index.modules.less';
import classNames from 'classnames';
import { MMTabsType } from './const';

interface IMMTabBarProps {

    /**
     * 标签页
     *
     * @type {string[]}
     * @memberof IMMTabBarProps
     */
    data: string[]

    /**
     * 选中
     *
     * @type {number}
     * @memberof IMMTabBarProps
     */
    selectedIndex: number

    /**
     * 改变事件
     *
     * @memberof IMMTabBarProps
     */
    onChange: (index: number) => void

    /**
     * 导航类型
     *
     * @type {MMTabsType}
     * @memberof IMMTabBarProps
     */
    type?: MMTabsType

}

export interface IMMTabBarState {
    /**
     * 当前页面index
     *
     * @type {number}
     * @memberof IMMTabBarState
     */
    currPageIndex: number
}

@autobind
export default class MMTabs extends Component<IMMTabBarProps, IMMTabBarState> {
    static options = {
        addGlobalClass: true
    };

    static defaultProps: Partial<IMMTabBarProps> = {
        data: []
    };

    get className() {
        const classnames = [styles.MMTabs];

        switch (this.props.type) {
            case MMTabsType.circle:
                classnames.push(styles.MMTabs__circle);
                break;
            case MMTabsType.button:
                classnames.push(styles.MMTabs__button);
                break;
        }

        return classNames(...classnames);
    }

    render() {
        const { data, selectedIndex, onChange } = this.props;
        return <View className={this.className}>
            <View className={styles.content} >
                {data.map((value, index) =>
                    <View key={value + index}
                        className={classNames(styles.item, selectedIndex === index ? styles.selected : {})}
                        onClick={() => onChange(index)}
                    >{value}</View>)}
            </View>
            <View className={styles.line} style={{ left: 100 / data.length * (0.5 + selectedIndex) + '%' }}></View>
        </View>;
    }
}
