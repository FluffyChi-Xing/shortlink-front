import type {UserTypes} from "@/componsables/apis/UserTypes";
import {$const} from "@/componsables/const.ts";
import {$request, getUsername} from "@/componsables/request.ts";
import {$enum} from "@/componsables/enums.ts";
import {LogUtil} from "@/utils/CommonLogUtil.ts";


/**
 * 用户登录
 * @param userInfo
 */
export async function userLogin(userInfo: UserTypes.UserLoginReqDtoType) {
    let formData = new FormData();
    formData.append('username', userInfo.username);
    formData.append('password', userInfo.password);
    formData.append('captcha', userInfo.captcha);
    formData.append('captchaCodeKey', userInfo.captchaKey);
    return await $request( $const.ADMIN_ROUTE_PREFIX + '/login', $enum.RestParamsEnums.POST, formData, $const.SERVER_HOST);
}

export async function userRegister() {

}


export async function userLogout() {

}


export async function userRefreshToken() {
    let userInfo: UserTypes.UserLoginInfoType = getUserInfo();
    let token = null;
    let key = null;
    if (userInfo !== null && userInfo !== undefined) {
        token = userInfo.refreshToken;
        key = userInfo.key;
        if (token !== null && key !== null) {
            let header = {
                'username': getUsername() ? getUsername() : '',
            };
            let formData = new FormData();
            formData.append('refreshToken', token);
            formData.append('key', key);
            return await $request($const.ADMIN_ROUTE_PREFIX + '/refresh', $enum.RestParamsEnums.POST, formData, $const.SERVER_HOST, header );
        } else {
            return Promise.reject('token 或 key 不能为空');
        }
    } else {
        return Promise.reject('无法获取到可用的用户信息');
    }
}


/**
 * 测试请求
 */
export async function testRequest() {
    return await $request($const.ADMIN_ROUTE_PREFIX + '/test', 'get', null, $const.SERVER_HOST);
}


/**
 * 获取登录用验证码
 */
export async function getCaptcha() {
    return await $request($const.ADMIN_ROUTE_PREFIX + '/getCaptcha', $enum.RestParamsEnums.GET, null, $const.SERVER_HOST);
}


/**
 * TODO: 检查登录状态
 * @param username
 * @param token
 */
export async function checkLogin(username: string, token: string) {
    return null;
}


/**
 * 存储验证码key
 * @param key
 */
export function setCaptchaCodeKey(key: string) {
    if (key === null || key === undefined) {
        console.error('key 不能为空');
        return Promise.reject('key 不能为空');
    }
    localStorage.setItem($const.CAPTCHA_CODE_KEY, key);
    return Promise.resolve('保存key成功');
}


/**
 * 获取验证码key
 */
export function getCaptchaCodeKey(): string {
    let captcha = localStorage.getItem($const.CAPTCHA_CODE_KEY);
    if (captcha) {
        return captcha;
    } else {
        LogUtil.alert('无法获取到验证码 key');
        return '';
    }
}


/**
 * 存储用户登录信息
 * @param UserInfo
 */
export async function setUserInfo(UserInfo: UserTypes.UserLoginInfoType) {
    let userInfos = getUserInfo();
    if (userInfos !== null) {
        removeUserInfo();
    }
    // console.log(UserInfo)
    localStorage.setItem($const.USER_LOGIN_STORAGE_KET, JSON.stringify(UserInfo));
}


/**
 * 获取用户登录信息
 */
export function getUserInfo() {
    let userInfo = localStorage.getItem($const.USER_LOGIN_STORAGE_KET);
    if (userInfo) {
        return JSON.parse(userInfo);
    } else {
        LogUtil.error('无法获取到用户登录信息');
        return null;
    }
}


/**
 * 移除用户登录信息
 */
export function removeUserInfo() {
    localStorage.removeItem($const.USER_LOGIN_STORAGE_KET);
}


/**
 * 测试 lgo 模块函数
 */
export function testLogUtilFunc() {
    LogUtil.debug('测试 log 模块函数');
    LogUtil.error('测试 log 模块函数');
    LogUtil.info('测试 log 模块函数');
    LogUtil.alert('测试 log 模块函数');
}


/**
 * 判断用户是否登录接口
 */
export async function checkUserLogin(): Promise<any> {
    let userInfo = getUserInfo();
    if (userInfo) {
        return await $request(
            $const.ADMIN_ROUTE_PREFIX + `/checkLogin?username=${userInfo?.username}&uuid=${userInfo?.key}`,
            $enum.RestParamsEnums.GET,
            null,
            $const.SERVER_HOST
        ).then((res: any) => {
            if (res.code >=200 && res.code < 300) {
                // console.log(res)
                return Promise.resolve(true);
            } else {
                console.log(res)
                return Promise.resolve(false);
            }
        }).catch((error: any) => {
            LogUtil.error(error);
            return Promise.reject(false);
        })
    }
    return Promise.reject(false);
}
