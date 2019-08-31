import { Text, View } from '@tarojs/components';
import { observer } from '@tarojs/mobx';
import Taro, { Component, Config } from '@tarojs/taro';
import { ComponentType } from 'react';
import './index.scss';
import { autobind } from '~/components/decorator';
import Comp from '~/components/component';

interface PageStateProps {
    global: {
        counter: number;
        increment: Function;
        decrement: Function;
        incrementAsync: Function;
    };
}

interface Index {
    props: PageStateProps;
}

@autobind
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
        navigationBarTitleText: '我的',
        enablePullDownRefresh: true
    };

    state = {
        show: true,
        switchIndex: 0
    };

    onPullDownRefresh() {
        setTimeout(() => {
            // 停止下拉动作
            // tslint:disable-next-line: semicolon
            Taro.stopPullDownRefresh();
        }, 1000);
    }

    renderSwitch() {
        const { switchIndex } = this.state;
        switch (switchIndex) {
            case 0:
            { return <View>0</View> }
            case 1:
            { return <View>1</View> }
        }
    }

    render() {
        const { show } = this.state;
        return (
            <View className="content">
                <Text>{this.config.navigationBarTitleText}</Text>
                <View>
                    {show ? 'true' : 'false'}
                </View>
                {this.renderSwitch()}
                <Comp>
                    <View>组件的儿子</View>
                    <View>{this.state.switchIndex}</View>
                </Comp>
            </View>
        );
    }
}

export default Index as ComponentType;
