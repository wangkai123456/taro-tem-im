import Taro from '@tarojs/taro';
import { get } from '~/components/request';
import { guid } from '../utils';

/**
 * 上传文件到阿里云
 * @param fileList 图片的本地资源
 */

export async function uploadImageAliYun (fileList: string[]) {
    const { data } = await get(`/aliyun/oss-token`);
    const id = guid();
    // 新建一个上传队列
    const uploadList = [];
    fileList.forEach((item, index) => {
        uploadList[index] = new Promise((resolve, reject) => {
            const suffix = item.substr(item.lastIndexOf(".") + 1);
            const postData = {
                'OSSAccessKeyId': data.accessid,
                'signature': data.signature,
                'policy': data.signature,
                'key': data.dir + id + '.' + suffix,
                'success_action_status': 200
            }
            Taro.uploadFile({
                url: data.host,
                filePath: item,
                name: 'file',
                formData: postData,
                success () {
                    resolve(`${data.host}/${postData.key}`);
                }
            })
        })
    })
    await Promise.all(uploadList)
    return uploadList;
}
