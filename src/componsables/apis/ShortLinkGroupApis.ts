import {$request} from "@/componsables/request.ts";
import {$const} from "@/componsables/const.ts";
import {$enum} from "@/componsables/enums.ts";

/**
 * 短链接分组 APIS
 * @Author FluffyChi-Xing
 */




/**
 * 获取分组列表
 */
export async function getGroupList() {
    return await $request($const.DEFAULT_ADMIN_SERVICE_URL + '/group/list', $enum.RestParamsEnums.GET, null, $const.SERVER_HOST);
}
