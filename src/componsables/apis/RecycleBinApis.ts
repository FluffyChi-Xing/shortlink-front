/**
 * 短链接回收站接口模块
 */


import {$request} from "@/componsables/request.ts";
import {LogUtil} from "@/utils/CommonLogUtil.ts";
import {$const} from "@/componsables/const.ts";
import {$enum} from "@/componsables/enums.ts";

/**
 * 分组获得短链接回收站列表
 * @param gidList
 * @param current
 * @param size
 */
export async function getRecycleBinPage(
    gidList: string,
    current: number,
    size: number
): Promise<any> {
    if (gidList && current && size) {
        let formData = new FormData();
        formData.append('gidList', gidList);
        formData.append('current', current.toString());
        formData.append('size', size.toString());
        return await $request(
            $const.BUSINESS_SERVICE_PREFIX + '/recyclebin/page',
            $enum.RestParamsEnums.POST,
            formData,
            $const.BUSINESS_SERVER_HOST
        ).then((res: any) => {
            if (res.code >= 200 && res.code < 300) {
                return Promise.resolve(res.data);
            } else {
                return Promise.reject(res.message);
            }
        }).catch((error: any) => {
            LogUtil.error(error);
            return Promise.reject("请求失败");
        });
    } else {
        return Promise.reject('参数错误');
    }
}
