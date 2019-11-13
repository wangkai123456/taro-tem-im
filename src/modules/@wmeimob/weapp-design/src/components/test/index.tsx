import { View } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';

interface IMMTabBarProps {
    renderTest: () => JSX.Element;
}

// @autobind
export default class Test extends Component<IMMTabBarProps> {
    static options = {
        addGlobalClass: true
    };

    static defaultProps = {
    };

    render() {
        return <View>
            {this.props.renderTest()}
            {this.props.renderTest()}
            {this.props.renderTest()}
            {this.props.renderTest()}
            {this.props.renderTest()}
        </View>;
    }
}
