export const DEFAULT_ROUTER_PREFIX = '/home/';

export const ROUTE_WHITE_LIST: string[] = [
    '/home',
    '/home/dashboard',
    '/home/404',
    '/home/user',
    '/home/recyclebin',
    '/login'
];

export const DEFAULT_CAPTCHA_URL = "data:image/png;base64,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";


