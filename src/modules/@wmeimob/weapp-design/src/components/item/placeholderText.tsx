import { Text } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import { autobind } from '~/modules/@wmeimob/decorator/src/components';
import { IMMIconfontProps } from '../icon-font';
import styles from './input.modules.less';

@autobind
export default class MMItemPlaceholderText extends Component<Partial<IMMIconfontProps>> {
    static options = {
        addGlobalClass: true
    };

    static defaultProps = {
    };

    state = {
    }

    render() {
        return <Text className={styles.placeholder}>{this.props.children}</Text>;
    }
}
