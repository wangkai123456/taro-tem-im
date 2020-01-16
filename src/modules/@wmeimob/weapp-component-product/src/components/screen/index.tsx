import { View } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import { autobind } from '~/modules/@wmeimob/decorator/src';
import classNames from 'classnames';
import styles from './index.module.less';
import { IScreenItem, IScreenItemSingleElection, IScreenSingleElectionData, IScreenType } from './types';
import { MMIconFont } from '~/modules/@wmeimob/weapp-design/src/components';

interface MMCProductScreenProps {
    value: string
    data: IScreenItem[]
    onChange: (value: string, data: IScreenItem[]) => void
}

interface MMCProductScreenState {
    /**
     * 弹窗数据
     *
     * @type {IScreenItem}
     * @memberof MMCProductScreenState
     */
    popupValue: IScreenItem

    /**
     * 弹窗是否显示
     *
     * @type {boolean}
     * @memberof MMCProductScreenState
     */
    visible: boolean
}

@autobind
export default class MMCProductScreen extends Component<MMCProductScreenProps, MMCProductScreenState> {
    static options = {
        addGlobalClass: true
    };

    static defaultProps = {
        data: []
    };

    state: MMCProductScreenState = {
        popupValue: null as any,
        visible: false
    };

    render() {
        const { visible } = this.state;
        const { data } = this.props;
        return <View className={styles.screen}>
            {
                data.map(item => <View key={item.id} className={styles.screent_item}>
                    <View className={this.getItemClassName(item)} onClick={() => this.onSelectClick(item)}>
                        {this.getText(item)}{this.renderIcon(item)}
                    </View>
                </View>)}
            {
                visible && <View className={styles.mask} onTouchMove={event => event.stopPropagation()}>
                    {this.renderMask()}
                </View>
            }
        </View>;
    }

    private renderIcon(item: IScreenItem) {
        const { value } = this.props;
        const color = value === item.id ? styles.primaryColor : undefined;
        switch (item.type) {
            case IScreenType.multipleElection: {
                return <MMIconFont value="arrowDown" color={color}></MMIconFont>;
            }
            case IScreenType.singleElection: {
                return <MMIconFont value="arrowDown" color={color}></MMIconFont>;
            }
        }
    }

    private renderMask() {
        const { popupValue } = this.state;
        switch (popupValue.type) {
            case IScreenType.singleElection: {
                return <View className={styles.select_list}>
                    <View className="container">
                        {popupValue.data.map(itemValue => <View key={itemValue.id}
                            className={this.getElectionClass(popupValue, itemValue)}
                            onClick={() => this.onSingleElectionClick(popupValue, itemValue)}>
                            {itemValue.value}
                        </View>)}
                    </View>
                </View>;
            }
        }

        return <View></View>
    }

    private onSingleElectionClick(screenItemSingleElection: IScreenItemSingleElection, screenSingleElectionData: IScreenSingleElectionData) {
        screenItemSingleElection.value = screenSingleElectionData.id;
        this.setState({ visible: false });
        this.props.onChange(screenItemSingleElection.id, [...this.props.data]);
    }

    private getElectionClass(screenItemSingleElection: IScreenItemSingleElection, screenSingleElectionData: IScreenSingleElectionData) {
        const classnames = [styles.select_item];

        if (screenItemSingleElection.value === screenSingleElectionData.id) {
            classnames.push(styles.select_item__selected);
        }

        return classNames(...classnames)
    }

    private getText(item: IScreenItem) {
        switch (item.type) {
            case IScreenType.default: {
                return item.data;
            }
            case IScreenType.singleElection: {
                const value = item.data.find(value => value.id === item.value) as IScreenSingleElectionData;
                return value.value;
            }
            case IScreenType.multipleElection: {
                const value = item.data.find(value => value.id === item.value) as IScreenSingleElectionData;
                return value.value;
            }
        }
    }

    private getItemClassName(item: IScreenItem) {
        const classnames = [styles.screent_item_text];
        if (item.id === this.props.value) {
            classnames.push(styles.screen_item__select);
        }
        return classNames(...classnames);
    }

    private onSelectClick(item: IScreenItem) {
        switch (item.type) {
            case IScreenType.default:
                this.setState({
                    visible: false
                })
                this.props.onChange(item.id, this.props.data)
                break;
            default:
                this.setState({
                    popupValue: item,
                    visible: !this.state.visible
                })
                break;
        }
    }
}

