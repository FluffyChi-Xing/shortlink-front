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


/**
 * 更新短链接接口
 * @param originUrl
 * @param fullShortUrl
 * @param gid
 * @param originGid
 * @param validDateType
 * @param valiDate
 * @param describe
 */
export async function updateShortLink(
    originUrl: string,
    fullShortUrl: string,
    gid: string,
    originGid: string,
    validDateType: number,
    valiDate: string,
    describe: string
): Promise<string> {
    if (originGid && originUrl && fullShortUrl && gid && validDateType && valiDate && describe) {
        let formData = new FormData();
        formData.append('originUrl', originUrl);
        formData.append('fullShortUrl', fullShortUrl);
        formData.append('gid', gid);
        formData.append('originGid', originGid);
        formData.append('validdateType', validDateType.toString());
        formData.append('valiDate', valiDate);
        return await $request(
            $const.BUSINESS_SERVICE_PREFIX + '/link/update',
            $enum.RestParamsEnums.POST,
            formData, $const.BUSINESS_SERVER_HOST
        ).then(() => {
            return Promise.resolve('更新成功');
        }).catch(error => {
            LogUtil.error(error);
            return Promise.reject('更新失败');
        });
    } else {
        return Promise.reject('参数错误');
    }
}
