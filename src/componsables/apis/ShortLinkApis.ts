/**
 * 短链接 APIS
 * @Author FluffyChi-Xing
 */
import {LogUtil} from "@/utils/CommonLogUtil.ts";
import {$request} from "@/componsables/request.ts";
import {$const} from "@/componsables/const.ts";
import {$enum} from "@/componsables/enums.ts";


/**
 * 分页获取短链接列表
 * @param current
 * @param size
 * @param gid
 */
export async function getShortLinkPage(current: number, size: number, gid: string) {
    if (gid !== null) {
        return await $request(
            $const.DEFAULT_BUSINESS_SERVICE_URL + `/link/page?gid=${gid}&current=${current}&pageSize=${size}`,
            $enum.RestParamsEnums.GET,
            null,
            $const.BUSINESS_SERVER_HOST
        );
    } else {
        LogUtil.error('无法获取到分组id');
        return Promise.reject('无法获取到分组id');
    }
}


/**
 * 批量创建短连接
 * @param originUrls
 * @param describes
 * @param gid
 * @param createdType
 * @param validDateType
 * @param validDate
 */
export async function batchSaveShortLinkToGroup(
    originUrls: string,
    describes: string,
    gid: string,
    createdType: number,
    validDateType: number,
    validDate: string //  YYYY-MM-DD 格式
):Promise<any> {
    if (gid && originUrls && describes && createdType && validDateType && validDate) {
        let formData = new FormData();
        formData.append('gid', gid);
        formData.append('createdType', createdType.toString());
        formData.append('validDateType', validDateType.toString());
        formData.append('validDate', validDate);
        formData.append('originUrls', originUrls);
        formData.append('describes', describes);
        return await $request(
            $const.BUSINESS_SERVICE_PREFIX + '/link/batchCreate',
            $enum.RestParamsEnums.POST,
            formData,
            $const.BUSINESS_SERVER_HOST
        ).then((res: any) => {
            if (res.code >= 200 && res.code < 300) {
                return Promise.resolve(res.data);
            } else {
                console.log('批量创建短链接失败', res.msg);
                return Promise.reject(res.msg);
            }
        }).catch((error: any) => {
            console.log(error);
            return Promise.reject(error);
        });
    } else {
        return Promise.reject('参数错误');
    }
}


/**
 * 将短连接放入回收站
 * @param shortLink
 * @param gid
 */

// TODO: 后端区分有问题 删除的短连接 enableStatus 字段应该改为 1
export async function removeShortLink2Bin(
    shortLink: string, // 完整短连接
    gid: string // 分组 id
): Promise<string> {
    if (shortLink && gid) {
        let formData = new FormData();
        formData.append('fullShortUrl', shortLink);
        formData.append('gid', gid);
        return await $request(
            $const.BUSINESS_SERVICE_PREFIX + '/recyclebin/save',
            $enum.RestParamsEnums.POST,
            formData,
            $const.BUSINESS_SERVER_HOST
        ).then((res: any) => {
            if (res.code >= 200 && res.code < 300) {
                return Promise.resolve('删除成功');
            } else {
                return Promise.reject('删除失败');
            }
        }).catch((error: any) => {
            console.error(error);
            return Promise.reject('删除失败');
        });
    } else {
        console.log('参数错误');
        return Promise.reject('参数错误');
    }
}
