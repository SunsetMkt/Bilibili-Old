import { poll } from "../utils/poll";
import { VdomTool } from "../utils/vdomtool";

/** 重写页面基类 */
export abstract class Page {
    /** 页面框架vdom */
    protected vdom: VdomTool;
    /** 初始化完成 */
    protected initilized = false;
    /**
     * @param html 页面框架
     */
    constructor(html: string) {
        this.vdom = new VdomTool(html);
        Reflect.defineProperty(window, '_babelPolyfill', {
            configurable: true,
            set: () => true,
            get: () => undefined
        });
        Reflect.deleteProperty(window, 'webpackJsonp');
    }
    /** 重写页面 */
    protected updateDom() {
        // 备份标题
        const title = document.title;
        // 销毁已播放视频
        const video = document.querySelector<HTMLVideoElement>('#bilibili-player video');
        if (video) {
            video.pause();
            video.src = '';
            video.load();
        }
        // 刷新DOM
        this.vdom.replace(document.documentElement);
        // 删除PlayerAgent残留
        Reflect.deleteProperty(window, 'PlayerAgent');
        // 启动原生脚本
        this.vdom.loadScript().then(() => this.loadedCallback());
        // 还原标题
        title && !title.includes("404") && (document.title = title);
    }
    /** 重写完成回调 */
    protected loadedCallback() {
        this.initilized = true;
        poll(() => document.readyState === "complete", () => {
            document.querySelector("#jvs-cert") || window.dispatchEvent(new ProgressEvent("load"));
        });
    }
}