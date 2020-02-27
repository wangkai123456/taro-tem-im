import { View } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import classnames from 'classnames';
import { autobind } from '~/modules/@wmeimob/decorator/src/components';
import MMModal, { IMMModalProps } from './index';
import styles from './index.modules.less';

export interface IMMModalAlertProps extends IMMModalProps {

    /**
     * 标题
     *
     * @type {string}
     * @memberof IMMModalAlertProps
     */
    title?: string;

    /**
     * 按钮事件
     *
     * @memberof IMMModalAlertProps
     */
    buttons?: {
        text: string;
        color?: string;
        onClick: () => void;
    }[];

}

@autobind
export default class MMModalAlert extends Component<IMMModalAlertProps> {
    static defaultProps = {
        buttons: []
    };

    private get className() {
        const classNameArray = [styles.MMModal_alert];
        if (!this.props.visible) {
            classNameArray.push(styles.MMModal_alert__hide);
        }

        return classnames(...classNameArray);
    }

    render() {
        const { title } = this.props;
        return <MMModal {...this.props}>
            <View className={this.className}>
                {title && <View className={styles.MMModal_alert_title}>{title}</View>}
                <View className={styles.MMModal_alert_content}>{this.props.children}</View>
                {this.props.buttons && this.props.buttons.length > 0 &&
                    <View className={styles.MMModal_alert_control}>
                        {this.props.buttons.map((value, index) => <View key={value.text + index}
                            style={value.color ? { color: value.color } : {}}
                            onClick={value.onClick}>{value.text}</View>)}
                    </View>}
            </View>
        </MMModal>;
    }
}
