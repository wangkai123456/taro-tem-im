import { View, ScrollView } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import { autobind, lock, debounce } from '~/modules/@wmeimob/decorator/src/components';
import styles from './index.modules.less';
import MMIconFont from '../icon-font';
import classNames from 'classnames';
import { BaseEventOrig } from '@tarojs/components/types/common';
import MMIconFontName from '../icon-font/const';
import { selectRect, guid } from '../utils';

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
    iconfontValue?: MMIconFontName | string;

    /**
     * 左侧图标颜色
     *
     * @type {string}
     * @memberof ICheckboxProps
     */
    iconfontColor?: string;

    /**
     * 左侧文字
     *
     * @type {string}
     * @memberof ICheckboxProps
     */
    text?: string

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
        onClick: () => null
    };

    state = {
        scrollLeft: 0,
        scrollViewWidth: Taro.getSystemInfoSync().windowWidth
    }

    private buttonWidth = 0;
    private scrollLeft = 0;

    private uuid = guid();

    get className() {
        const classnames = [styles.content];
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
        return <ScrollView id="MMScrollView" scrollWithAnimation={false} scrollX scrollLeft={scrollLeft}
            throttle={false} className={styles.scrollView} onScroll={this.onScroll as any}
            onTouchEnd={this.onTouchEnd}>
            <View className={styles.scrollViewContent}>
                {this.renderContent()}
                {this.renderButtons()}
                <View id="MMPullToRefreshTop" />
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
        const { onClick, text: leftText, iconfontColor: leftIconfontNameColor, sliderButton, iconfontValue: leftIconfontName } = this.props;
        const { scrollViewWidth } = this.state;
        return <View onClick={onClick} className={styles.MMItem} style={{ width: sliderButton ? scrollViewWidth + 'px' : 'auto' }}>
            {leftIconfontName && <View className={styles.leftIconfont}>
                <MMIconFont color={leftIconfontNameColor} value={leftIconfontName} />
            </View>}
            <View className={classNames(this.className)}>
                <View className={styles.left}>
                    {leftText && <View className={styles.leftText}>{leftText}</View>}
                    <View className="spacing" />
                    {this.props.renderLeft}
                </View>
                <View className={styles.right}>
                    {this.props.children}
                </View>
            </View>
        </View>;
    }

    private async calculateScrollViewHeight() {
        const scrollView = await selectRect('#MMScrollView', this.$scope);
        this.setState({
            scrollViewWidth: scrollView.width
        })

        const topViewRes = await selectRect('#MMPullToRefreshTop', this.$scope);

        const res = Taro.getSystemInfoSync();
        this.buttonWidth = topViewRes.left - res.screenWidth;
    }

    @debounce(300)
    private onScroll(event: BaseEventOrig<{ scrollLeft: number }>) {
        this.scrollLeft = event.detail.scrollLeft;
        this.setState({
            scrollLeft: event.detail.scrollLeft
        })
    }

    private onTouchEnd() {
        const max = this.buttonWidth / 2;
        const { scrollLeft } = this;
        if (scrollLeft >= max) {
            this.setState({
                scrollLeft: this.buttonWidth
            })
        } else {
            this.setState({
                scrollLeft: 0
            })
        }
    }
}
