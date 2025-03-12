import {VantaEnums} from "@/componsables/enums/VantaEnums.ts";
import type {VantaJsTypes} from "@/componsables/apis/VantaJsTypes";
import WAVES from 'vanta/dist/vanta.waves.min'
import NET from 'vanta/dist/vanta.net.min'
import TOPOLOGY from 'vanta/dist/vanta.topology.min'
import HALO from 'vanta/dist/vanta.halo.min'
import GLOBAL from 'vanta/dist/vanta.globe.min'
import FOG from 'vanta/dist/vanta.fog.min'
import RINGS from 'vanta/dist/vanta.rings.min'
import TRUNK from 'vanta/dist/vanta.trunk.min'
import CELLS from 'vanta/dist/vanta.cells.min'
import BIRDS from 'vanta/dist/vanta.birds.min'
import CLOUDS from 'vanta/dist/vanta.clouds.min'
import CLOUDS2 from 'vanta/dist/vanta.clouds2.min'
/**
 * 随机数
 * @param min
 * @param max


/**
 * vanta js 工厂函数
 * @param types
 * @param options
 */
export function vantaFactory(types: VantaEnums, options: VantaJsTypes.VantaFuncParamsTypes) {
    if (types !== null && types !== undefined) {
        let vantaEffect = null;
        switch (types) {
            case VantaEnums.BIRDS:
                vantaEffect = BIRDS({
                    ...options,
                });
                return vantaEffect;
            case VantaEnums.CELLS:
                vantaEffect = CELLS({
                    ...options,
                });
                return vantaEffect;
            case VantaEnums.CLOUD:
                vantaEffect = CLOUDS({
                   ...options,
                });
                return vantaEffect;
            case VantaEnums.CLOUDS2:
                vantaEffect = CLOUDS2({
                   ...options,
                });
                return vantaEffect;
            case VantaEnums.FOG:
                vantaEffect = FOG({
                   ...options,
                });
                return vantaEffect;
            case VantaEnums.GLOBAL:
                vantaEffect = GLOBAL({
                  ...options,
                });
                return vantaEffect;
            case VantaEnums.HALO:
                vantaEffect = HALO({
                  ...options,
                });
            case VantaEnums.NET:
                vantaEffect = NET({
                    ...options
                })
                return vantaEffect;
            case VantaEnums.RINGS:
                vantaEffect = RINGS({
                   ...options,
                });
                return vantaEffect;
            case VantaEnums.TOPOLOGY:
                vantaEffect = TOPOLOGY({
                    ...options,
                });
                return vantaEffect;
            case VantaEnums.TRUNK:
                vantaEffect = TRUNK({
                    ...options,
                });
                return vantaEffect;
            case VantaEnums.WAVES:
                vantaEffect = WAVES({
                   ...options,
                });
                return vantaEffect;
        }
    }
}


/**
 * 销毁vanta 实例
 */
export function destroyVantaClient(vantaClient: any) {
    // console.log("destroyVantaClient")
    return vantaClient?.destroy();
}
