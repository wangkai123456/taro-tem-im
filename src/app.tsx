import '@tarojs/async-await';
import { Provider } from '@tarojs/mobx';
import Taro, { Component, Config } from '@tarojs/taro';
import './app.less';
import global from './globalStore';
import mount from './lifeCycle';
import Index from './pages/template/index';
import pagesIndexStore from './pages/template/index/store';

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = {
  global,
  pagesIndexStore
};

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
      'pages/template/index/index',
      'pages/template/other/index',
      'pages/template/mobx/index',
      'pages/template/login/index',
      'pages/template/test/index',
      'pages/template/decorator/index',
      'pages/template/transparent/index',
      'pages/template/request/index'
    ],
    tabBar: {
      custom: true,
      list: [{
        'pagePath': 'pages/template/index/index',
        'text': '首页'
      }, {
        'pagePath': 'pages/template/request/index',
        'text': '请求'
      }, {
        'pagePath': 'pages/template/other/index',
        'text': '其他'
      }]
    },
    window: {
      // 默认颜色不显示下拉加载的loading图片
      backgroundTextStyle: 'dark',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  };

  globalData = {
    userInfo: null
  };

  /**
   * 程序初始化
   *
   * @memberof App
   */
  constructor() {
    super();
    mount();
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById('app'));
