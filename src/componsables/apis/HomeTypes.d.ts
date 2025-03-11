export namespace HomeTypes {
    export interface HomeStatsInfoCardType {
        label: string;

        value: string;

        isShow: boolean;
    }


    export interface DailyAccessStatsType {
        date: string;

        pv: number;

        uv: number;

        uip: number;
    }


    /**
     * 浏览器类型统计
     */
    export interface BrowserStatsType {
        cnt: number; // 数量

        browser: string; // 浏览器名称

        ratio: number; // 占比
    }


    /**
     * IP 地址统计 类型
     */
    export interface TopIpStatsType {
        cnt: number; // 数量

        ip: string; // ip地址
    }
}
