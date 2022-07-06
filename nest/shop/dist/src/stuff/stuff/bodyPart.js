"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.thatBodyPart = void 0;
const thatBodyPart = (part) => {
    let that;
    switch (part) {
        case "head":
            that = "Głowa";
            break;
        case "corpus":
            that = "Korpus";
            break;
        case "legs":
            that = "Nogi";
            break;
        case "feet":
            that = "Stopy";
            break;
    }
    return that;
};
exports.thatBodyPart = thatBodyPart;
//# sourceMappingURL=bodyPart.js.map