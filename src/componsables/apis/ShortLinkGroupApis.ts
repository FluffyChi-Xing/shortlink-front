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


/**
 * 删除短链接分组失败
 * @param gid
 */
export async function deleteGroupItem(gid: string | any): Promise<string> {
    if (gid) {
        return await $request(
            $const.ADMIN_SERVICE_PREFIX + `/group/delete?gid=${gid}`,
            $enum.RestParamsEnums.GET,
            null,
            $const.SERVER_HOST
        ).then((res: any): Promise<string> => {
            if (res.code >= 200 && res.code < 300) {
                return Promise.resolve("删除成功");
            } else {
                return Promise.reject("删除失败," + res.message);
            }
        }).catch(error => {
            LogUtil.error(error);
            return Promise.reject("删除失败");
        });
    } else {
        return Promise.reject('参数错误');
    }
}


/**
 * 更新短连接分组接口
 * @param gid
 * @param groupName
 */
export async function updateShortLinkGroup(
    gid: string,
    groupName: string
): Promise<string> {
    if (gid && groupName) {
        let formData = new FormData();
        formData.append('gid', gid);
        formData.append('groupName', groupName);
        return await $request(
            $const.ADMIN_SERVICE_PREFIX + '/group/update',
            $enum.RestParamsEnums.POST,
            formData,
            $const.SERVER_HOST // baseUrl
        ).then((res: any) => {
            if (res.code >= 200 && res.code < 300) {
                return Promise.resolve("更新成功");
            } else {
                return Promise.reject("更新失败");
            }
        }).catch(error => {
            LogUtil.error(error);
            return Promise.reject("更新失败");
        });
    } else {
        return Promise.reject('参数错误');
    }
}
