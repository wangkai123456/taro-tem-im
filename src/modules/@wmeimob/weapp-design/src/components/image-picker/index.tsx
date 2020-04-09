import { View, Image, Text } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import { autobind } from '~/modules/@wmeimob/decorator/src/components';
import classname from 'classnames';
import MMIconFont from '../icon-font';
import styles from './index.modules.less';
import themesStyles from '../styles/themes/default.modules.less';
import MMIconFontName from '../icon-font/const';

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
            <View className={styles.content}>
                {value.map((val, index) => <View className={styles.item} key={val + index}>
                    <View className={styles.itemContent}>
                        <Image className={styles.image} src={val} />
                    </View>
                    {this.renderIconfont(index)}
                </View>)}
                {(count === undefined || value.length < count) && <View onClick={this.onClick}
                    className={classname(styles.item, styles.add)}>
                    <View className={styles.itemContent} />
                    <View className={styles.addContent}>
                        <View>
                            <MMIconFont size={32} color={themesStyles.gray3} value={MMIconFontName.PhotoUpload} />
                        </View>
                        <Text className={styles.addText}>添加图片</Text>
                    </View>
                </View>}
            </View>
        </View>;
    }

    private renderIconfont(index) {
        return <View className={styles.delete} onClick={() => this.onDelete(index)}>
            <MMIconFont size={10} color={themesStyles.gray1} value={MMIconFontName.Close} />
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
