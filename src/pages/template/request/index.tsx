/* eslint-disable no-console */
import { Button, View, Image } from '@tarojs/components';
import Taro, { Component, Config } from '@tarojs/taro';
import { ComponentType } from 'react';
import { autobind } from '~/modules/@wmeimob/decorator/src';
import { get, post } from '~/components/request';
import MMNavigation from '~/modules/@wmeimob/weapp-design/src/components/navigation';
import MMTabBar from '~/modules/@wmeimob/weapp-design/src/components/tab-bar';
import { uploadImageAliYun } from '~/components/upload';
import * as styles from './index.module.less';

@autobind
class Index extends Component {
    config: Config = {
        navigationBarTitleText: '',
        navigationStyle: 'custom'
    };

    state = {
        uploadImgArr: [] as any
    };

    async onGetClick () {
        const { data } = await get('/');
        console.log(data);
    }

    async onPostClick () {
        const { data } = await post('http://localhost:8080/api');
        console.log(data);
    }

    async onPostDataClick () {
        const { data } = await post('http://localhost:8080/data', { xxx: 1 });
        console.log(data);
    }

    async onUnLoginClick () {
        const { data } = await get('http://localhost:8080/login');
        console.log(data);
    }

    async onErrorClick () {
        try {
            await post('http://localhost:8080/code', {
                status: 418, data: {
                    'code': 418,
                    'msg': '错误信息'
                }
            });
            console.log('抛出了错误！');
        } catch (error) {
            console.log(error);
        }
    }

    async onConnectClick () {
        try {
            await post('http://www.adfadf.com/xxxxxxxxxx');
            console.log('抛出了错误！');
        } catch (error) {
            console.log(error);
        }
    }

    onUploadClick (files) {
        Taro.chooseImage({
            count: 9,
            success: (src) => {
                this.upLoad(src.tempFilePaths)
            }
        });
    }

    async upLoad (files) {
        const aliYunFiles = await Promise.all(files.map((item) => {
            uploadImageAliYun(item.url).then(value => {
                item.url = value;
            });
            return item;
        }));
        this.setState({
            uploadImgArr: aliYunFiles
        });
    }

    render () {
        const { uploadImgArr } = this.state
        return (
            <View className={styles.page}>
                <MMNavigation title="请求"></MMNavigation>
                <Button onClick={this.onGetClick}>get请求</Button>
                <Button onClick={this.onPostClick}>post请求</Button>
                <Button onClick={this.onPostDataClick}>传递参数</Button>
                <Button onClick={this.onUnLoginClick}>未登录</Button>
                <Button onClick={this.onErrorClick}>错误弹窗</Button>
                <Button onClick={this.onConnectClick}>网络连接失败</Button>
                <View className={styles.imgWrap}>
                    {uploadImgArr.map((item, index) => (
                        <View key={String(index)} className={styles.imgStyle}>
                            <Image src={item} mode="aspectFill" className={styles.imgItem}></Image>
                        </View>
                    ))}
                </View>
                <Button onClick={this.onUploadClick.bind(this, uploadImgArr)}>图片上传阿里云</Button>
                <MMTabBar></MMTabBar>
            </View>
        );
    }
}

export default Index as ComponentType;
