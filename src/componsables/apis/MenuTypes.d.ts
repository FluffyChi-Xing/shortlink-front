export namespace MenuTypes {
    export interface BaseMenuType {
        index: string;
        label: string;
    }

    export interface MenuType extends BaseMenuType{
        route?: string;
        icon?: string;
        children?: MenuType[];
    }
}
