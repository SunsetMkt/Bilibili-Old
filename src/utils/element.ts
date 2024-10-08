import { poll } from "./poll";

/**
 * 创建HTML节点
 * @param tag 节点名称
 * @param attribute 节点属性对象
 * @param parrent 添加到的父节点
 * @param innerHTML 节点的innerHTML
 * @param top 是否在父节点中置顶
 * @param replaced 替换节点而不是添加，被替换的节点，将忽略父节点相关参数
 */
export function addElement<T extends keyof HTMLElementTagNameMap>(tag: T, attribute?: Record<string, string>, parrent?: HTMLElement, innerHTML?: string, top?: boolean, replaced?: Element): HTMLElementTagNameMap[T] {
    const element = document.createElement(tag);
    attribute && (Object.entries(attribute).forEach(d => element.setAttribute(d[0], d[1])));
    innerHTML && element.insertAdjacentHTML('beforeend', innerHTML);
    replaced
        ? replaced.replaceWith(element)
        : parrent && (top
            ? parrent.insertAdjacentElement('afterbegin', element)
            : parrent.insertAdjacentElement('beforeend', element)
        )
    return element
}
/**
 * 添加css样式
 * @param txt css文本
 * @param id 样式ID，用于唯一标记
 * @param parrent 添加到的父节点，默认为head
 */
export async function addCss(txt: string, id?: string, parrent?: Node) {
    if (!parrent && !document.head) {
        await new Promise(r => poll(() => document.body, r));
    }
    parrent = parrent || document.head;
    const style = document.createElement("style");
    style.setAttribute("type", "text/css");
    id && !(<HTMLElement>parrent).querySelector(`#${id}`) && style.setAttribute("id", id);
    style.appendChild(document.createTextNode(txt));
    parrent.appendChild(style);
    return style;
}
/**
 * 加载外源脚本  
 * 支持加载完成后执行回调函数或者返回Promise
 * @param src 外源脚本url
 * @param onload 加载完成后的回调函数
 */
export function loadScript(src: string, onload?: () => void) {
    return new Promise((r, j) => {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = src;
        script.addEventListener("load", () => {
            script.remove();
            onload && onload();
            r(true);
        });
        script.addEventListener('error', () => {
            script.remove();
            j();
        });
        (document.body || document.head || document.documentElement || document).appendChild(script);
    });
}
/**
 * 加载外源样式文件
 * @param href 外源样式url
 */
export function loadStyle(href: string) {
    return new Promise((r, j) => {
        const link = document.createElement('link');
        link.href = href;
        link.rel = 'stylesheet';
        link.addEventListener("load", () => {
            r(true);
        });
        link.addEventListener('error', () => {
            j();
        });
        (document.head || document.documentElement || document).appendChild(link);
    });
}
/** 节点相对于document的offset */
export function offset(ele: HTMLElement) {
    const box = ele.getBoundingClientRect();
    const body = document.body;
    const docElem = document.documentElement;
    //获取页面的scrollTop,scrollLeft(兼容性写法)
    const scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
    const scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;
    const clientTop = docElem.clientTop || body.clientTop;
    const clientLeft = docElem.clientLeft || body.clientLeft;
    const top = box.top + scrollTop - clientTop;
    const left = box.left + scrollLeft - clientLeft;
    return {
        //Math.round 兼容火狐浏览器bug
        top: Math.round(top),
        left: Math.round(left)
    }
}