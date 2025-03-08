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
