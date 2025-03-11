/**
 * 用户页面相关的 APIS 函数
 * @Author FluffyChi-Xing
 */

import {$request} from "@/componsables/request.ts";
import {$const} from "@/componsables/const.ts";
import {$enum} from "@/componsables/enums.ts";
import {LogUtil} from "@/utils/CommonLogUtil.ts";

/**
 * 获取用户的脱敏信息
 */
export async function getUserDesensitizationInfo(): Promise<any> {
    return await $request(
        $const.ADMIN_ROUTE_PREFIX + '/admin',
        $enum.RestParamsEnums.GET,
        null,
        $const.SERVER_HOST
    ).then((res: any) => {
        // console.log(res)
        if (res.code >= 200 && res.code < 300) {
            // console.log(res)
            return Promise.resolve(res.data);
        }
    }).catch((error: any) => {
        LogUtil.error(error);
        return Promise.reject("获取失败");
    })
}


/**
 * 更改用户信息接口
 * @param username
 * @param password
 * @param phone
 * @param email
 * @param realName
 */
export async function editUserData(
    username: string, // 昵称
    password: string,
    phone: string,
    email: string,
    realName: string // 真实姓名
): Promise<string> {
    if (username && password && phone && email && realName) {
        let formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        formData.append('phone', phone);
        formData.append('email', email);
        formData.append('realName', realName);
        return await $request(
            $const.ADMIN_ROUTE_PREFIX + '/update',
            $enum.RestParamsEnums.POST,
            formData,
            $const.SERVER_HOST
        ).then((res: any) => {
            if (res.code >= 200 && res.code < 300) {
                return Promise.resolve('修改成功');
            } else {
                return Promise.reject('修改失败');
            }
        }).catch(error => {
            LogUtil.error(error);
            return Promise.reject('修改失败');
        });
    } else {
        return Promise.reject('参数错误');
    }
}
