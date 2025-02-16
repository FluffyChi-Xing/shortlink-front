import {ofetch} from "ofetch";
import {$enum} from "@/componsables/enums.ts";
import {$const} from "@/componsables/const.ts";



// TODO request 和 response 拦截器无法发挥正常作用，待修复
export async function $request(url: string, options?: any, body?: any, baseUrl?: string, headers?: any) {
    return await ofetch(url, {
        // 请求前预处理
        async onRequest({ request, options}) {
            if (url === null || url === undefined) {
                return Promise.reject('URL不能为空');
            }
            if (options === null || options === undefined) {
                // 如果没有 options 则默认为 get
                // TODO options = $enum.RestParamsEnums.GET as string;
            }
        },
        async onResponse({response}) {
            // 校验响应状态码,如果正确则放行response
            if (response.status === $enum.HttpCodeEnum.SUCCESS || response.status === $enum.HttpCodeEnum.DEFAULT) {
                return response;
            } else {
                return Promise.reject(response);
            }
        },
        headers: {
            'username': getUsername() ? getUsername() : '',
            'token': getToken() ? getToken() : '',
            'userId': getUserId()? getUserId() : '',
            'realName': getRealName()? getRealName() : '',
            'charset': 'utf-8',
            'Access-Control-Allow-Origin': '*',
            ...headers
        },
        method: options,
        body: body,
        baseURL: baseUrl
    }).then((response) => {
        return Promise.resolve(response);
    }).catch((error: any) => {
        console.error(error);
        return Promise.reject(error);
    });
}



export function getUsername(): string {
    return 'null';
}

export function getRealName(): string {
    return 'null';
}


export function getUserId(): string {
    return 'null';
}


export function getToken(): string {
    return JSON.parse(localStorage.getItem($const.USER_LOGIN_STORAGE_KET))?.token;
}
