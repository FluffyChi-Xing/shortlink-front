import {LogUtil} from "@/utils/CommonLogUtil.ts";


/**
 * 下载文件
 * @param link
 * @param text
 */
export async function downloadLink(link: string, text: string) {
    try {
        const download = document.createElement('a');
        download.href = link;
        download.download = text || 'download';
        document.body.appendChild(download);
        download.click();
        document.body.removeChild(download);
    } catch (e) {
        LogUtil.error(e as string);
    }
}
