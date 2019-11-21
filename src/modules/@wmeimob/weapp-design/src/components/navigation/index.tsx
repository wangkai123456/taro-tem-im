import { View } from '@tarojs/components';
import { Component, getCurrentPages, getMenuButtonBoundingClientRect, navigateBack, getSystemInfoSync } from '@tarojs/taro';
import { autobind } from '@wmeimob/decorator';
import classnames from 'classnames';
import MMIconFont from '../icon-font';
import { MMNavigationType } from './const';
import styles from './index.modules.less';
import { MMIconFontName } from '../const';

interface IMMNavigationProps {
    /**
     * 中间显示的标题
     *
     * @type {string}
     * @memberof INavigationProps
     */
    title?: string;
    /**
     * 返回按钮是否显示 taro没发现如何判断renderLeftContent是否存在
     *
     * @type {boolean}
     * @memberof INavigationProps
     */
    backVisible?: boolean;
    /**
     * 渲染左边的元素
     *
     * @type {(JSX.Element | string)}
     * @memberof INavigationProps
     */
    renderLeftContent?: JSX.Element;
    /**
     * 类型
     *
     * @type {MMNavigationType}
     * @memberof INavigationProps
     */
    type?: MMNavigationType;
}

interface IMMNavigationState {
    height: number;
}

export const { statusBarHeight } = getSystemInfoSync();

const menuButtonBoundingClientRect = getMenuButtonBoundingClientRect();

@autobind
export default class MMNavigation extends Component<IMMNavigationProps, IMMNavigationState> {
    static options = {
        addGlobalClass: true
    };

    static defaultProps = {
        defaultChecked: false,
        backVisible: true,
        type: MMNavigationType.default
    };

    state: IMMNavigationState = {
        height: (menuButtonBoundingClientRect.top - statusBarHeight) * 2 + menuButtonBoundingClientRect.height
    };

    get className() {
        const classNames = [styles.fixed];
        switch (this.props.type) {
            case MMNavigationType.transparent:
                classNames.push(styles.fixed__transparent);
                break;
            case MMNavigationType.primary:
                classNames.push(styles.fixed__primary);
                break;
        }

        return classnames(...classNames);
    }

    render() {
        // const viewHeight = this.props.type === MMNavigationType.transparent ? 0 : this.state.height + statusBarHeight + 'px';
        const viewHeight = this.state.height + statusBarHeight + 'px';
        return <View {...this.props} className={styles.MMNavigation} style={{ height: viewHeight }} >
            <View className={this.className} style={{ paddingTop: statusBarHeight + 'px' }} >
                <View className={styles.content} style={{ height: this.state.height + 'px' }}>
                    <View className={styles.goback}>
                        {this.props.renderLeftContent}
                    </View>
                    {this.props.backVisible ? this.renderGoBack() : ''}
                    <View className={styles.text}>{this.props.title}</View>
                </View>
            </View>

        </View>;
    }

    private onGoBack() {
        navigateBack({
            delta: 1
        });
    }

    private renderGoBack() {
        const { length } = getCurrentPages();
        const { type } = this.props;
        return length > 1 && <View className={styles.goback} onClick={this.onGoBack} >
            <MMIconFont color={type === MMNavigationType.default ? undefined : 'white'}
                value={MMIconFontName.Back}></MMIconFont>
        </View>;
    }
}

