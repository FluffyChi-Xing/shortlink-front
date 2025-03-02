/**
 *  ts 反序列化 & 序列化工具包
 */


import {LogUtil} from "@/utils/CommonLogUtil.ts";


/**
 *  反序列化工具函数
 * @param json
 */
export function deSerialization<T>(json: string): Promise<T> {
    try {
        return Promise.resolve(JSON.parse(json) as T);
    } catch (error) {
        LogUtil.error('反序列化失败');
        return Promise.reject(error);
    }
}


/**
 * 序列化工具函数
 * @param obj
 */
export function serialization<T>(obj: T): Promise<string> {
    try {
        return Promise.resolve(JSON.stringify(obj));
    } catch (error) {
        LogUtil.error('序列化失败');
        return Promise.reject(error);
    }
}
