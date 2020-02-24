import Taro from '@tarojs/taro';
import { get } from '~/components/request';
import { guid } from '../utils';

/**
 * 上传文件到阿里云
 * @param fileList 图片的本地资源
 */

export async function uploadImageAliYun (fileList: string[]) {
    const { data: { accessid, signature, policy, dir, host } } = await get(`/aliyun/oss-token`);
    return Promise.all(fileList.map(file => new Promise(resolve => {
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
            success () {
                resolve(`${host}/${formData.key}`);
            }
        })
    })));
}