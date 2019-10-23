import { View } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import { autobind } from '@wmeimob/decorator';


interface IMMTabBarProps {
    renderTest: () => JSX.Element;
}

@autobind
export default class Test extends Component<IMMTabBarProps> {
    static options = {
        addGlobalClass: true
    };

    static defaultProps = {
    };

    render() {
        return <View className={name}>
            {this.props.renderTest()}
        </View>;
    }
}
