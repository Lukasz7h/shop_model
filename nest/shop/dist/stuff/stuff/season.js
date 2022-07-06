"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.thatSeason = void 0;
const thatSeason = (season) => {
    let that;
    switch (season) {
        case "spring":
            that = "Wiosna";
            break;
        case "summer":
            that = "Lato";
            break;
        case "fall":
            that = "Jesień";
            break;
        case "winter":
            that = "Zima";
            break;
    }
    return that;
};
exports.thatSeason = thatSeason;
//# sourceMappingURL=season.js.map