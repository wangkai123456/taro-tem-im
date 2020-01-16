import Taro, { Component } from '@tarojs/taro';
import { autobind } from '~/modules/@wmeimob/decorator/src';
import modal from './index';
import { View } from '@tarojs/components';
import MMToast from './toast';
import MMModalAlert from './alert';
import styles from '../styles/themes/default.modules.less';

@autobind
export default class MMPopup extends Component {
    state = {
        alertProps: {
            visible: false,
            children: ''
        },
        confirmProps: {
            visible: false,
            children: ''
        }
    };

    alert(_props: {
        okText?: string,
        message: string, title?: string, onOk?: () => void
    }) {
        modal.alert(_props);
    }

    confirm(_props: {
        title?: string;
        message?: string;
        okText?: string;
        cancelText?: string;
        onOk: () => void;
        onCancel?: () => void;
    }) {
        modal.confirm(_props);
    }

    toast(messages: string) {
        modal.toast(messages);
    }

    componentDidMount() {
        modal.alert = this.alertFunction;
        modal.confirm = this.confirmFunction;
    }

    success(message: string) {
        modal.success(message);
    }

    fail(message: string) {
        modal.fail(message);
    }

    warning(message: string) {
        modal.warning(message);
    }

    loading(message: string) {
        modal.loading(message);
    }

    render() {
        return <View>
            <MMToast></MMToast>
            <MMModalAlert {...this.state.alertProps}>
                {this.renderAlertContent()}
            </MMModalAlert>
            <MMModalAlert {...this.state.confirmProps}>
                {this.renderConfirmContent()}
            </MMModalAlert>
        </View>;
    }

    private renderAlertContent() {
        const { alertProps } = this.state;
        return <View>{alertProps.children}</View>;
    }

    private renderConfirmContent() {
        const { confirmProps } = this.state;
        return <View>{confirmProps.children}</View>;
    }

    private alertFunction({ message, title, onOk, okText }: {
        okText?: string,
        message: string, title?: string, onOk?: () => void
    }) {
        const buttons = [{
            text: okText || '确定',
            onClick: () => this.setState({
                alertProps: {
                    visible: false
                }
            }, () => onOk && onOk())
        }];

        const alertProps = {
            title,
            visible: true,
            onClose: () => this.setState({ alertProps: { visible: false } }),
            buttons,
            children: message
        };
        this.setState({ alertProps });
    }

    private confirmFunction({ title, message, onOk, okText, cancelText, onCancel }: {
        title: string,
        okText?: string;
        cancelText?: string;
        message: string; onOk?: () => void; onCancel?: () => void;
    }) {
        const buttons = [{
            text: cancelText || '取消',
            color: styles.gray7,
            onClick: () => {
                onCancel && onCancel();
                this.setState({ confirmProps: { visible: false } });
            }
        },
        {
            text: okText || '确定',
            onClick: () => {
                onOk && onOk();
                this.setState({ confirmProps: { visible: false } });
            }
        }];
        const confirmProps = {
            title,
            visible: true,
            onClose: () => this.alertClose(),
            buttons,
            children: message
        };
        this.setState({ confirmProps });
    }

    private alertClose() {
        this.setState({
            alertProps: {
                visible: false
            }
        });
    }
}
