import { Text, Textarea, View } from '@tarojs/components';
import { TextareaProps } from '@tarojs/components/types/Textarea';
import Taro, { Component } from '@tarojs/taro';
import { autobind } from '~/modules/@wmeimob/decorator/src/components';
import styles from './index.modules.less';
import classNames from 'classnames';

/**
 * 自动切换成view的 textarea 并不完善需要优化
 *
 * @export
 * @class MMTextarea
 * @extends {Component<TextareaProps>}
 */
@autobind
export default class MMTextarea extends Component<TextareaProps> {
    static options = {
        addGlobalClass: true
    };

    state = {
        focus: false
    }

    render() {
        const { value, focus, cursor, placeholder, autoFocus, maxlength, disabled, fixed, showConfirmBar, autoHeight,
            cursorSpacing, onLineChange, onConfirm, adjustPosition, selectionStart, selectionEnd } = this.props;
        return <View onClick={() => this.setState({ focus: true })} >
            {
                focus ?
                    <Textarea focus={focus}
                        cursor={cursor}
                        selectionStart={selectionStart}
                        selectionEnd={selectionEnd}
                        adjustPosition={adjustPosition}
                        onConfirm={event => onConfirm && onConfirm(event)}
                        onLineChange={event => onLineChange && onLineChange(event)}
                        autoHeight={autoHeight}
                        cursorSpacing={cursorSpacing}
                        showConfirmBar={showConfirmBar}
                        fixed={fixed}
                        disabled={disabled}
                        autoFocus={autoFocus}
                        maxlength={maxlength}
                        placeholder={placeholder}
                        placeholderClass={styles.placeholderClass}
                        onInput={this.props.onInput}
                        className={classNames(this.props.className, styles.MMTextarea)} value={value} onBlur={this.onBlur} onFocus={this.onFocus}></Textarea>
                    : <View className={classNames(styles.MMTextarea, this.props.className, autoHeight ? styles.autoHeight : '')} >
                        <Text>{value}</Text>
                        {(value === '' || value === undefined) && placeholder && <Text className={styles.placeholderClass}>{placeholder}</Text>}
                    </View>
            }
        </View>;
    }

    onFocus(event) {
        this.setState({
            focus: true
        })
        this.props.onFocus && this.props.onFocus(event);
    }

    onBlur(event) {
        this.setState({
            focus: false
        })
        this.props.onBlur && this.props.onBlur(event);
    }
}

