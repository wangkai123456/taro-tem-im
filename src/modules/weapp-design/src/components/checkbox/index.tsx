import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { autobind } from '@wmeimob/decorator';
import { StandardProps } from '@tarojs/components/types/common';
import styles from './index.modules.less';
import themesStyles from '../styles/themes/default.modules.less';
import MMIconfont from '../iconfont/index';
import CheckBoxList from './list';

interface ICheckboxProps extends StandardProps {

    /**
     * 用于记录checkId
     *
     * @type {string}
     * @memberof ICheckboxProps
     */
    checkId?: string;

    /**
     * 是否单选
     *
     * @type {boolean}
     * @memberof ICheckboxProps
     */
    singleElection?: boolean

    /**
     * 选中状态
     *
     * @type {boolean}
     * @memberof ICheckboxProps
     */
    checked?: boolean;
    /**
     * 默认是否选中
     *
     * @type {boolean}
     * @memberof ICheckboxProps
     */
    defaultChecked?: boolean;
    /**
     * 禁用
     *
     * @type {boolean}
     * @memberof ICheckboxProps
     */
    disabled?: boolean;
    /**
     * 事件触发的回调
     *
     * @memberof ICheckboxProps
     */
    onChange?: (checked: boolean) => void;

    /**
     * 复选框列表
     *
     * @type {CheckBoxList}
     * @memberof ICheckboxProps
     */
    checkBoxList?: CheckBoxList;
}

interface ICheckboxState {
    checked: boolean;
}

@autobind
export default class MMCheckbox extends Component<ICheckboxProps, ICheckboxState> {
    static options = {
        addGlobalClass: true
    };

    static defaultProps = {
        defaultChecked: false
    };

    state = {
        checked: this.props.defaultChecked as boolean
    };

    get checked() {
        if (this.props.checked !== undefined) {
            return this.props.checked;
        }
        return this.state.checked;
    }

    set checked(checked) {
        this.setChecked(checked);
        if (this.props.checkBoxList) {
            this.props.checkBoxList.setCheck(this, checked);
        }
    }

    setChecked(checked) {
        if (this.props.checked !== undefined) {
            this.props.onChange && this.props.onChange(checked);
        } else {
            this.setState({
                checked
            });
        }
    }

    onClick() {
        const { checked } = this;
        this.checked = !checked;
    }

    componentDidMount() {
        if (this.props.checkBoxList) {
            this.props.checkBoxList.add(this);
        }
    }

    componentWillUnmount() {
        if (this.props.checkBoxList) {
            this.props.checkBoxList.delete(this);
        }
    }

    render() {
        const { singleElection } = this.props;
        return <View className={styles.MMCheckbox}
            onClick={this.onClick}>
            {singleElection ? this.renderRadio() : this.renderCheckbox()}
        </View>;
    }

    renderRadio() {
        return <MMIconfont size={25} color={themesStyles.primaryColor} value={this.checked ? "checkboxSelected" : "checkbox"} ></MMIconfont>;
    }

    renderCheckbox() {
        return <MMIconfont size={25} color={themesStyles.primaryColor} value={this.checked ? "roundCheck" : "round"} ></MMIconfont>;
    }
}
