import { View } from '@tarojs/components';
import Taro, { Component, Config } from '@tarojs/taro';
import { autobind } from '~/modules/@wmeimob/decorator/src/components';
import { ComponentType } from 'react';
import { BaseEventOrig } from '@tarojs/components/types/common';

@autobind
class Index extends Component {
    config: Config = {
        navigationStyle: 'custom'
    };

    state = {
        value: '',
        starsValue: 0,
        imagesValue: []
    };

    render() {
        return (<View></View>);
    }

    private onStarsChange(starsValue) {
        this.setState({
            starsValue
        })
    }

    private onClick() {
        return new Promise(() => null);
    }

    private onInput(event: BaseEventOrig<{ value: string; cursor: number; keyCode: number; }>) {
        this.setState({
            value: event.detail.value
        })
    };
}

export default Index as ComponentType;

