import * as TimeEnums from './enums/TimeEnums.ts'
import * as HttpCodeEnum from './enums/HttpCodeEnum.ts'
import * as RestParamsEnum from './enums/RestParamsEnums.ts'



export const $enum = {
    ...TimeEnums,
    ...HttpCodeEnum,
    ...RestParamsEnum
}
