import { Input, View } from '@tarojs/components';
import { BaseEventOrig } from '@tarojs/components/types/common';
import Taro, { Component } from '@tarojs/taro';
import { autobind } from '~/modules/@wmeimob/decorator/src/components';
import classNames from 'classnames';
import MMIconFont from '../icon-font';
import { MMInputSearchType } from './const';
import styles from './index.modules.less';
import MMIconFontName from '../icon-font/const';

interface EventValue {
    /** 输入值 */
    value: string,
    /** 光标位置 */
    cursor: number,
    /** 键值 */
    keyCode: number
}

interface IMMInputSearchProps {
    /**
     * 类型
     *
     * @type {MMInputSearchType}
     * @memberof IMMInputSearchProps
     */
    type?: MMInputSearchType

    /**
     * 站位词
     *
     * @type {string}
     * @memberof IMMInputSearchProps
     */
    placeholder?: string;
    /**
     * 搜索文字
     *
     * @type {string}
     * @memberof IMMInputSearchProps
     */
    searchText?: string;
    /**
     * 点击搜索
     *
     * @memberof IMMInputSearchProps
     */
    onSearch: (value: string) => void;

    /**
     * 输入事件
     *
     * @memberof IMMInputSearchProps
     */
    onInput?: (event: BaseEventOrig<EventValue>) => void
}

@autobind
export default class MMInputSearch extends Component<IMMInputSearchProps> {
    static defaultProps = {
        placeholder: '请输入关键字',
        searchText: '搜索'
    };

    static options = {
        addGlobalClass: true
    };

    state = {
        focus: false,
        value: ''
    }

    get className() {
        const classnames = [styles.MMInputSearch];

        if (this.state.focus) {
            classnames.push(styles.MMInputSearch__focus);
        }

        if (this.props.type === MMInputSearchType.primary) {
            classnames.push(styles.MMInputSearch__primary);
        }

        return classnames;
    }

    render() {
        return <View className={classNames(...this.className)}>
            <View className={styles.content} >
                <MMIconFont value={MMIconFontName.Search} size={16} color={styles.gray4} />
                <View className={styles.placeholder}>
                    {this.props.placeholder}
                </View>
                <View className={classNames(styles.input_box, styles.input_box__focus)}>
                    <Input value={this.state.value} onFocus={this.onFocus} onInput={this.onInput} onBlur={this.onBlur} />
                </View>
            </View>
            <View className={styles.text} onClick={this.onSearch}>
                <View>{this.props.searchText}</View>
            </View>
        </View>;
    }

    private onFocus() {
        this.setState({ focus: true });
    }

    private onBlur() {
        if (this.state.value === '') {
            this.setState({ focus: false });
        }
    }

    private onSearch() {
        this.props.onSearch(this.state.value.trim());
        this.setState({ focus: false, value: '' });
    }

    private onInput(event: BaseEventOrig<{
        /** 输入值 */
        value: string,
        /** 光标位置 */
        cursor: number,
        /** 键值 */
        keyCode: number
    }>) {
        this.props.onInput && this.props.onInput(event);
        this.setState({
            value: event.detail.value
        })
    }
}

