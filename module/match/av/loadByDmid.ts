/**
 * 本模块负责处理dmid跳转
 */
try {
    const dmid = API.urlObj(location.href).dmid;
    let progress: any = Number(API.urlObj(location.href).dm_progress);
    let first = 0;
    API.switchVideo(async () => {
        if (!(<any>window).player?.seek) {
            await new Promise(r => {
                API.runWhile(() => (<any>window).player?.seek, r)
            })
        }
        if (first) return;
        first++;
        if (progress) return (<any>window).player.seek(progress);
        if (dmid) {
            progress = await xhr({ url: `https://api.bilibili.com/x/v2/dm/thumbup/detail?oid=${API.cid}&dmid=${dmid}` });
            progress = API.jsonCheck(progress).data.progress; // 检查xhr返回值并转化为json
            progress && (<any>window).player.seek(progress / 1000 - .2);
        }
    })
} catch (e) { API.trace(e, "loadByDmid.js") }