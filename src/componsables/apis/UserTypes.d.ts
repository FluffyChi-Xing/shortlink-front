
export namespace UserTypes {


    /**
     * 用户信息
     */
    export interface UserInfoTypes {
        realName: string;

        phone: string;

        userId: string;

        email: string;

        username: string;
    }


    export interface UserLoginInfoType {
        username: string;

        token: string;

        refreshToken: string;

        key: string;
    }


    export interface UserLoginReqDtoType {
        username: string;

        password: string;

        captcha: string;

        captchaKey: string;
    }
}
