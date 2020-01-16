
import IconFontName from './const';
import classNames from 'classnames';
import * as styles from "./index.modules.less";
import { autobind } from '~/modules/@wmeimob/decorator/src';
import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';

interface IIconfontProps {
    /**
     * 图标值
     *
     * @type {string}
     * @memberof IIconfontProps
     */
    value: IconFontName;

    /**
     * 图标大小
     *
     * @type {number}
     * @memberof IIconfontProps
     */
    width?: number;
    height?: number;
}

@autobind
export default class MMIconImage extends Component<IIconfontProps> {
    static defaultProps = {
        size: 20
    };

    static options = {
        addGlobalClass: true
    };

    render() {
        const { width, height, value } = this.props;
        const style: any = {};
        if (width) {
            style.width = width + "px";
        }
        if (height) {
            style.height = height + "px";
        }

        return <View className={classNames(styles.iconfont, styles[value])}
            style={style}></View>;
    }
}

