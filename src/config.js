"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isDevelopment = process.env.NODE_ENV === 'development';
exports.apiUrl = isDevelopment ?
    'http://localhost:8080/'
    : 'http://localhost:8080/';
exports.loginUrl = '/pages/login/index';
//# sourceMappingURL=config.js.map