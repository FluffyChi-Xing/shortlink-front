import dayjs from "dayjs";
import {LogUtil} from "@/utils/CommonLogUtil.ts";


/**
 * 自定义日期格式化注解
 * @param dateFormat
 * @constructor
 */
export function DateFormat(dateFormat: string) {
    return function (target: any, propertyKey: string) {
        let date: string = target[propertyKey];

        const getter = () => {
            return date;
        };

        const setter = (newDate: string) => {
            date = dayjs(newDate).format(dateFormat);
        };

        Object.defineProperty(target, propertyKey, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true
        });
    };
}


/**
 * 适用于 vue setup 中的日期格式化函数
 * @param source
 * @param format
 */
export function dateFormat(source: string | null, format: string) {
    if (source) {
        return dayjs(source).format(format);
    } else {
        return "";
    }
}


/**
 * 检查日期是否过期
 * @param date
 */
export function checkDateBefore(date: string | any): boolean {
    if (date !== null && date !== undefined) {
        const now = new Date().getTime();
        const dateValue = new Date(date).getTime();
        if (dateValue > now) {
            return true
        } else {
            LogUtil.info("已经过期");
            return false;
        }
    } else {
        LogUtil.error("日期不能为空");
        return false;
    }
}
