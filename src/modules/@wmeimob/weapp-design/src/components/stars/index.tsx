import { View } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import { autobind } from '@wmeimob/decorator';
import styles from './index.modules.less';
import { MMIconFont } from '..';
import IconFontName from '../icon-font/name';
import themesStyles from '../styles/themes/default.modules.less';
import { MMStarsSize } from './const';

interface IStarsProps {

    /**
     * 当前星级数量
     *
     * @type {number}
     * @memberof IStarsProps
     */
    value: number

    /**
     * 尺寸大小
     *
     * @type {MMStarsSize}
     * @memberof IStarsProps
     */
    size?: MMStarsSize

    /**
     * 星级总数量
     *
     * @type {number}
     * @memberof IStarsProps
     */
    count?: number

    /**
     * 改变事件
     *
     * @memberof IStarsProps
     */
    onChange?: (value: number) => void
}

@autobind
export default class MMStars extends Component<IStarsProps> {
    static options = {
        addGlobalClass: true
    };

    static defaultProps = {
        size: MMStarsSize.Default,
        count: 5
    };

    get size() {
        switch (this.props.size) {
            case MMStarsSize.Big:
                return 18;
            default:
                return 10;
        }
    }

    get style() {
        switch (this.props.size) {
            case MMStarsSize.Big:
                return {
                    marginRight: parseInt(themesStyles.spacingSize.replace('px', ''), 10) * 2 + 'px'
                };
            default:
                return {
                    marginRight: themesStyles.spacingSize
                };
        }
    }

    render() {
        const countArray = new Array(this.props.count).fill(1);
        const { onChange, value } = this.props;
        return <View className={styles.MMStars}>
            {countArray.map((val, index) => <View className={styles.item} style={this.style} key={val + index} onClick={() => onChange && onChange(index + 1)}>
                <MMIconFont size={this.size} color={index < value ? themesStyles.yellow : themesStyles.gray4}
                    value={IconFontName.Collect}></MMIconFont></View>)}
        </View>;
    }
}
