import Taro from '@tarojs/taro';
import { get } from '~/components/request';
import { guid } from '../utils';

/**
 * 上传文件到阿里云
 * @param fileList 图片的本地资源
 */

export async function uploadImageAliYun (fileList: string[]) {
    // const { data: { accessid, signature, policy, dir, host } } = await get(`/aliyun/oss-token`);
    const { accessid, signature, policy, dir, host } = {
        accessid: "LTAI4Fp6LmckowLdj716gVAr",
        dir: "img/",
        expire: "1582089616",
        host: "https://eternaldance1.oss-cn-shanghai.aliyuncs.com",
        policy: "eyJleHBpcmF0aW9uIjoiMjAyMC0wMi0xOVQwNToyMDoxNi44ODZaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsMTA0ODU3NjBdLFsic3RhcnRzLXdpdGgiLCIka2V5IiwiaW1nLyJdXX0=",
        signature: "uH+IZcisCS9IzQW2VD6pWwYwcJY="
    }
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