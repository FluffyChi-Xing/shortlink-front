/**
 * 短链接统计相关接口 模块
 */
import type {HomeTypes} from "@/componsables/apis/HomeTypes";
import {$message} from "@/componsables/element-plus.ts";


/**
 * 初始化 IP 统计数据绑定
 * @param res
 * @param ipList
 */
export async function initTopIPsStatsDataBinding(res: any, ipList: HomeTypes.TopIpStatsType[]) {
    if (res !== null && res !== undefined) {
        let ipCount = 0;
        for (let topIpStatsKey in res.topIpStats) {
            ipCount ++;
        }
        if (ipCount > 0) {
            res.topIpStats.forEach((item: any) => {
                ipList.push(item);
            });
        } else {
            ipList = [];
        }
    }
}


/**
 * 初始化 没人浏览器统计数据绑定
 * @param res
 * @param browserList
 */
export async function initDailyBrowserStatsDataBinding(res: any, browserList: HomeTypes.BrowserStatsType[]) {
    if (res !== null && res !== undefined) {
        let browserCount = 0;
        for (let browserStatsKey in res?.browserStats) {
            browserCount ++;
        }
        // 浏览器数据初始化
        if (browserCount > 0) {
            res.browserStats.forEach((item: any) => {
                browserList.push(item);
            });
        } else {
            browserList = [];
        }
    }
}


/**
 * 初始化每日访问量统计数据绑定
 * @param res
 * @param dailyStatsData
 * @param dateList
 * @param pvList
 * @param uvList
 * @param uipList
 */
export async function initDailyStatsDataBinding(
    res: any,
    dailyStatsData: HomeTypes.DailyAccessStatsType[],
    dateList: string[],
    pvList: number[],
    uvList: number[],
    uipList: number[]
) {
    if (res !== null && res !== undefined) {
        // 日常数据统计初始化
        // 防止res?.daily 是 null ,导致抛出 不可迭代的错误
        let dailyCount = 0;
        for (let dailyKey in res?.daily) {
            dailyCount ++;
        }
        if (dailyCount > 0) {
            res.daily.forEach((item: any) => {
                dailyStatsData.push(item);
                dateList.push(item.date);
                pvList.push(item.pv);
                uvList.push(item.uv);
                uipList.push(item.uip);
            });
            $message({
                type: 'success',
                message: '获取成功'
            });
        } else {
            dailyStatsData = [];
        }
    }
}
