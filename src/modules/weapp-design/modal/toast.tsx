import { View } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import classname from 'classnames';
import { autobind } from '@wmeimob/decorator';
import MMModal from '../modal/modal';
import { guid } from '../utils';
import modal from './index';
import styles from './index.modules.less';

interface IMMToastProps {
    mask?: boolean;
    duration?: number;
}

enum ToastState {
    new,
    showing,
    hideing
}

interface IMMToastState {
    visible: boolean;
    messages: { id: string; message: string; state: ToastState }[];
}

@autobind
export default class MMToast extends Component<IMMToastProps, IMMToastState> {
    static options = {
        addGlobalClass: true
    };

    static defaultProps = {
        mask: false,
        duration: 2000
    };

    state: IMMToastState = {
        visible: true,
        messages: []
    };

    clearSetTimeout;

    componentDidMount() {
        (modal as any)['toast'] = this.message;
    }

    componentDidShow() {
        (modal as any)['toast'] = this.message;
    }

    /**
     * 动画
     *
     * @param {string} msg
     * @memberof MMToast
     */
    message(msg: string) {
        const id = guid();
        this.setState({
            messages: [...this.state.messages, {
                id,
                message: msg,
                state: ToastState.new
            }]
        });

        setTimeout(() => this.setState({
            messages: this.state.messages.map(value => {
                if (value.id === id) {
                    return { ...value, state: ToastState.showing };
                }
                return value;
            })
        }), 100);

        setTimeout(() => this.setState({
            messages: this.state.messages.map(value => {
                if (value.id === id) {
                    return { ...value, state: ToastState.hideing };
                }
                return value;
            })
        }), this.props.duration);

        // 变量需要和less的 @transitionTiming 一样
        clearTimeout(this.clearSetTimeout);
        const transitionTiming = 500;
        this.clearSetTimeout = setTimeout(() => this.clear(), (this.props.duration as number) + transitionTiming);
    }

    clear() {
        this.setState({
            messages: []
        });
    }

    render() {
        return <MMModal visible={this.state.visible} mask={this.props.mask}>
            <View className={styles.MMToast}>
                {this.state.messages.map(value => <View key={value.id} className={this.getMessageClassName(value)}>
                    {value.message}
                </View>)}
            </View>
        </MMModal>;
    }

    getMessageClassName(value: { id: string; message: string; state: ToastState }): string | undefined {
        const classArray = [styles.MMToast_message];
        switch (value.state) {
            case ToastState.showing:
                classArray.push(styles.MMToast_message__showing);
                break;
            case ToastState.hideing:
                classArray.push(styles.MMToast_message__hideing);
                break;
        }

        return classname(...classArray);
    }
}

