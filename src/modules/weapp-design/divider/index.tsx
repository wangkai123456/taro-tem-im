import { View } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import { autobind } from '@wmeimob/decorator';
import { MMDividerStyle } from './const';
import styles from './index.modules.less';
import classNames from 'classnames';

interface IMMDividerProps {
    /**
     * 分割线大小
     *
     * @type {number}
     * @memberof IMMDividerProps
     */
    size?: number;

    /**
     * 是否是粗细
     *
     * @type {boolean}
     * @memberof IMMDividerProps
     */
    bold?: boolean

    /**
     * 分割线类型
     *
     * @type {DividerStyle}
     * @memberof IMMDividerProps
     */
    type?: MMDividerStyle;

    /**
     * 是否是垂直线
     *
     * @type {boolean}
     * @memberof IMMDividerProps
     */
    vertical?: boolean;
}

@autobind
export default class MMDivider extends Component<IMMDividerProps> {
    static options = {
        addGlobalClass: true
    };

    private get className() {
        const classnames = [styles.MMDivider];

        switch (this.props.type) {
            case MMDividerStyle.dotted:
                classnames.push(styles.MMDivider__dotted);
                break;
            case MMDividerStyle.dashed:
                classnames.push(styles.MMDivider__dashed);
                break;
        }

        if (this.props.vertical) {
            classnames.push(styles.MMDivider__vertical);
        }

        if (this.props.bold) {
            classnames.push(styles.MMDivider__bold);
        }

        return classNames(...classnames);
    }

    private get style() {
        const style: React.CSSProperties = {};
        if (this.props.size !== undefined) {
            if (this.props.vertical) {
                style.height = this.props.size + 'px';
            } else {
                style.width = this.props.size + 'px';
            }
        }
        return style;
    }

    render() {
        return <View style={this.style} className={this.className}>
        </View>;
    }
}

