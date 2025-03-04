/**
 * 复制粘贴文本工具函数包
 * @author: FluffyChi-Xing
 */
import {LogUtil} from "@/utils/CommonLogUtil.ts";


/**
 * 复制文本到剪贴板
 * @param text
 */
export async function copyTextToClipboard(text: string) {
    if (text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                return Promise.resolve('复制成功');
            }).catch((error) => {
                LogUtil.error(error);
                return Promise.reject('复制失败');
            })
        }
    } else {
        return Promise.reject('复制文本为 null');
    }
}
