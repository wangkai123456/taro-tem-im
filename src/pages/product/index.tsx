/* eslint-disable no-console */
import Taro, { Component, Config } from '@tarojs/taro';
import { ComponentType } from 'react';
import { autobind } from '@wmeimob/decorator';
import { MMCProductDetails } from '~/modules/@wmeimob/weapp-component-product/src/components';

@autobind
class Index extends Component {
    config: Config = {
        navigationBarTitleText: '',
        navigationStyle: 'custom'
    };

    state = {
        carousel: [
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571912142893&di=7dadc2532417d09c04f582517e312ee9&imgtype=0&src=http%3A%2F%2Fwww.forestry.gov.cn%2Fuploadfile%2Fmain%2F2013-6%2Fimage%2F2013-6-19-dbdb3e3f20b644ec959960e9d8308eda.jpg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571910861173&di=6a2d1a37706d6851187db9b14e044830&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201208%2F30%2F20120830173930_PBfJE.jpeg'
        ],
        list: [
            { title: '颜色', items: [{ id: '红色', text: '红色' }, { id: '黄色', text: '黄色' }] },
            { title: '尺寸', items: [{ id: '大', text: '大' }, { id: '小', text: '小' }] },
            { title: '保修', items: [{ id: '1年', text: '1年' }, { id: '1月', text: '1月' }] }
        ],
        sku: [{
            sku: ['大', '红色', '1年'], skuCount: 100, price: 100, originalPrice: 200,
            image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571910861173&di=6a2d1a37706d6851187db9b14e044830&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201208%2F30%2F20120830173930_PBfJE.jpeg'
        }, {
            sku: ['大', '黄色', '1年'], skuCount: 200, price: 200, originalPrice: 300,
            image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571912142893&di=7dadc2532417d09c04f582517e312ee9&imgtype=0&src=http%3A%2F%2Fwww.forestry.gov.cn%2Fuploadfile%2Fmain%2F2013-6%2Fimage%2F2013-6-19-dbdb3e3f20b644ec959960e9d8308eda.jpg'
        }, {
            sku: ['大', '黄色', '1月'], skuCount: 300, price: 300, originalPrice: 400,
            image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571910861173&di=6a2d1a37706d6851187db9b14e044830&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201208%2F30%2F20120830173930_PBfJE.jpeg'
        }]
    };

    render() {
        const { sku, list } = this.state;
        return (<MMCProductDetails
            title='D375万能文胸-蕾丝短款无钢圈性感文胸舒服聚拢标题最多显示2行'
            carousel={this.state.carousel}
            price={88}
            originalPrice={200}
            skuCount={50}
            sku={sku}
            image='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571912142893&di=7dadc2532417d09c04f582517e312ee9&imgtype=0&src=http%3A%2F%2Fwww.forestry.gov.cn%2Fuploadfile%2Fmain%2F2013-6%2Fimage%2F2013-6-19-dbdb3e3f20b644ec959960e9d8308eda.jpg'
            list={list}
            richText={`<img src="https://img.alicdn.com/imgextra/i3/883696985/TB2S8mPXwxlpuFjSszgXXcJdpXa_!!883696985.jpg" class="" align="middle" >
                <img src="https://img.alicdn.com/imgextra/i2/883696985/TB2q8qPXwxlpuFjSszgXXcJdpXa_!!883696985.jpg" class="" align="middle">`}
            salesVolume={2768}
        ></MMCProductDetails>);
    }
}

export default Index as ComponentType;
