import { View, Image } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import { autobind } from '@wmeimob/decorator';
import classname from 'classnames';
import MMIconFont from '../icon-font';
import styles from './index.modules.less';
import { MMIconFontName } from '../const';

interface IMMImagePickerProps {
    /**
     * 最多可选择张数
     *
     * @type {number}
     * @memberof IMMImagePickerProps
     */
    count?: number;
    /**
     * 图片值
     *
     * @type {string[]}
     * @memberof IMMImagePickerProps
     */
    value: string[];
    /**
     * 改变事件
     *
     * @memberof IMMImagePickerProps
     */
    onChange: (value: string[]) => void;
}

@autobind
export default class MMImagePicker extends Component<IMMImagePickerProps> {
    static options = {
        addGlobalClass: true
    };

    static defaultProps = {
        count: 9,
        value: []
    };

    render() {
        const { value, count } = this.props;
        return <View className={styles.MMImagePicker}>
            {value.map((val, index) => <View className={styles.item} key={val + index}>
                <View className={styles.itemContent}>
                    <Image className={styles.image} src={val}></Image>
                </View>
                {this.renderIconfont(index)}
            </View>)}
            {(count === undefined || value.length < count) && <View onClick={this.onClick} className={classname(styles.item, styles.add)}>
                <View className={styles.itemContent}>
                </View>
                <View className={styles.line}></View>
                <View className={classname(styles.line, styles.lineVertical)}></View>
            </View>}
        </View>;
    }

    private renderIconfont(index) {
        return <View className={styles.delete} onClick={() => this.onDelete(index)}>
            <MMIconFont size={20} value={MMIconFontName.Delete}></MMIconFont>
        </View>;
    }

    private async onClick() {
        const { count } = this.props;
        const { tempFilePaths } = await Taro.chooseImage({
            count
        });

        const paths = [...this.props.value, ...tempFilePaths];
        paths.splice(this.props.count as number, paths.length);
        this.props.onChange(paths);
    }

    private onDelete(index: number) {
        this.props.onChange(this.props.value.filter((_value, _index) => _index !== index));
    }
}
