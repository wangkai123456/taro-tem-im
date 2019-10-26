import { View, Image } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import { autobind } from '@wmeimob/decorator';
import { MMInputSearch, MMNavigation, MMPopup, MMIconFont, MMPullToRefresh } from '@wmeimob/weapp-design';
import { key } from '../constant';
import styles from './index.module.less';
import classNames from 'classnames';
import { MMPullToRefreshState } from '@wmeimob/weapp-design/src/components/const';
import MMCProductScreen from '../screen';
import { IScreenItem } from '../screen/types';
import MMCProductScreenModal from '../screen-modal';

interface MMCProductItem {
    id: string;
    img: string;
    title: string;
    sales: number;
    price: number;
}

interface MMCProductSearchProps {
    state: MMPullToRefreshState,
    placeholder?: string;

    selectList: IScreenItem[];
    selectValue: string;
    onSelectValueChange: (value: string) => void

    /**
     * 产品数据
     *
     * @type {MMCProductItem[]}
     * @memberof MMCProductSearchProps
     */
    data?: MMCProductItem[];

    /**
     * 刷新事件
     *
     * @memberof MMCProductSearchProps
     */
    onRefresh: () => void;

    /**
     * 拖动到底部
     *
     * @memberof MMCProductSearchProps
     */
    onScrollToLower: () => void;
}

@autobind
export default class MMCProductSearch extends Component<MMCProductSearchProps> {
    static options = {
        addGlobalClass: true
    };

    static defaultProps = {
        placeholder: '输入关键字'
    };

    state = {
        selectIndex: 0,
        noMore: false
    };

    private popup: MMPopup;

    render() {
        const { placeholder, selectList, selectValue, data } = this.props;
        return <View className={key}>
            <MMNavigation title="搜索"></MMNavigation>
            <MMPopup ref={ref => this.popup = ref as MMPopup}></MMPopup>

            <View className={styles.search}>
                <View className={styles.searchInput}>
                    <MMInputSearch placeholder={placeholder} onSearch={this.onSearch}></MMInputSearch>
                </View>
                <View className={styles.searchInputScreen}>
                    <MMCProductScreenModal ></MMCProductScreenModal>
                </View>
            </View>

            <MMCProductScreen onChange={this.props.onSelectValueChange} value={selectValue} data={selectList}></MMCProductScreen>

            <MMPullToRefresh state={this.props.state} noMore={this.state.noMore} onRefresh={this.onRefresh} onScrollToLower={this.props.onScrollToLower}>
                <View className="container">
                    <View className={styles.productList}>
                        {data && data.map(value => <View key={value.id} className={styles.productItem}>
                            <View className={styles.productImage}>
                                <Image src={value.img} />
                            </View>
                            <View className={styles.productContent}>
                                <View className={styles.productTitle}>{value.title}</View>
                                <View className={styles.productPrice}>￥{value.price}</View>
                            </View>
                        </View>)}
                    </View>
                </View>
            </MMPullToRefresh>
        </View>;
    }

    getItemClassName(index: number) {
        const classnames = [styles.selectItem];
        if (index === this.state.selectIndex) {
            classnames.push(styles.selectItemSelect);
        }
        return classNames(...classnames);
    }

    private onSearch(text) {
        // this.popup();
    }

    private onRefresh() {
        return this.props.onRefresh();
    }
}

