import { View, ScrollView } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import { autobind } from '~/modules/@wmeimob/decorator/src';
import { MMIconFont, MMModal, MMButton } from '~/modules/@wmeimob/weapp-design/src/components';
import { MMModalJustifyContent, MMButtonType } from '~/modules/@wmeimob/weapp-design/src/components/const';
import styles from './index.module.less';
import { IScreenItem, IScreenItemSingleElection } from '../screen/types';

interface MMCProductScreenModalProps {
    data: IScreenItem[]
}

interface MMCProductScreenModalState {
    /**
     * 滚动条高度
     *
     * @type {number}
     * @memberof MMCProductScreenModalState
     */
    scrollViewHeight: number
    /**
     * 弹窗是否显示
     *
     * @type {boolean}
     * @memberof MMCProductScreenModalState
     */
    visible: boolean

}

@autobind
export default class MMCProductScreenModal extends Component<MMCProductScreenModalProps, MMCProductScreenModalState> {
    static options = {
        addGlobalClass: true
    };

    static defaultProps = {
        data: []
    };

    state: MMCProductScreenModalState = {
        scrollViewHeight: 0,
        visible: true
    };

    componentDidMount() {
        this.calculateScrollViewHeight()
    }

    render() {
        const { visible } = this.state;
        return <View className={styles.screen}>
            <View onClick={() => this.setState({ visible: true })}>
                <MMIconFont value="components"></MMIconFont>
            </View>
            <MMModal visible={visible} justifyContent={MMModalJustifyContent.flexStart}
                onClose={() => this.setState({ visible: false })}>
                <View className={styles.modal_content}>
                    <View className={styles.modal_title}>
                        <View className='container' >筛选</View>
                    </View>
                    <View className={styles.modal_scroll} id={styles.modal_scroll}>
                        <ScrollView scrollY style={{ height: this.state.scrollViewHeight + 'px' }}>

                        </ScrollView>
                    </View>
                    <View className={styles.modal_button}>
                        <View className={styles.modal_button_item} onClick={() => this.setState({ visible: false })}>
                            <MMButton>取消</MMButton>
                        </View>
                        <View className="spacing"></View>
                        <View className={styles.modal_button_item}>
                            <MMButton type={MMButtonType.Primary}>确定</MMButton>
                        </View>
                    </View>
                </View>
            </MMModal>
        </View>;
    }

    private renderSingleElection(screenItemSingleElection: IScreenItemSingleElection) {
        // return screenItemSingleElection.data.map()
        return <View></View>
    }

    private async calculateScrollViewHeight() {
        const topViewRes = await this.getViewRes('#' + styles.modal_scroll);
        console.log('topViewRes.height', topViewRes.height);
        this.setState({
            scrollViewHeight: topViewRes.height
        });
    }

    private getViewRes(name: string) {
        return new Promise<Taro.clientRectElement>((resolve) => {
            const query = Taro.createSelectorQuery().in(this.$scope);
            query.select(name).boundingClientRect((res) => {
                resolve(res as Taro.clientRectElement);
            }).exec();
        });
    }
}

