interface modules {
    /**
     * 视频源修复及记录
     */
    readonly "playinfo.js": string;
}
API.xhrhook("/playurl?", args => { // 提取aid，cid等信息
    const obj = Format.urlObj(args[1]);
    obj.avid && Number(obj.bvid) && (API.aid = <any>obj.avid);
    obj.bvid && !API.aid && (API.aid = <number>API.abv(obj.bvid));
    obj.cid && Number(obj.cid) && (API.cid = <any>obj.cid);
    args[1].includes("84956560bc028eb7") && (args[1] = API.urlsign(args[1], {}, 8)); // 修复失效的appid
    args[1].includes("pgc") && (API.pgc = true); // ogv视频
}, async obj => {
    try {
        API.__playinfo__ = obj.responseType === "json" ? obj.response : API.jsonCheck(obj.response);
    } catch (e) { }
}, false)
declare namespace API {
    /**
     * __playinfo__
     */
    let __playinfo__: any;
    /**
     * bangumi视频标记
     */
    let pgc: boolean;
}