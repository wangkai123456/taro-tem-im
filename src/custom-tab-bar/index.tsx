import Taro, { Component } from '@tarojs/taro';
import IconFontName from '~/modules/weapp-design/iconfont/name';
import MMTabBar from '~/modules/weapp-design/tab-bar';

export default class Index extends Component {
    static data = [
        {
            iconfont: IconFontName.home,
            text: '基础',
            url: '/pages/index/index'
        },
        {
            iconfont: IconFontName.home,
            text: '请求',
            url: '/pages/request/index'
        },
        {
            iconfont: IconFontName.components,
            text: '其他',
            url: '/pages/other/index'
        }
    ];

    render() {
        return (<MMTabBar defaultData={Index.data}></MMTabBar>);
    }
}
