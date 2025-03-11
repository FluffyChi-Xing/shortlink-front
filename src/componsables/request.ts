import {ofetch} from "ofetch";
import {$enum} from "@/componsables/enums.ts";
import {$const} from "@/componsables/const.ts";
import {$message} from "@/componsables/element-plus.ts";



// TODO request 和 response 拦截器无法发挥正常作用，待修复
export async function $request(url: string, options?: any | null, body?: any, baseUrl?: string, header?: any) {
    return await ofetch(url, {
        // 请求前预处理
        async onRequest() {
            if (url === null || url === undefined) {
                return Promise.reject('URL不能为空');
            }
            if (options === null || options === undefined) {
                // 如果没有 options 则默认为 get
                options = $enum.RestParamsEnums.GET as string;
            }
        },
        // async onResponse({response}) {
        //     // 校验响应状态码,如果正确则放行response
        //     if (response?.data.code !== $enum.HttpCodeEnum.SUCCESS && response.code !== $enum.HttpCodeEnum.DEFAULT) {
        //         return Promise.reject(response);
        //     }
        // },
        headers: {
            'username': getUsername() ? getUsername() : '',
            'token': getToken() ? getToken() : '',
            'userId': getUserId()? getUserId() : '',
            'uuid': getUUID() ? getUUID() : '',
            'realName': getRealName()? getRealName() : '',
            'charset': 'utf-8',
            'Access-Control-Allow-Origin': '*',
            ...header
        },
        method: options,
        body: body,
        baseURL: baseUrl
    }).then((response) => {
        // console.log(response)
        if (response?.code !== $enum.HttpCodeEnum.SUCCESS && response?.code !== $enum.HttpCodeEnum.DEFAULT) {
            return Promise.reject(response);
        }
        return Promise.resolve(response);
    }).catch((error: any) => {
        console.error(error);
        $message({
           message: '请求错误',
           type: "error"
        });
        return Promise.reject(error);
    });
}


/**
 * 从缓存中获取 userInfo 中的 username
 */
export function getUsername() {
    let userInfo = localStorage.getItem($const.USER_LOGIN_STORAGE_KET);
    if (userInfo) {
        return JSON.parse(userInfo)?.username.toString();
    } else {
        return null;
    }
}

export function getRealName(): string {
    return 'null';
}


/**
 * 从缓存中获取 userId
 */
export function getUserId(): string {
    return 'null';
}


/**
 * 获取 uuid
 */
export function getUUID(): string | null {
    let userInfo = localStorage.getItem($const.USER_LOGIN_STORAGE_KET);
    if (userInfo) {
        let uuid = JSON.parse(userInfo)?.key;
        return uuid;
    }
    return null;
}


/**
 * 从缓存中获取 token
 */
export function getToken() {
    let userInfo = localStorage.getItem($const.USER_LOGIN_STORAGE_KET);
    if (userInfo) {
        return JSON.parse(userInfo)?.token;
    } else {
        return null;
    }
}


/**
 * 校验 token 是否过期
 * @param token
 */
// export function checkToken(token: string): boolean {
//     let flag: boolean = false;
//     if (token !== null && token !== undefined) {
//         return flag;
//     }
//     return flag;
// }
