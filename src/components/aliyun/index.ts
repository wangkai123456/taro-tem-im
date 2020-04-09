import Taro from '@tarojs/taro';
import { get } from '~/components/request';
import { aliyunOssTokenUrl } from '~/config';
import { merge } from '~/modules/@wmeimob/decorator/src/components';
import { guid } from '~/modules/@wmeimob/weapp-design/src/components/utils';

class AliYun {
    /**
     * 几倍图
     *
     * @static
     * @memberof AliYun
     */
    static multiple = 2

    /**
     * 整数
     *
     * @static
     * @memberof AliYun
     */
    static trunc(nu: number) {
        return Math.trunc(nu) * AliYun.multiple;
    }

    /**
     * 上传文件
     *
     * @param {string[]} fileList
     * @returns
     * @memberof AliYun
     */
    static async uploadImages(fileList: string[]) {
        const { data: { accessid, signature, policy, dir, host } } = await AliYun.getOssToken();

        const reg = /^https/;

        return Promise.all(fileList.map(file => new Promise(resolve => {
            if (reg.test(file)) {
                resolve(file);
                return;
            }

            const formData = {
                signature,
                OSSAccessKeyId: accessid,
                policy,
                key: `${dir}${guid()}.${file.substr(file.lastIndexOf(".") + 1)}`,
                'success_action_status': 200
            }

            Taro.uploadFile({
                url: host,
                filePath: file,
                name: 'file',
                formData,
                success() {
                    resolve(`${host}/${formData.key}`);
                }
            })
        })));
    }

    @merge()
    static getOssToken() {
        return get(aliyunOssTokenUrl);
    }

    /**
     * 获取剪接图片后缀
     *
     * @static
     * @param {{ width: number, height: number }} { width, height }
     * @returns
     * @memberof AliYun
     */
    static getResizeUrl({ width, height }: { width: number, height: number }) {
        return `?x-oss-process=image/resize,w_${AliYun.trunc(width)},h_${AliYun.trunc(height)}`;
    }

    /**
     * 获取视频剪接url
     *
     * @static
     * @param {{ width: number, height: number }} { width, height }
     * @returns
     * @memberof AliYun
     */
    static getVideoSnapshotUrl({ width, height }: { width: number, height: number }) {
        return `?x-oss-process=video/snapshot,t_7000,f_jpg,w_${AliYun.trunc(width)},h_${AliYun.trunc(height)},m_fast`
    }
}

export const { uploadImages, getResizeUrl, getVideoSnapshotUrl } = AliYun;
