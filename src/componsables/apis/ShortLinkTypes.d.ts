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
}
