/**
 * 本模块记录了B站fnval标志信息
 */
(function () {
    class Fnval {
        MP4 = 1;
        DASH_H265 = 16;
        HDR = 64;
        DASH_4K = 128;
        DOLBYAUDIO = 256;
        DOLBYVIDEO = 512;
        DASH_8K = 1024;
        DASH_AV1 = 2048;
    }
    const fnval = new Fnval();
    API.fnval = Reflect.ownKeys(fnval).reduce((s, d) => {
        s += fnval[d];
        return s;
    }, -1);
})();
declare namespace API {
    /**
     * 视频格式标志
     */
    export let fnval: number;
}