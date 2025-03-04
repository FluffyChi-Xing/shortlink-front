/**
 * 通用日志工具类
 * 基于 chalkjs 实现
 */


import chalk from "chalk";



export enum chalkColorEnums {
    red = 'red',
    green = 'green',
    blue = 'blue',
    yellow = 'yellow',
    cyan = 'cyan',
    magenta = 'magenta',
    white = 'white',
    gray = 'gray',
    black = 'black',
    bgRed = 'bgRed',
    bgGreen = 'bgGreen',
    bgBlue = 'bgBlue',
    bgYellow = 'bgYellow',
    bgCyan = 'bgCyan',
}


/**
 * 从枚举中获取颜色对应的 key
 * @param color
 */
// function getChalkKeyByValue(color: string) {
//     return Object.keys(chalkColorEnums).find(key => chalkColorEnums[key] === color);
// }


/**
 * 构建不同颜色的字体输出工厂函数
 * @param textColor
 * @param msg
 */
function colorfulTextChalkFuncFactory(textColor: string, msg?: string) {
    if (msg === null || msg === undefined) {
        console.error('msg 不能为空');
        return null;
    }
    switch (textColor) {
        case chalkColorEnums.red:
            return chalk.red(...msg);
        case chalkColorEnums.green:
            return chalk.green(...msg);
        case chalkColorEnums.blue:
            return chalk.blue(...msg);
        case chalkColorEnums.yellow:
            return chalk.yellow(...msg);
        case chalkColorEnums.cyan:
            return chalk.cyan(...msg);
        case chalkColorEnums.magenta:
            return chalk.magenta(...msg);
        case chalkColorEnums.white:
            return chalk.white(...msg);
        case chalkColorEnums.gray:
            return chalk.gray(...msg);
        case chalkColorEnums.black:
            return chalk.black(...msg);
        default:
            return chalk.black(...msg);
    }
}


/**
 * 构建不同颜色的背景输出工厂函数
 * @param bgColor
 * @param chalkFunc
 * @param msg
 */
function colorfulBGChalkFuncFactory(bgColor: string, chalkFunc: any, msg?: string) {
    // if (typeof chalkFunc !== 'function' && typeof chalkFunc !== chalk()) {
    //     return chalk.bgBlack
    // }
    if (msg === null || msg === undefined) {
        console.error('msg 不能为空');
        return null;
    }
    switch (bgColor) {
        case chalkColorEnums.bgRed:
            return chalkFunc.bgRed(...msg);
        case chalkColorEnums.bgGreen:
            return chalkFunc.bgGreen(...msg);
        case chalkColorEnums.bgBlue:
            return chalkFunc.bgBlue(...msg);
        case chalkColorEnums.bgYellow:
            return chalkFunc.bgYellow(...msg);
        case chalkColorEnums.bgCyan:
            return chalkFunc.bgCyan(...msg);
    }
}


/**
 * 自定义美化控制台输出函数
 * @param textColor
 * @param bgColor
 * @param msg
 */
function beautifulConsole(textColor: string, bgColor: string | null,  msg: string) {
    if (msg === null || msg === undefined) {
        console.error('msg 不能为空');
        return null;
    }
    if (textColor !== null && bgColor !== null) {
        return colorfulBGChalkFuncFactory(bgColor, colorfulTextChalkFuncFactory(textColor), msg);
    }
    if (textColor !== null && bgColor === null) {
        return colorfulTextChalkFuncFactory(textColor, msg);
    }
}


export namespace LogUtil {
    export function alert(msg: string) {
        console.log(beautifulConsole(chalkColorEnums.yellow, null, msg))
    }

    export function error(msg: string | any) {
        console.error(beautifulConsole(chalkColorEnums.red, null, msg));
    }

    export function info(msg: string) {
        console.info(beautifulConsole(chalkColorEnums.black, null, msg));
    }

    export function debug(msg: string) {
        console.debug(beautifulConsole(chalkColorEnums.gray, null, msg));
    }
}
