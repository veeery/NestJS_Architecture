"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.url = exports.baseUrl = void 0;
function baseUrl() {
    return process.env.APP_URL;
}
exports.baseUrl = baseUrl;
function url(path) {
    if (!path)
        return null;
    return baseUrl() + path;
}
exports.url = url;
//# sourceMappingURL=url.js.map