export namespace VantaJsTypes {
    export interface VantaFuncParamsTypes {
        el: string; // 需要绑定大元素id
        mouseControls: boolean; // 鼠标控制
        touchControls: boolean; // 触摸控制
        gyroControls: boolean; // 陀螺仪控制
        minHeight: number; // 最小高度
        minWidth: number; // 最小宽度
        scale?: number; // 缩放比例
        scaleMobile?: number; // 移动设备缩放比例
        color?: number; // 颜色
        backgroundColor?: number; // 背景颜色
        THREE: any;
        speed?: number; // 速度
    }
}
