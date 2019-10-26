import { Input, View } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import { autobind } from '@wmeimob/decorator';
import classNames from 'classnames';
import MMIconFont from '../icon-font';

import { MMInputSearchType } from './const';
import styles from './index.modules.less';

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
     * 搜索问绷
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
                <MMIconFont value="magnifier" color={styles.gray4}></MMIconFont>
                <View className={styles.placeholder}>
                    {this.props.placeholder}
                </View>
                <View className={classNames(styles.input_box, styles.input_box__focus)}>
                    <Input value={this.state.value} onFocus={this.onFocus} onInput={this.onInput} onBlur={this.onBlur}></Input>
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

    private onInput(event: any) {
        this.setState({
            value: event.currentTarget.value
        })
    }
}

