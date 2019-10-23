import { View, Image } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import { autobind } from '@wmeimob/decorator';
import classname from 'classnames';
import MMIconfont from '../iconfont';
import styles from './index.modules.less';

interface IMMImagePickerProps {
    count?: number;
    // sizeType: ['original', 'compressed'],
    // sourceType: ['album', 'camera'],
    value: string[];
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
        return <View className={styles.MMImagePicker}>
            {this.props.value.map((value, index) => <View className={styles.item} key={value + index}>
                <View className={styles.itemContent}>
                    <Image className={styles.image} src={value}></Image>
                </View>
                {this.renderIconfont(index)}
            </View>)}
            <View onClick={this.onClick} className={classname(styles.item, styles.add)}>
                <View className={styles.itemContent}>
                </View>
                <View className={styles.line}></View>
                <View className={classname(styles.line, styles.lineVertical)}></View>
            </View>
        </View>;
    }

    private renderIconfont(index) {
        return <View className={styles.delete} onClick={() => this.onDelete(index)}>
            <MMIconfont size={20} value="delete"></MMIconfont>
        </View>;
    }

    private async onClick() {
        const { count } = this.props;
        const { tempFilePaths } = await Taro.chooseImage({
            count
        });
        this.props.onChange([...this.props.value, ...tempFilePaths]);
    }

    private onDelete(index: number) {
        this.props.onChange(this.props.value.filter((_value, _index) => _index !== index));
    }
}
