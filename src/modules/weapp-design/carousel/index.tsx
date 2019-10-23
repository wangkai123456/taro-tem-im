import { ScrollView, View } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import classname from 'classnames';
import { guid } from '../utils';
import styles from './index.modules.less';

interface IMMCarouselProps {
    type?: string;
    /**
     * 子元素的个数
     *
     * @type {number}
     * @memberof IMMCarouselProps
     */
    length: number;

    /**
     * 自动动画
     *
     * @type {Boolean}
     * @memberof IMMCarouselProps
     */
    autoAnimation?: Boolean;

    /**
     * 自动动画时间
     *
     * @type {number}
     * @memberof IMMCarouselProps
     */
    autoTime?: number;

}

interface IMMCarouselState {
    index: number;
    scrollLeft: number;
    touched: boolean;
}

// @autobind tarobug: 加装饰器会导致Render Props失败
export default class MMCarousel extends Component<IMMCarouselProps, IMMCarouselState> {
    static defaultProps = {
        renderItem: null,
        list: [],
        autoTime: 3000
    };

    static options = {
        addGlobalClass: true,
        styleIsolation: 'apply-shared'

    };

    state: IMMCarouselState = {
        index: 0,
        scrollLeft: -1,
        touched: false
    };

    private id = guid();

    private width = 0;

    private scrollLeft = 0;

    private animationST;

    private autoAnimationSI;

    get dotArray() {
        return new Array(this.props.length).fill(1);
    }

    render() {
        // const { list } = this.props;
        return <View className={styles.MMCarousel} >
            <ScrollView id={this.id} scrollLeft={this.state.scrollLeft}
                className={styles.scrollView}
                scrollX scrollWithAnimation onScroll={this.onScroll.bind(this)}>
                <View className={styles.content} >
                    {this.props.children}
                </View>
            </ScrollView>
            <View className={styles.dot}>
                {this.dotArray.map((_value, index) =>
                    <View className={classname(styles.dotItem, this.state.index === index ? classname(styles.dotItem__selected) : '')} key={_value + index}></View>)}
            </View>
        </View >;
    }

    componentDidMount() {
        const query = Taro.createSelectorQuery();
        query.select('#' + this.id);
        query.selectViewport().boundingClientRect();
        query.exec((res) => {
            this.width = res[0].width;
        });

        this.autoAnimationStart();
    }

    private autoAnimationStart() {
        clearInterval(this.autoAnimationSI);
        this.autoAnimationSI = setTimeout(() => {
            if (this.props.autoTime) {
                this.autoAnimation();
            }
            this.autoAnimationStart();
        }, this.props.autoTime);
    }

    private autoAnimation() {
        let index = this.state.index + 1;
        if (index > this.props.length - 1) {
            index = 0;
        }
        this.scrollToIndex(index);
    }

    private onScroll(event) {
        this.scrollLeft = event.target.scrollLeft;
        this.animation();
    }

    private animation() {
        clearTimeout(this.animationST);
        this.animationST = setTimeout(() => {
            this.scrollToIndex(Math.round(this.scrollLeft / this.width));
            this.autoAnimationStart();
        }, 500);
    }

    private scrollToIndex(index: number) {
        const scrollLeft = this.width * index;

        // 2次scrollLeft 一样会直接跳到到0，神奇的小程序
        if (scrollLeft === this.scrollLeft) {
            this.setState({
                index
            });
            return;
        }
        this.setState({
            index,
            // 上次的scrollLeft和上次一样不会触发滚动
            scrollLeft: -1
        }, () => {
            this.setState({
                index,
                scrollLeft
            });
        });
    }
}

