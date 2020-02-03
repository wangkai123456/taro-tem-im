const isDevelopment = process.env.NODE_ENV === 'development';

export const apiUrl = isDevelopment ?
    'http://localhost:8080/'
    : 'http://localhost:8080/';

export const loginUrl = '/pages/template/login/index';

// 启动静默授权
export const silentAuthorization = true;
