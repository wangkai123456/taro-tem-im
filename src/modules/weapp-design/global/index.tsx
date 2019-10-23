import { View } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import MMToast from '~/components/navigation/index';
import { autobind } from '@wmeimob/decorator';

@autobind
export default class MMGlobal extends Component {
    render() {
        return <View>
            <MMToast></MMToast>
        </View>;
    }
}

