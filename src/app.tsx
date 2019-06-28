import '@tarojs/async-await';
import { Provider } from '@tarojs/mobx';
import Taro, { Component, Config } from '@tarojs/taro';
import './app.scss';
import Index from './pages/index';
import global from './globalStore';
import pagesIndexStore from './pages/index/store';

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = {
  global,
  pagesIndexStore: pagesIndexStore
}

class App extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/roll/index',
      'pages/index/index',
      'pages/diy/index',
      'pages/cart/index',
      'pages/my/index'
    ],
    tabBar: {
      list: [{
        "iconPath": "./static/images/icon-index-select.png",
        "selectedIconPath": "./static/images/icon-index-selected.png",
        "pagePath": "pages/index/index",
        "text": "首页"
      }, {
        "iconPath": "./static/images/icon-index-select.png",
        "selectedIconPath": "./static/images/icon-index-selected.png",
        "pagePath": "pages/roll/index",
        "text": "组件"
      }, {
        "iconPath": "./static/images/icon-customer-select.png",
        "selectedIconPath": "./static/images/icon-customer-selected.png",
        "pagePath": "pages/diy/index",
        "text": "坑"
      }, {
        "iconPath": "./static/images/icon-index-select.png",
        "selectedIconPath": "./static/images/icon-index-selected.png",
        "pagePath": "pages/cart/index",
        "text": "绕坑"
      }, {
        "iconPath": "./static/images/icon-main-select.png",
        "selectedIconPath": "./static/images/icon-main-selected.png",
        "pagePath": "pages/my/index",
        "text": "我的"
      }]
    },
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }

  componentDidMount() {

  }

  componentDidShow() { }

  componentDidHide() { }

  componentDidCatchError() { }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
