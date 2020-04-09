import { Input } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import { autobind } from '~/modules/@wmeimob/decorator/src/components';
import styles from './input.modules.less';
import { BaseEventOrigFunction } from '@tarojs/components/types/common';

interface IItemInputProps {
    value?: string

    placeholder?: string

    onInput?: BaseEventOrigFunction<{
        value: string;
        cursor: number;
        keyCode: number;
    }>

    textAlign?: 'right' | 'left'
}

@autobind
export default class MMItemInput extends Component<IItemInputProps> {
    static options = {
        addGlobalClass: true
    };

    static defaultProps = {
        textAlign: 'right'
    };

    state = {
    }

    render() {
        const { onInput, placeholder, value, textAlign } = this.props;
        return <Input placeholderClass={styles.placeholder} value={value}
            style={{ textAlign }}
            placeholder={placeholder} className={styles.input}
            onInput={onInput} />;
    }
}
