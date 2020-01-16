import appFetch, { IRequestData, IRequestOption } from "./fetch";

export function get<T = any>(url: string, data?: IRequestData | string, option: IRequestOption = {}) {
    return appFetch.request<T>(url, data, {
        method: 'GET',
        ...option
    });
}

export function post<T = any>(url: string, data?: IRequestData | string, option: IRequestOption = {}) {
    return appFetch.request<T>(url, data, {
        method: 'POST',
        ...option
    });
}

export function put<T = any>(url: string, data?: IRequestData | string, option: IRequestOption = {}) {
    return appFetch.request<T>(url, data, {
        method: 'PUT',
        ...option
    });
}

export function del<T = any>(url: string, data?: IRequestData | string, option: IRequestOption = {}) {
    return appFetch.request<T>(url, data, {
        method: 'DELETE',
        ...option
    });
}

export default appFetch;
