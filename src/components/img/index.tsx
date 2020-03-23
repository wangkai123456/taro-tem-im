
import { View, Image } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import * as styles from './index.module.less';
import { getResizeUrl } from '../aliyun';

interface IProps {
    width: number
    height: number
    src: string
}

export default class Img extends Component<IProps> {
    static options = {
        addGlobalClass: true
    };

    state = {
    };

    render() {
        return (<Image src={this.getSrc()} className={styles.image} />);
    }

    getSrc() {
        const { src, width, height } = this.props;
        if (!(/\?/g).test(src)) {
            return src + getResizeUrl({ width, height })
        }
        return src;
    }
}
