import {DateFormat} from "@/componsables/annotation/DateUtilAnnotation.ts";

export namespace SpaceTypes {


    export interface spaceAccessHistoryListType {
        accessTime: string; // 访问时间

        accessIp: string; // 访问IP

        accessArea: string; // 访问区域

        accessBrowser: string; // 访问浏览器

        accessOs: string; // 访问操作系统

        accessDevice: string; // 访问设备

        netType: string; // 网络状态
    }


    /**
     * 短连接后端分页查询返回数据类型
     */
    export interface ShortLinkIPageType {
        id: string;

        domain: string; // 域名

        shortUrl: string; // 短链接

        fullShortUrl: string; // 完整短链接

        originUrl: string; // 原始链接

        gid: string; // 分组名称

        validDateType: number; // 0: 无限期, 1: 自定义

        enableStatus: number;

        validDate: string | null; // 有效期

        createTime: string; // 创建时间

        description: string; // 短链接描述

        favicon: string; // 网站图标

        totalPv: number; // 总访问量

        totalUv: number; // 总访客数

        todayPV: number; // 今日访问量

        todayUv: number; // 今日访客数

        totalUip: number; // 总独立IP数

        todayUip: number; // 今日独立IP数
    }



    export interface ShortLinkIPageInfoType {
        favicon: string; // 短连接图标

        createTime: string; // 创建时间

        describe: string; // 短连接描述

        gid: string; // 分组id

        validDate: string | null; // 有效期
    }


    export interface ShortLinkWebsiteInfoType {
        originUrl: string; // 原始链接

        fullShortUrl: string; // 完整链接
    }

    export interface ShortLinkPvType {
        totalPv: number; // 总访问量

        todayPv: number; // 今日访问量
    }

    export interface ShortLinkUvType {
        totalUv: number; // 总访客数

        todayUv: number; // 今日访客数
    }


    export interface ShortLinkUipType {
        totalUip: number; // 总独立IP数

        todayUip: number; // 今日独立IP数
    }


    /**
     * 短链接分组列表数据类型
     */
    export interface ShortLinkIPageTableDataType {
        shortLinkInfo: ShortLinkIPageInfoType; // 短链接信息

        shortLinkWebsiteInfo: ShortLinkWebsiteInfoType; // 短链接网址信息

        shortLinkPv: ShortLinkPvType; // 短连接访问次数

        shortLinkUv: ShortLinkUvType; // 短连接访问人数

        shortLinkUip: ShortLinkUipType; // 短连接独立IP数
    }
}
