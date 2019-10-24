import { View } from '@tarojs/components';
import { StandardProps } from '@tarojs/components/types/common';
import Taro, { Component } from '@tarojs/taro';
import { autobind } from '@wmeimob/decorator';
import styles from './index.modules.less';

@autobind
export default class MMCarouselItem extends Component<StandardProps> {
    static options = {
        addGlobalClass: true,
        styleIsolation: 'apply-shared'
    };

    render() {
        return <View className={styles.item}>
            {this.props.children}
        </View>;
    }
}

