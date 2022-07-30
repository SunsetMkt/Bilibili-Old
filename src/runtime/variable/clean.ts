const dushs = [
    "__INITIAL_STATE__",
    "__PGC_USERSTATE__",
    "__BILI_CONFIG__",
    "Sentry",
    "__mobxGlobals",
    "__mobxInstanceCount",
    "_babelPolyfill",
    "BilibiliPlayer",
    "BiliJsBridge",
    "LazyLoad",
    "lazyload",
    "regeneratorRuntime",
    "ownKeys",
    "asyncGeneratorStep",
    "Bjax",
    "BPlayer",
    "BwpElement",
    "BwpMediaSource",
    "bPlayer",
    "EmbedPlayer",
    "GrayManager",
    "PlayerAgent",
    "PlayerSetOnline",
    "abtest",
    "ad_rp",
    "ad_url",
    "bPlayer",
    "bsourceFrom",
    "dashjs",
    "deltaFilter",
    "directiveDispatcher",
    "ep",
    "flashChecker",
    "flvjs",
    "getAuthorInfo",
    "getCookie",
    "getIEVersion",
    "gqs",
    "heimu",
    "insertLink",
    "insertScript",
    "iris",
    "isBiliPlayer",
    "isEmbedPlayer",
    "isInit",
    "jsurl",
    "jsUrls",
    "loadLink",
    "loadScript",
    "loginInfoCallbacks",
    "md",
    "nano",
    "nanoWidgetsJsonp",
    "player",
    "playerInfo",
    "player_fullwin",
    "player_widewin",
    "rec_rp",
    "regeneratorRuntime",
    "reportConfig",
    "reportFistAdFs",
    "reportObserver",
    "setSize",
    "setSizeStyle",
    "spmReportData",
    "vd",
    "videoWidgetsJsonP",
    "webAbTest",
    "webpackJsonp",
    "__getClientLogo",
    "_arrayLikeToArray",
    "_arrayWithHoles",
    "_arrayWithoutHoles",
    "_asyncToGenerator2",
    "_classCallCheck",
    "_createClass",
    "_createForOfIteratorHelper",
    "_defineProperties",
    "_defineProperty",
    "_iterableToArray",
    "_iterableToArrayLimit",
    "_nonIterableRest",
    "_nonIterableSpread",
    "_objectSpread",
    "_slicedToArray",
    "_toConsumableArray",
    "_typeof",
    "_unsupportedIterableToArray",
    "el",
    "BiliCm",
    "BiliHeader",
    "webpackJsonpwebpackLogReporter",
    "webpackLogReporter",
    "core",
    "__getClientLogo",
    "_arrayLikeToArray",
    "_arrayWithoutHoles",
    "_iterableToArray",
    "_nonIterableSpread",
    "_toConsumableArray",
    "_unsupportedIterableToArray",
    "AttentionList",
    "UserStatus",
    "biliQuickLogin",
    "clearImmediate",
    "jvsCert",
    "loadLoginStatus",
    "mOxie",
    "moxie",
    "o",
    "onLoginInfoLoaded",
    "plupload",
    "recaptcha",
    "setImmediate",
    "setTid",
    "show1080p",
    "showCoopModal",
    "showPay",
    "swfobject",
    "tabSocket",
    "__BiliUser__",
    "___grecaptcha_cfg",
    "__core-js_shared__",
];
/** 清理全局变量以重新载入原生变量 */
export function variableCleaner() {
    dushs.forEach(d => {
        try {
            Reflect.deleteProperty(window, d);
        } catch (e) { (<any>window)[d] = undefined; }
    });
}