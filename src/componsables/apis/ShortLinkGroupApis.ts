import {$request} from "@/componsables/request.ts";
import {$const} from "@/componsables/const.ts";
import {$enum} from "@/componsables/enums.ts";
import {ADMIN_SERVICE_PREFIX} from "@/componsables/constants/LoginConstants.ts";
import {LogUtil} from "@/utils/CommonLogUtil.ts";

/**
 * 短链接分组 APIS
 * @Author FluffyChi-Xing
 */




/**
 * 获取分组列表
 */
export async function getGroupList() {
    return await $request($const.DEFAULT_ADMIN_SERVICE_URL + '/group/list', $enum.RestParamsEnums.GET, null, $const.SERVER_HOST);
}


/**
 * 新建分组
 * @param groupName
 */
export async function saveShortLinkGroup(groupName: string | null): Promise<any> {
    if (groupName) {
        return await $request(
            $const.ADMIN_SERVICE_PREFIX + `/group/save?groupName=${groupName}`,
            $enum.RestParamsEnums.GET,
            null,
            $const.SERVER_HOST
        ).then((res: any) => {
            if (res.code >= 200 && res.code < 300) {
                return Promise.resolve("创建成功");
            }
            return Promise.resolve("创建失败");
        }).catch((error: any) => {
            LogUtil.error(error);
            return Promise.reject("创建失败");
        });
    }
}
