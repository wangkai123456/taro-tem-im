import Taro, { Component } from '@tarojs/taro';
import { autobind } from '@wmeimob/decorator';
import MMLottie from '../lottie';
import data from './data';
import dataBlack from './data-black';
import { MMLoadingType } from './types';

interface MMLoadingProps {
    width?: number
    height?: number
    type?: MMLoadingType
}

@autobind
export default class MMLoading extends Component<MMLoadingProps> {
    static defaultProps = {
        width: 20,
        height: 20,
        type: MMLoadingType.White
    }

    state = {
        alertProps: {
            visible: false,
            children: ''
        },
        confirmProps: {
            visible: false,
            children: ''
        }
    };

    render() {
        const { width, height, type } = this.props;
        return <MMLottie width={width as number} height={height as number} loop autoplay
            data={type === MMLoadingType.White ? data : dataBlack}>
        </MMLottie>;
    }
}
