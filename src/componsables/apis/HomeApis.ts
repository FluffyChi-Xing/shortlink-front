/**
 * 首页请求模块
 */
import {$request} from "@/componsables/request.ts";
import {LogUtil} from "@/utils/CommonLogUtil.ts";
import {$const} from "@/componsables/const.ts";
import {$enum} from "@/componsables/enums.ts";


/**
 * 获取分组按日期的统计数据
 * @param startTime
 * @param endTime
 * @param gid
 */
export async function getDailyAccessStatsDataByGid(
    startTime: string,
    endTime: string,
    gid: string
): Promise<any> {
    if (startTime && endTime && gid) {
        let formData = new FormData();
        formData.append('startDate', startTime);
        formData.append('endDate', endTime);
        formData.append('gid', gid);
        return await $request(
            $const.BUSINESS_SERVICE_PREFIX + '/stats/group',
            $enum.RestParamsEnums.POST,
            formData,
            $const.BUSINESS_SERVER_HOST
        ).then((res: any) => {
            if (res.code >= 200 && res.code < 300) {
                return Promise.resolve(res.data);
            } else {
                return Promise.reject('获取数据失败');
            }
        }).catch((error: any) => {
            LogUtil.error(error);
            return Promise.reject('获取数据失败');
        });
    } else {
        return Promise.reject('参数错误');
    }
}
