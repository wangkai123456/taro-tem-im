import { RichText, View } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import { autobind } from '@wmeimob/decorator';
import { MMButton, MMCarousel, MMCarouselItem, MMIconFont, MMItem, MMModal, MMNavigation, MMSkuList, H3, MMDivider, MMStepper } from '~/modules/@wmeimob/weapp-design';
import { MMButtonRadius, MMButtonState, MMModalAnimationType, MMIconFontName, MMModalJustifyContent, MMNavigationType } from '~/modules/@wmeimob/weapp-design/src/components/const';
import styles from './index.module.less';

interface ISku {
    sku: string[],
    price: number,
    originalPrice: number,
    skuCount: number,
    image: string
}

interface IList {
    title: string
    items: { id: string, text: string }[]
}

interface MMCProductDetailsProps {
    /**
     * 产品缩略图
     *
     * @type {string[]}
     * @memberof MMCProductDetailsProps
     */
    carousel: string[]
    /**
     * 产品标题
     *
     * @type {string}
     * @memberof MMCProductDetailsProps
     */
    title: string

    /**
     * 价格
     *
     * @type {strin}
     * @memberof MMCProductDetailsProps
     */
    price: number

    /**
     * 原价
     *
     * @type {number}
     * @memberof MMCProductDetailsProps
     */
    originalPrice: number

    /**
     * 销量
     *
     * @type {number}
     * @memberof MMCProductDetailsProps
     */
    salesVolume: number

    /**
     * 富文本
     *
     * @type {string}
     * @memberof MMCProductDetailsProps
     */
    richText: string

    /**
     * 库存统计
     *
     * @type {number}
     * @memberof MMCProductDetailsProps
     */
    skuCount: number

    /**
     * 缩略图
     *
     * @type {string}
     * @memberof MMCProductDetailsProps
     */
    image: string

    /**
     * 库存
     *
     * @type {string[][]}
     * @memberof IMMSkuListProps
     */
    sku: ISku[];

    /**
     * 选项列表
     *
     * @type {IList[]}
     * @memberof IMMSkuListProps
     */
    list: IList[];
}

interface MMCProductDetailsState {
    visible: boolean,
    count: number
    skuValue: string[]
}

@autobind
export default class MMCProductDetails extends Component<MMCProductDetailsProps, MMCProductDetailsState> {
    static options = {
        addGlobalClass: true
    };

    static defaultProps = {
        carousel: [],
        richText: '',
        sku: [],
        list: []
    };

    state: MMCProductDetailsState = {
        skuValue: [],
        count: 1,
        visible: false
    };

    get richText() {
        return this.props.richText.replace(/<img/g, '<img style="max-width:100%;height:auto" ')
    }

    render() {
        const { carousel, title, price, salesVolume, originalPrice, sku, list, skuCount, image } = this.props;
        const { skuValue, visible, count } = this.state;
        const skuObject = this.getSkuObject();
        return <View className={styles.details}>
            <MMNavigation type={MMNavigationType.transparent}></MMNavigation>
            <MMCarousel length={carousel.length} autoAnimation={false}>
                {carousel.map(value => <MMCarouselItem key={value}>
                    <View onClick={() => Taro.previewImage({
                        current: value,
                        urls: carousel
                    })} className={styles.item} style={{ backgroundImage: `url(${value})` }}></View>
                </MMCarouselItem>)}
            </MMCarousel>
            <View className={styles.titleBox}>
                <View className='container'>
                    <View className='flex'>
                        <View className={styles.title}>
                            {title}
                        </View>
                        <View className={styles.share}>
                            <MMIconFont size={24} value="Magnifier"></MMIconFont>
                            <View>分享</View>
                        </View>
                    </View>
                    <View className={styles.priceBox}>
                        <View className={styles.price}>
                            <View>￥{price}</View>
                            <View className={styles.originalPrice}>￥{originalPrice}</View>
                        </View>
                        <View className={styles.salesVolume}>
                            已售： {salesVolume}
                        </View>
                    </View>
                </View>
            </View>
            <View className={styles.spacing}></View>
            <View className="container">
                <MMItem leftText="规格与数量" rightText="未选中" onClick={() => this.setState({ visible: true })} divider={false}></MMItem>
            </View>
            <View className={styles.spacing}></View>

            <RichText nodes={this.richText}  ></RichText>

            <View className={styles.pageBottom}>
                <View className={styles.pageBottom_content}>
                    <View className={styles.pageBottom_icon}>
                        <View className={styles.pageBottom_iconItem}>
                            <MMIconFont size={styles.iconSize} value={MMIconFontName.Home}></MMIconFont>
                            <View>首页</View>
                        </View>
                        <View className={styles.pageBottom_iconItem}>
                            <MMIconFont size={styles.iconSize} value={MMIconFontName.Home}></MMIconFont>
                            <View>客服</View>
                        </View>
                        <View className={styles.pageBottom_iconItem}>
                            <MMIconFont size={styles.iconSize} value={MMIconFontName.Home}></MMIconFont>
                            <View>购物车</View>
                        </View>
                    </View>
                    <View className={styles.pageBottom_buttonBox}>
                        <View>
                            <MMButton state={MMButtonState.Warning} radius={MMButtonRadius.None}>加入购物车</MMButton>
                        </View>
                        <View>
                            <MMButton radius={MMButtonRadius.None}>立即购买</MMButton>
                        </View>
                    </View>
                </View>
            </View>

            <MMModal animationType={MMModalAnimationType.down} justifyContent={MMModalJustifyContent.flexEnd}
                visible={visible} onClose={() => this.setState({ visible: false })}>
                <View className={styles.modal}>
                    <View className="container">
                        <View className={styles.modal_header}>
                            <View className={styles.modal_headBox}>
                                <View className={styles.modal_head} style={{
                                    backgroundSize: 'cover',
                                    backgroundImage: `url(${skuObject ? skuObject.image : image})`
                                }}></View>
                                <View className={styles.modal_headBoxRight}>
                                    <View className={styles.modal_stock}>
                                        库存：{skuObject ? skuObject.skuCount : skuCount}
                                    </View>
                                    <View className={styles.modal_price}>
                                        <View>¥{skuObject ? skuObject.price : price}</View>
                                        <View className={styles.modal_originalPrice}>
                                            原价¥{skuObject ? skuObject.originalPrice : originalPrice}
                                        </View>
                                    </View>
                                    <View className={styles.modal_delete} onClick={() => this.setState({ visible: false })}>
                                        <MMIconFont size={14} value={MMIconFontName.Home}></MMIconFont>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <MMSkuList sku={sku.map(value => value.sku)} value={skuValue} list={list} onClick={this.onSkuClick}></MMSkuList>
                        <View className="spacing"></View>
                        <MMDivider></MMDivider>
                        <View className={styles.modal_count}>
                            <H3>购买数量</H3>
                            <MMStepper min={1} value={count} onChange={value => this.setState({ count: value })}></MMStepper>
                        </View>
                    </View>
                    <MMButton onClick={this.onSubmit} radius={MMButtonRadius.None}>确定</MMButton>
                </View>
            </MMModal>
        </View>;
    }

    private previewImage(param: Taro.previewImage.Param) {
        Taro.previewImage(param);
    }

    private getSkuObject() {
        const { skuValue } = this.state;
        const { sku, list } = this.props;

        if (skuValue.length === 0 || skuValue.length !== list.length) {
            return null;
        }

        const skuObject = sku.find(value => skuValue.every(skuValue => value.sku.includes(skuValue)))
        return skuObject;
    }

    private onSkuClick(skuValue) {
        this.setState({ skuValue })
    }

    private onSubmit() {
        this.setState({ visible: false })
    }
}

