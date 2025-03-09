import type {SpaceTypes} from "@/componsables/apis/SpaceTypes.ts";
import {dateFormat} from "@/componsables/annotation/DateUtilAnnotation.ts";
import {$request} from "@/componsables/request.ts";
import {LogUtil} from "@/utils/CommonLogUtil.ts";
import {$const} from "@/componsables/const.ts";
import {BUSINESS_SERVICE_PREFIX} from "@/componsables/constants/LoginConstants.ts";
import {$enum} from "@/componsables/enums.ts";


/**
 * 短连接分页数据列表格式转换器
 * @param shortLinkItemList
 * @param tableData
 */
export function spaceTableDataGenerator(shortLinkItemList: SpaceTypes.ShortLinkIPageType[]): SpaceTypes.ShortLinkIPageTableDataType[] {
    let tableData: SpaceTypes.ShortLinkIPageTableDataType[] = [];
    if (shortLinkItemList.length > 0) {
        shortLinkItemList.forEach((item: SpaceTypes.ShortLinkIPageType) => {
            // 短连接信息
            let shortLinkInfo: SpaceTypes.ShortLinkIPageInfoType = {
                favicon: item.favicon,
                createTime: dateFormat(item.createTime, 'YYYY-MM-DD'),
                describe: item.description,
                gid: item.gid,
                validDate: dateFormat(item.validDate, 'YYYY-MM-DD'),
                validDateType: item.validDateType
            };
            // 短连接网址信息
            let shortLinkWebsiteInfo: SpaceTypes.ShortLinkWebsiteInfoType = {
                originUrl: item.originUrl,
                fullShortUrl: item.fullShortUrl
            };
            // 访问次数信息
            let shortLinkPv: SpaceTypes.ShortLinkPvType = {
                todayPv: item.todayPV,
                totalPv: item.totalPv
            };
            // 访客信息
            let shortLinkUv: SpaceTypes.ShortLinkUvType = {
              todayUv: item.todayUv,
              totalUv: item.totalUv
            };
            // 访问 IP 信息
            let shortLinkUipInfo: SpaceTypes.ShortLinkUipType = {
              todayUip: item.todayUip,
              totalUip: item.totalUip
            };
            tableData.push({
               shortLinkInfo: shortLinkInfo,
               shortLinkWebsiteInfo: shortLinkWebsiteInfo,
               shortLinkPv: shortLinkPv,
               shortLinkUv: shortLinkUv,
               shortLinkUip: shortLinkUipInfo
            });
        })
        return tableData;
    } else {
        return tableData;
    }
}


/**
 * 创建短连接
 * @param gid
 * @param createdType
 * @param validDateType
 * @param validDate
 * @param domain
 * @param describe
 * @param originUrl
 */
export async function createShortLink(
    gid: string,
    createdType: number,
    validDateType: number,
    validDate: string,
    domain: string,
    describe: string,
    originUrl: string
): Promise<any> {
    if (gid && createdType && validDateType && validDate && domain && describe && originUrl) {
        let formData = new FormData();
        formData.append('gid', gid);
        formData.append('createdType', createdType.toString());
        formData.append('validDateType', validDateType.toString());
        formData.append('validDate', validDate);
        formData.append('domain', domain);
        formData.append('describe', describe);
        formData.append('originUrl', originUrl);
        return await $request(
            $const.BUSINESS_SERVICE_PREFIX + '/link/create',
            $enum.RestParamsEnums.POST,
            formData,
            $const.BUSINESS_SERVER_HOST
        ).then((res: any): Promise<string> => {
            if (res.code >= 200 && res.code < 300) {
                return Promise.resolve(res.data);
            } else {
                console.log(res);
                return Promise.resolve("创建短连接失败");
            }
        }).catch((error: any) => {
            LogUtil.error(error);
            return Promise.reject("创建短连接失败");
        });
    } else {
        return Promise.reject('参数错误');
    }
}
