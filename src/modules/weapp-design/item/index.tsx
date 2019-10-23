import { View } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import { autobind } from '@wmeimob/decorator';
import styles from './index.modules.less';


interface ICheckboxProps {
    onClick?: () => void;
    renderRight?: JSX.Element | string;
}

@autobind
export default class MMItem extends Component<ICheckboxProps> {
    static options = {
        addGlobalClass: true
    };

    static defaultProps = {
        arrow: true
    };

    render() {
        return <View onClick={this.props.onClick} className={styles.MMItem}>
            <View>
                {this.props.children}
            </View>
            {this.props.renderRight}
        </View>;
    }
}
