import { View } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import { minus, plus } from 'number-precision';
import { autobind } from '@wmeimob/decorator';
import styles from './index.modules.less';
import themesStyles from '../styles/themes/default.modules.less';
import MMIconFont from '../icon-font';
import { MMIconFontName } from '../const';

interface IStepperProps {
    /**
     * 最小值
     *
     * @type {number}
     * @memberof IStepperProps
     */
    min?: number;
    /**
     * 最大值
     *
     * @type {number}
     * @memberof IStepperProps
     */
    max?: number;
    /**
     * 值
     *
     * @type {number}
     * @memberof IStepperProps
     */
    value?: number;
    /**
     * 默认值
     *
     * @type {number}
     * @memberof IStepperProps
     */
    defaultValue?: number;
    /**
     * 每次改变步数,可以为小数
     *
     * @type {number}
     * @memberof IStepperProps
     */
    step?: number;
    /**
     * 变化时回调函数
     *
     * @memberof IStepperProps
     */
    onChange?: (value: number) => void;
}

interface IStepperState {
    value: number;
}

@autobind
export default class MMStepper extends Component<IStepperProps, IStepperState> {
    static options = {
        addGlobalClass: true
    };

    static defaultProps = {
        min: -Infinity,
        max: Infinity,
        defaultValue: 0,
        step: 1
    };

    state: IStepperState = {
        value: this.props.defaultValue as number
    };

    get value() {
        if (this.props.value !== undefined) {
            return this.props.value;
        }
        return this.state.value;
    }

    plus() {
        let value = plus(this.state.value, this.props.step as number);
        if (this.props.max !== undefined && value > this.props.max) {
            value = this.props.max;
        }

        if (value !== this.state.value) {
            this.setState({
                value
            });
            this.props.onChange && this.props.onChange(value);
        }
    }

    minus() {
        let value = minus(this.state.value, this.props.step as number);
        if (this.props.min !== undefined && value < this.props.min) {
            value = this.props.min;
        }

        if (value !== this.state.value) {
            this.setState({
                value
            });
            this.props.onChange && this.props.onChange(value);
        }
    }

    render() {
        return <View className={styles.MMStepper}>
            <View className={styles.MMStepper_plues} onClick={this.minus}>
                <MMIconFont size={11} color={themesStyles.gray6} value={MMIconFontName.Lessen}></MMIconFont>
            </View>
            <View className={styles.MMStepper_text}>{this.value}</View>
            <View className={styles.MMStepper_plues} onClick={this.plus}>
                <MMIconFont size={11} color={themesStyles.gray6} value={MMIconFontName.Addition}></MMIconFont>
            </View>
        </View>;
    }
}

