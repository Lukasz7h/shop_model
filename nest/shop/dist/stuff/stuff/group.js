"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.thatGroup = void 0;
const thatGroup = (group) => {
    let that;
    switch (group) {
        case "Mężczyźni":
            that = "men";
            break;
        case "Kobiety":
            that = "woman";
            break;
        case "Dzieci":
            that = "child";
            break;
    }
    return that;
};
exports.thatGroup = thatGroup;
//# sourceMappingURL=group.js.map