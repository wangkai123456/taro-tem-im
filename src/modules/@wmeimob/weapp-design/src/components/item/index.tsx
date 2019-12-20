import { View, ScrollView } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import { autobind } from '@wmeimob/decorator';
import styles from './index.modules.less';
import MMIconFont from '../icon-font';
import { MMIconFontName } from '../const';
import themes from '../styles/themes/default.modules.less';
import classNames from 'classnames';
import { BaseEventOrig } from '@tarojs/components/types/common';

interface ICheckboxProps {
    /**
     * 点击事件
     *
     * @memberof ICheckboxProps
     */
    onClick?: () => void;

    /**
     * 左侧渲染
     *
     * @type {(JSX.Element | string)}
     * @memberof ICheckboxProps
     */
    renderLeft?: JSX.Element | string;

    /**
     * 左侧图标
     *
     * @type {MMIconFontName}
     * @memberof ICheckboxProps
     */
    leftIconfontValue?: MMIconFontName | string;

    /**
     * 左侧图标颜色
     *
     * @type {string}
     * @memberof ICheckboxProps
     */
    leftIconfontColor?: string;

    /**
     * 左侧文字
     *
     * @type {string}
     * @memberof ICheckboxProps
     */
    leftText?: string

    /**
     * 右侧渲染
     *
     * @type {(JSX.Element | string)}
     * @memberof ICheckboxProps
     */
    renderRight?: JSX.Element | string;

    /**
     * 右侧渲染图片
     *
     * @type {(MMIconFontName | string)}
     * @memberof ICheckboxProps
     */
    rightIconfontValue?: MMIconFontName | string;

    /**
     * 右侧图标颜色
     *
     * @type {string}
     * @memberof ICheckboxProps
     */
    rightIconfontColor?: string;

    /**
     * 右侧文字
     *
     * @type {string}
     * @memberof ICheckboxProps
     */
    rightText?: string

    /**
     * 分割线是否显示
     *
     * @type {boolean}
     * @memberof ICheckboxProps
     */
    divider?: boolean

    /**
     * 滑块文本
     *
     * @type {string}
     * @memberof ICheckboxProps
     */
    sliderButton?: (string | { text: string, backgroundColor: string, color: string })[]

    /**
     * 滑块点击
     *
     * @memberof ICheckboxProps
     */
    onSliderButtonClick?: (value: string | { text: string, backgroundColor: string, color: string }, index: number) => void
}

@autobind
export default class MMItem extends Component<ICheckboxProps> {
    static options = {
        addGlobalClass: true
    };

    static defaultProps = {
        rightIconfontValue: MMIconFontName.Next,
        rightIconfontColor: themes.gray5,
        divider: true,
        // sliderButton: ['删除', '取消'],
        sliderVisible: true,
        onClick: () => null
    };

    state = {
        scrollLeft: 0,
        scrollViewWidth: Taro.getSystemInfoSync().windowWidth
    }

    private buttonWidth = 0;
    private scrollLeft = 0;

    get className() {
        const classnames = [styles.content];

        if (this.props.divider) {
            classnames.push(styles.divider);
        }

        return classnames;
    }

    render() {
        const { sliderButton } = this.props;
        return <View >
            {sliderButton ? this.renderScrollView() : this.renderContent()}
        </View>;
    }

    componentDidMount() {
        if (this.props.sliderButton) {
            this.calculateScrollViewHeight();
        }
    }

    renderScrollView() {
        const { scrollLeft } = this.state;
        return <ScrollView scrollWithAnimation={false}
            id="MMScrollView"
            throttle={false} scrollX scrollLeft={scrollLeft} className={styles.scrollView} onScroll={this.onScroll as any}
            onTouchEnd={this.onTouchEnd}>
            <View className={styles.scrollViewContent}>
                {this.renderContent()}
                {this.renderButtons()}
                <View id="MMPullToRefreshTop"></View>
            </View>
        </ScrollView>
    }

    componentDidUpdate(prevProps: ICheckboxProps) {
        if (this.props.sliderButton && prevProps.sliderButton !== this.props.sliderButton) {
            this.calculateScrollViewHeight();
        }
    }

    private renderButtons() {
        const { props } = this;
        const { sliderButton, onSliderButtonClick } = props;

        return sliderButton && sliderButton.map((button, index) => {
            const sliderText = typeof button === 'string' ? button : button.text;
            const style = typeof button === 'string' ?
                { backgroundColor: index % 2 === 0 ? styles.buttonColorOdd : styles.buttonColorEven }
                : { backgroundColor: button.backgroundColor, color: button.color };
            return <View key={sliderText} style={style} onClick={() => onSliderButtonClick && onSliderButtonClick(button, index)}
                className={styles.sliderButton}>{sliderText}</View>
        })
    }

    private renderContent() {
        const { renderRight, onClick, renderLeft, leftText, leftIconfontColor: leftIconfontNameColor, sliderButton,
            rightIconfontColor: rightIconfontNameColor, rightText, leftIconfontValue: leftIconfontName, rightIconfontValue: rightIconfontName } = this.props;
        const { scrollViewWidth } = this.state;
        return <View onClick={onClick} className={styles.MMItem} style={{ width: sliderButton ? scrollViewWidth + 'px' : 'auto' }}>
            {leftIconfontName && <View className={styles.leftIconfont}>
                <MMIconFont color={leftIconfontNameColor} value={leftIconfontName}></MMIconFont>
            </View>}
            <View className={classNames(this.className)}>
                <View className={styles.left}>
                    {leftText && <View className={styles.leftText}>{leftText}</View>}
                    {renderLeft}
                    {this.props.renderLeft}
                </View>
                <View className={styles.right}>
                    {this.props.renderRight}
                    {renderRight}
                    {rightText && <View className={styles.rightText}>{rightText}</View>}
                    {rightIconfontName && <MMIconFont color={rightIconfontNameColor} value={rightIconfontName}></MMIconFont>}
                </View>
            </View>
        </View>;
    }

    private async calculateScrollViewHeight() {
        const scrollView = await this.getViewRes('#MMScrollView');
        this.setState({
            scrollViewWidth: scrollView.width
        })

        const topViewRes = await this.getViewRes('#MMPullToRefreshTop');

        const res = Taro.getSystemInfoSync();
        this.buttonWidth = topViewRes.left - res.screenWidth;
    }

    private getViewRes(name: string) {
        return new Promise<Taro.clientRectElement>((resolve) => {
            const query = Taro.createSelectorQuery().in(this.$scope);
            query.select(name).boundingClientRect((res) => {
                resolve(res as Taro.clientRectElement);
            }).exec();
        });
    }

    private onScroll(event: BaseEventOrig<{ scrollLeft: number }>) {
        this.scrollLeft = event.detail.scrollLeft;
    }

    private onTouchEnd() {
        const max = this.buttonWidth / 2;
        const { scrollLeft } = this;
        if (scrollLeft >= max) {
            if (this.state.scrollLeft === this.buttonWidth) {
                this.setState({
                    scrollLeft: this.state.scrollLeft + 1
                }, () => this.setState({
                    scrollLeft: this.buttonWidth
                }))
            } else {
                this.setState({
                    scrollLeft: this.buttonWidth
                })
            }
        } else {
            if (this.state.scrollLeft === 0) {
                this.setState({
                    scrollLeft: this.state.scrollLeft + 1
                }, () => this.setState({
                    scrollLeft: 0
                }))
            } else {
                this.setState({
                    scrollLeft: 0
                })
            }
        }
    }
}
