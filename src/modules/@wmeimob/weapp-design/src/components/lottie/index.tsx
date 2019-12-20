import { Canvas, Image, View } from '@tarojs/components';
import Taro, { Component, execObject } from '@tarojs/taro';
import { autobind } from '@wmeimob/decorator';
// 修改了 动画卡主的问题 https://developers.weixin.qq.com/community/develop/doc/0004a2139ecbe82ed3991f58756400
import lottie from './lottie-miniprogram';
import { AnimationItem } from './types';
import { guid } from '../utils';

interface ICheckboxProps {

    /**
     * 宽度
     *
     * @type {number}
     * @memberof ICheckboxProps
     */
    width: number

    /**
     * 高度
     *
     * @type {number}
     * @memberof ICheckboxProps
     */
    height: number

    /**
     * json数据
     *
     * @type {*}
     * @memberof ICheckboxProps
     */
    data: any;

    /**
     * 循环播放
     *
     * @type {boolean}
     * @memberof ICheckboxProps
     */
    loop?: boolean

    /**
     * 自动播放
     *
     * @type {boolean}
     * @memberof ICheckboxProps
     */
    autoplay?: boolean

}

@autobind
export default class MMLottie extends Component<ICheckboxProps> {
    static options = {
        addGlobalClass: true
    };

    static defaultProps = {
    };

    private canvasId = 'lottie' + guid();

    private animationItem: AnimationItem;

    private reslove: (value?: unknown) => void

    private getItemPromise = new Promise(reslove => {
        this.reslove = reslove
    });

    /**
     * 获取动画对象
     *
     * @returns
     * @memberof MMLottie
     */
    async getAnimationItem() {
        await this.getItemPromise;
        return this.animationItem;
    }

    componentDidMount() {
        const info = Taro.getSystemInfoSync();

        if (info.brand === 'devtools') {
            // eslint-disable-next-line no-console
            console.warn('开发工具不支持lottie');
        } else {
            Taro.createSelectorQuery().in(this.$scope)
                .select('#' + this.canvasId)
                .fields({
                    node: true,
                    size: true
                } as any)
                .exec(this.init)
        }
    }

    render() {
        const { width, height, data } = this.props;
        const info = Taro.getSystemInfoSync();
        return data && (info.brand === 'devtools' ? <View>
            <Image style={{ width: width + 'px', height: height + 'px' }} src={require('./loading.png')}></Image>
        </View>
            : <Canvas canvasId={this.canvasId} style={{ width: width + 'px', height: height + 'px' }} type="2d" id={this.canvasId} />);
    }

    componentWillUnmount() {
        const info = Taro.getSystemInfoSync();
        if (info.brand !== 'devtools') {
            this.animationItem.destroy();
        }
    }

    private init(res: execObject[]) {
        const { width, height, loop, autoplay } = this.props;
        const { data } = this.props;
        const canvas = res[0].node;
        canvas.width = width * 2;
        canvas.height = height * 2;

        lottie.setup(canvas);
        this.animationItem = lottie.loadAnimation({
            name: this.canvasId,
            loop,
            autoplay,
            rendererSettings: {
                context: canvas.getContext('2d')
            },
            animationData: data
        });

        this.reslove();
    }
}
