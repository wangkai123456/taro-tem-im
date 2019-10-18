import Taro, { Component } from '@tarojs/taro';
import { autobind } from '@wmeimob/decorator';
import { MMTabBar } from '@wmeimob/weapp-design';
import IconFontName from '~/components/styles/components/iconfont/name';

@autobind
export default class TabBar extends Component {
    static data = [
        { iconfont: IconFontName.home, text: '基础' },
        { iconfont: IconFontName.home, text: '请求' },
        { iconfont: IconFontName.components, text: '其他' }
    ];

    render() {
        return (
            <MMTabBar data={TabBar.data} onClick={this.onClick}></MMTabBar>
        );
    }

    private onClick(_data: { iconfont: string; text: string }, index: number) {
        switch (index) {
            case 0:
                Taro.reLaunch({
                    url: '/pages/index/index'
                });
                break;
            case 1:
                Taro.reLaunch({
                    url: '/pages/request/index'
                });
                break;
            case 2:
                Taro.reLaunch({
                    url: '/pages/other/index'
                });
                break;
        }
    }
}
