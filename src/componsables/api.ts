import * as LoginApis from './apis/LoginPageApis.ts'
import * as ShortLinkGroupApis from './apis/ShortLinkGroupApis.ts'
import * as ShortLinkApis from './apis/ShortLinkApis.ts'
import * as UserApis from './apis/UserApis.ts'


export const $api = {
    ...LoginApis,
    ...ShortLinkGroupApis,
    ...ShortLinkApis,
    ...UserApis
}
