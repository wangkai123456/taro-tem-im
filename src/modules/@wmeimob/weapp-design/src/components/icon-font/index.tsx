import { View } from '@tarojs/components';

import Taro, { Component } from '@tarojs/taro';
import { autobind } from '@wmeimob/decorator';
import classnames from 'classnames';
import styles from './index.modules.less';

interface IIconfontProps {
    /**
     * 图标值
     *
     * @type {string}
     * @memberof IIconfontProps
     */
    value: string;
    /**
     * 图标颜色
     *
     * @type {string}
     * @memberof IIconfontProps
     */
    color?: string;
    /**
     * 图标大小
     *
     * @type {number}
     * @memberof IIconfontProps
     */
    size?: number;
}

interface IIconfontState {
    checked: boolean;
}

@autobind
export default class MMIconFont extends Component<IIconfontProps, IIconfontState> {
    static defaultProps = {
        size: 20
    };

    static options = {
        addGlobalClass: true
    };

    render() {
        const { size, color } = this.props;
        const style: any = {};
        if (size !== undefined) {
            style.fontSize = size + 'px';
        }

        if (color !== undefined) {
            style.color = color;
        }

        return <View className={classnames(styles.MMIconFont, styles[`icon${this.props.value}`])}
            style={style}></View>;
    }
}

