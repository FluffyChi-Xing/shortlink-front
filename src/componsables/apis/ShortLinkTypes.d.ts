export namespace ShortLinkTypes {
    export interface testGroupLinkTypes {
        id: number;
        name: string;
        count: number;
        url: string;
        selected: boolean;
    }
    export interface GroupLinkTypes {
        id: number; // 短链接分组id
        domain: string; // 短链接分组域名
        shortUrl: string; // 短链接
        fullShortUrl: string; // 完整短链接
        originUrl: string; // 原始链接
        gid: string; // 短链接分组gid
        favicon: string; // 短链接分组favicon
        description: string; // 短链接分组描述
    }


    /**
     * 短链接分组类型
     */
    export interface shortLinkGroupTypes {
        gid: string; // 短链接分组id

        name: string; // 分组名称

        sortOrder: number; // 分组排序

        shortLinkCount: number; // 分组内短链接数量

        selected: boolean; // 是否选中
    }


    /**
     * 短链接分组排序类型
     */
    export interface ShortLinkSortRequestType {
        gid: string;

        sortOrder: number;
    }



    export interface ShortLinkAccessLogsType {
        uvType: string;

        browser: string;

        os: string;

        ip: string;

        network: string;

        device: string;

        locale: string;

        user: string;

        createTime: string;
    }
}
