export namespace UserTypes {
    export interface UserInfoType {
        /**
         * 用户名
         */
        username: string;

        /**
         * 用户手机号
         */
        phone: string;

        /**
         * 用户姓名
         */
        nickName: string;

        /**
         * 用户邮箱
         */
        email: string;
    }



    export interface UserLoginInfoType {
        username: string;

        userId?: string | number;

        key: string;

        token: string;

        refreshToken: string;
    }



    export interface UserLoginReqDtoType {
        username: string;

        password: string;

        captcha: string;

        captchaKey: string;

        userId?: string;
    }
}
