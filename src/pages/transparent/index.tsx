import { Image, View } from '@tarojs/components';
import { observer } from '@tarojs/mobx';
import Taro, { Component, Config } from '@tarojs/taro';
import { ComponentType } from 'react';
import imageSrc from './images/image.jpeg';
import * as styles from './index.module.less';
import MMNavigation from '~/modules/@wmeimob/weapp-design/src/components/navigation';
import { MMNavigationType } from '~/modules/@wmeimob/weapp-design/src/components/navigation/const';

@observer
class Index extends Component {
    /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
    config: Config = {
        // navigationBarTitleText: '图片'
        navigationStyle: 'custom'
    };

    state = {
    };

    onClick() {
        Taro.navigateBack({
            delta: 1
        });
    }

    render() {
        return (
            <View className={styles.page}>
                <MMNavigation type={MMNavigationType.transparent} title="透明导航"></MMNavigation>
                <Image className={styles.image} src={imageSrc} />
            </View>
        );
    }
}

export default Index as ComponentType;
