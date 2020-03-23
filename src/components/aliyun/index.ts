import Taro from '@tarojs/taro';
import { get } from '~/components/request';
import { aliyunOssTokenUrl } from '~/config';
import { merge } from '~/modules/@wmeimob/decorator/src/components';
import { guid } from '~/modules/@wmeimob/weapp-design/src/components/utils';

class AliYun {
    /**
     * 上传文件
     *
     * @param {string[]} fileList
     * @returns
     * @memberof AliYun
     */
    static async uploadImageAliYun(fileList: string[]) {
        const { data: { accessid, signature, policy, dir, host } } = await AliYun.getAliyunOssToken();

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
    static getAliyunOssToken() {
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
        return `?x-oss-process=image/resize,w_${Math.trunc(width) * 2},h_${Math.trunc(height) * 2}`;
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
        return `?x-oss-process=video/snapshot,t_7000,f_jpg,w_${width},h_${height},m_fast`
    }
}

export const { uploadImageAliYun, getResizeUrl, getVideoSnapshotUrl } = AliYun;
