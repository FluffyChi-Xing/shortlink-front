import type {UserTypes} from "@/componsables/apis/UserTypes";
import {$const} from "@/componsables/const.ts";
import {$request} from "@/componsables/request.ts";
import {$enum} from "@/componsables/enums.ts";


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
    let options = $enum.RestParamsEnums.POST;
    let headers = {
      'content-type': 'multipart/form-data'
    };
    return await $request( $const.ADMIN_ROUTE_PREFIX + '/login', options, formData, $const.SERVER_HOST, headers);
}

export async function userRegister() {

}


export async function userLogout() {

}


export async function userRefreshToken() {

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
    return localStorage.getItem($const.CAPTCHA_CODE_KEY) as string;
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
    localStorage.setItem($const.USER_LOGIN_STORAGE_KET, JSON.stringify(UserInfo));
}


/**
 * 获取用户登录信息
 */
function getUserInfo() {
    return JSON.parse(localStorage.getItem($const.USER_LOGIN_STORAGE_KET));
}


/**
 * 移除用户登录信息
 */
function removeUserInfo() {
    localStorage.removeItem($const.USER_LOGIN_STORAGE_KET);
}
