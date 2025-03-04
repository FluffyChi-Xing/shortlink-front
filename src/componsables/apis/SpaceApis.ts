import type {SpaceTypes} from "@/componsables/apis/SpaceTypes.ts";
import {dateFormat} from "@/componsables/annotation/DateUtilAnnotation.ts";


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
                createTime: dateFormat(item.createTime, 'YYYY-MM-DD hh:mm:ss'),
                describe: item.describe,
                gid: item.gid
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
