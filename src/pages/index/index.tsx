import { View, Text } from '@tarojs/components';
import { observer } from '@tarojs/mobx';
import Taro, { Component, Config } from '@tarojs/taro';
import { ComponentType } from 'react';
import './index.less';
import { get, post } from '~/components/request';
import global from '~/globalStore';

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
    navigationBarTitleText: '首页'
  }

  state = {
    getDataString: '',
    postDataString: '',
    list: [{ a: 'a' }, 1, 2, 4, 5]
  }

  onClick() {
    Taro.showToast({
      title: '点击事件'
    });
  }

  /**
   * 组件第一次渲染完成
   *
   * @memberof Index
   */
  async componentDidMount() {
    console.log('componentDidMount');
    const { data: getDataString } = await get('/');
    this.setState({ getDataString });

    const { data: postDataString } = await post('http://localhost:8080/api');
    this.setState({ postDataString });

    const { data: jsonString } = await get('http://localhost:8080/data');
    console.log(jsonString);
  }

  /**
   * 组件即将销毁
   *
   * @memberof Index
   */
  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  /**
   * 跳转别的页面时生命周期  相对于微信小程序生命周期onHide
   *
   * @memberof Index
   */
  componentDidHide() {
    console.log('componentDidHide');
  }

  /**
   * 跳转别的页面再回来时的生命周期  相对于微信小程序生命周期onShow
   *
   * @memberof Index
   */
  componentDidShow() {
    console.log('componentDidShow');
  }

  /**
   * 装饰器 @observer 注入的生命周期，mobx数据修改
   *
   * @memberof Index
   */
  componentWillReact() {
    console.log('componentWillReact');
  }

  renderItem(item: { a: string } | number) {
    let type = typeof item;
    if (type === 'object') {
      return <View>
        <Text>{(item as { a: string }).a}</Text>
      </View>
    } else if (type === 'number') {
      return <View>
        <Text>{item}</Text>
      </View>
    }
  }

  onClickNavigateTo() {
    Taro.navigateTo({
      url: '/pages/login/index',
      params: {
        a: 1
      }
    });
  }

  render() {
    let { list, getDataString, postDataString } = this.state;
    let { user: { userName } } = global;
    return (
      <View className='index'>
        <View>
          <Text>用户名:{userName}</Text>
        </View>
        <View onClick={this.onClick}>点击事件</View>
        <View>
          <Text>get:{getDataString}</Text>
        </View>
        <View>
          <Text>post:{postDataString}</Text>
        </View>

        <View>
          {list.map(value => this.renderItem(value))}
        </View>

        <View>
          <Text onClick={this.onClickNavigateTo}>跳转登录页</Text>
        </View>


      </View>
    )
  }

}

export default Index as ComponentType
