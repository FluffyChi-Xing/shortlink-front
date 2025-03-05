import {LogUtil} from "@/utils/CommonLogUtil.ts";


/**
 * 手动连接跳转
 * @param path
 */
export function jumpUrl(path: string) {
    if (path && path !== '未知地址') {
        window.open(path, '_blank');
    } else {
        LogUtil.info('未知地址');
    }
}
