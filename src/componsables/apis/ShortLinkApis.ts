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
