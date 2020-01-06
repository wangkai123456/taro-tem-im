import Taro, { Component } from '@tarojs/taro';
import IconFontName from '~/modules/@wmeimob/weapp-design/src/components/icon-font/name';
import MMTabBar from '~/modules/@wmeimob/weapp-design/src/components/tab-bar';

export default class Index extends Component {
    static data = [
        {
            iconfont: IconFontName.Folder,
            text: '基础',
            url: '/pages/template/index/index'
        },
        {
            iconfont: IconFontName.Send,
            text: '请求',
            url: '/pages/template/request/index'
        },
        {
            iconfont: IconFontName.Class,
            text: '其他',
            url: '/pages/template/other/index'
        }
    ];

    render() {
        return (<MMTabBar defaultData={Index.data}></MMTabBar>);
    }
}
