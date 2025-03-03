import dayjs from "dayjs";


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
export function dateFormat(source: string, format: string) {
    if (source) {
        return dayjs(source).format(format);
    } else {
        return "";
    }
}
